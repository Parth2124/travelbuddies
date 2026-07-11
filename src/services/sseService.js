/**
 * Server-Sent Events (SSE) Service for Strapi Real-time Updates
 * This service handles real-time updates from Strapi CMS
 */

class SSEService {
  constructor() {
    this.eventSource = null;
    this.listeners = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 3000;
  }

  /**
   * Connect to Strapi SSE endpoint for real-time updates
   * @param {string} contentType - The content type to subscribe to (e.g., 'tours', 'destinations')
   * @param {Function} callback - Callback function to handle updates
   */
  connect(contentType, callback) {
    // Close existing connection if any
    if (this.eventSource) {
      this.disconnect();
    }

    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:1337/api';
    const sseUrl = `${baseUrl.replace('/api', '')}/sse/${contentType}`;

    try {
      this.eventSource = new EventSource(sseUrl);

      this.eventSource.onopen = () => {
        console.log(`SSE connected to ${contentType}`);
        this.reconnectAttempts = 0;
      };

      this.eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          callback(data);
        } catch (error) {
          console.error('Error parsing SSE data:', error);
        }
      };

      this.eventSource.onerror = (error) => {
        console.error(`SSE error for ${contentType}:`, error);
        this.handleReconnect(contentType, callback);
      };

      // Store listener for this content type
      this.listeners.set(contentType, callback);

    } catch (error) {
      console.error('Failed to create SSE connection:', error);
    }
  }

  /**
   * Handle reconnection logic with exponential backoff
   */
  handleReconnect(contentType, callback) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      
      console.log(`Attempting to reconnect to ${contentType} in ${delay}ms (attempt ${this.reconnectAttempts})`);
      
      setTimeout(() => {
        this.connect(contentType, callback);
      }, delay);
    } else {
      console.error(`Max reconnection attempts reached for ${contentType}`);
      this.disconnect();
    }
  }

  /**
   * Disconnect from SSE endpoint
   */
  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.listeners.clear();
      console.log('SSE disconnected');
    }
  }

  /**
   * Subscribe to specific content type updates
   * @param {string} contentType - Content type to subscribe to
   * @param {Function} callback - Callback for updates
   */
  subscribe(contentType, callback) {
    this.connect(contentType, callback);
  }

  /**
   * Unsubscribe from specific content type
   * @param {string} contentType - Content type to unsubscribe from
   */
  unsubscribe(contentType) {
    this.listeners.delete(contentType);
    
    // If no more listeners, disconnect
    if (this.listeners.size === 0) {
      this.disconnect();
    }
  }
}

// Export singleton instance
export const sseService = new SSEService();

/**
 * React hook for SSE subscriptions
 * @param {string} contentType - Content type to subscribe to
 * @param {Function} onUpdate - Callback for updates
 * @param {Array} deps - Dependencies for re-subscription
 */
export function useSSE(contentType, onUpdate, deps = []) {
  const { useEffect } = require('react');

  useEffect(() => {
    sseService.subscribe(contentType, onUpdate);

    return () => {
      sseService.unsubscribe(contentType);
    };
  }, [contentType, ...deps]);
}
