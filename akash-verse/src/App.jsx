import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from './Pages/Intro';
import BirthInputPage from './Pages/BirthInputPage/BirthInputPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/birth-input" element={<BirthInputPage />} />
      </Routes>
    </Router>
  );
};

export default App;
