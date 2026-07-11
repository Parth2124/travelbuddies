import { useEffect } from 'react';

export default function useScrollLock(locked) {
  useEffect(() => {
    if (locked) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [locked]);
}
