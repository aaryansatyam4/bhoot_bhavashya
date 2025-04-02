import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from './Pages/Intro';
import BirthInputPage from './Pages/BirthInputPage/BirthInputPage';
import Past from './Pages/Past';
import Future from './Pages/Future'

const App = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Optional: adjust volume
      audioRef.current.play().catch(e => {
        // Handle autoplay restrictions
        console.warn("Autoplay was prevented. User interaction may be needed.");
      });
    }
  }, []);

  return (
    <Router>
      <audio ref={audioRef} src="bgm.mp3" loop autoPlay style={{ display: 'none' }} />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/birth-input" element={<BirthInputPage />} />
        <Route path="/past" element={<Past />} />
        <Route path="/future" element={<Future />} />
      </Routes>
    </Router>
  );
};

export default App;
