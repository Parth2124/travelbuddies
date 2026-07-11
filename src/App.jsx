import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home.jsx';
import TourDetail from './pages/TourDetail.jsx';
import DestinationDetail from './pages/DestinationDetail.jsx';
import About from './pages/About.jsx';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader visible={loading} />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tour/:slug" element={<TourDetail />} />
          <Route path="/destination/:slug" element={<DestinationDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
