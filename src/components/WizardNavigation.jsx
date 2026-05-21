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
  isSubmitting,
  archivo
}) => {
  return (
    <div className="navigation-buttons">
      {/* Button: Regresar (Visible on steps 2-5) */}
      {currentStep > 1 ? (
        <button
          type="button"
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

      {/* Button: Next/Submit */}
      {currentStep === 5 ? (
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
      ) : (currentStep === 4 || isValidStep) ? (
        <button
          type="button"
          className="btn btn-next"
          onClick={onNext}
          disabled={isSubmitting}
        >
          {currentStep === 4 ? (
            archivo ? (
              <>
                Continuar <FaArrowRight />
              </>
            ) : (
              <>
                Continuar sin documento <FaArrowRight />
              </>
            )
          ) : (
            <>
              Continuar <FaArrowRight />
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