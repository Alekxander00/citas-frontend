import React from 'react';
import { FaCheck } from 'react-icons/fa';
import './ProgressIndicator.css';

const ProgressIndicator = ({ currentStep, totalSteps = 5 }) => {
  const steps = [
    { number: 1, label: 'Datos Personales' },
    { number: 2, label: 'Especialidad' },
    { number: 3, label: 'Disponibilidad' },
    { number: 4, label: 'Documentación' },
    { number: 5, label: 'Confirmación' }
  ];

  return (
    <div className="progress-container">
      <div 
        className="progress-bar" 
        style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
      ></div>
      <div className="progress-steps">
        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep >= step.number;
          const isCurrent = currentStep === step.number;
          
          return (
            <div 
              key={step.number} 
              className={`progress-step ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}
            >
              <div className="step-dot">
                {isCompleted ? <FaCheck /> : step.number}
              </div>
              <span className="step-label">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;