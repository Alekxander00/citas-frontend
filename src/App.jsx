import React from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import AgendarCita from './pages/AgendarCita';
import './App.css';

function App() {
  return (
    <div className="App">
      <AnimatedBackground />
      <div className="content-wrapper">
        <AgendarCita />
      </div>
    </div>
  );
}

export default App;