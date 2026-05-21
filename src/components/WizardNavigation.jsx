import React from 'react';
import { 
  FaArrowLeft, 
  FaArrowRight, 
  FaPaperPlane 
} from 'react-icons/fa';

const WizardNavigation = ({
  currentStep,
  totalSteps = 5,
  onNext,
  onPrev,
  onSubmit,
  isValidStep,
  isSubmitting
}) => {
  return (
    <div className="navigation-buttons">
      {/* Button: Regresar (Visible on steps 2-5) */}
      {currentStep > 1 ? (
        <button
          type="button; submit"
          className="btn btn-prev"
          onClick={onPrev}
          disabled={isSubmitting}
        >
          <FaArrowLeft /> Regresar
        </button>
      ) : (
        /* Empty placeholder to keep alignment */
        <div className="btn-placeholder"></div>
      )}

      {/* Step Indicator (Middle) */}
      <div className="step-indicator">
        Paso {currentStep} de {totalSteps}
      </div>

      {/* Button: Next/Submit (Only visible on Step 4 and Step 5) */}
      {currentStep === 4 ? (
        <button
          type="button"
          className="btn btn-next"
          onClick={onNext}
          disabled={isSubmitting}
        >
          Continuar sin documento <FaArrowRight />
        </button>
      ) : currentStep === 5 ? (
        <button
          type="button"
          className="btn btn-submit"
          onClick={onSubmit}
          disabled={!isValidStep || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading-spinner"></span>
              Enviando...
            </>
          ) : (
            <>
              <FaPaperPlane /> Enviar Solicitud
            </>
          )}
        </button>
      ) : (
        /* Empty placeholder to keep alignment */
        <div className="btn-placeholder"></div>
      )}
    </div>
  );
};

export default WizardNavigation;