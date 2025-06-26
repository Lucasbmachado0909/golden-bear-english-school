// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import BasicEnglishLesson from './components/BasicEnglishLesson';
import InteractiveExercises from './components/InteractiveExercises';
// Importe outras lições conforme necessário

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lesson1" element={<BasicEnglishLesson />} />
        <Route path="/exercises" element={<InteractiveExercises />} />
      </Routes>
    </Router>
  );
}

export default App;