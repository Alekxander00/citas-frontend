import React from 'react';
import { 
  FaArrowLeft, 
  FaArrowRight, 
  FaPaperPlane,
  FaCheck 
} from 'react-icons/fa';

const WizardNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSubmit,
  isValidStep,
  isSubmitting,
  showSubmit = false
}) => {
  const steps = [
    { number: 1, label: 'Datos Personales' },
    { number: 2, label: 'Información Médica' },
    { number: 3, label: 'Disponibilidad' },
    { number: 4, label: 'Documentación' },
    { number: 5, label: 'Confirmación' }
  ];

  return (
    <div className="wizard-navigation">
      {/* Progress Bar */}
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
        <div className="progress-steps">
          {steps.map((step) => (
            <div 
              key={step.number} 
              className={`progress-step ${currentStep >= step.number ? 'active' : ''} ${currentStep === step.number ? 'current' : ''}`}
            >
              <div className="step-dot">
                {currentStep > step.number ? <FaCheck /> : step.number}
              </div>
              <span className="step-label">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        {currentStep > 1 && (
          <button
            type="button"
            className="btn btn-prev"
            onClick={onPrev}
            disabled={isSubmitting}
          >
            <FaArrowLeft /> Anterior
          </button>
        )}

        <div className="step-indicator">
          Paso {currentStep} de {totalSteps}
        </div>

        {currentStep < totalSteps ? (
          <button
            type="button"
            className="btn btn-next"
            onClick={onNext}
            disabled={!isValidStep || isSubmitting}
          >
            Siguiente <FaArrowRight />
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-submit"
            onClick={onSubmit}
            disabled={!isValidStep || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner"></span>
                Procesando...
              </>
            ) : (
              <>
                <FaPaperPlane /> Enviar Solicitud
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default WizardNavigation;