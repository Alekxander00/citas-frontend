import React from 'react';
import './ProgressIndicator.css';

const ProgressIndicator = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Datos Personales' },
    { number: 2, label: 'Información Médica' },
    { number: 3, label: 'Disponibilidad' },
    { number: 4, label: 'Documentación' }
  ];

  return (
    <div className="progress-indicator">
      {steps.map((step, index) => (
        <div key={step.number} className="step-container">
          <div className={`step ${currentStep >= step.number ? 'active' : ''}`}>
            {currentStep > step.number ? '✓' : step.number}
          </div>
          <span className="step-label">{step.label}</span>
          {index < steps.length - 1 && (
            <div className={`connector ${currentStep > step.number ? 'active' : ''}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;