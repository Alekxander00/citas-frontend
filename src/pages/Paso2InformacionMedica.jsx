import React from 'react';
import { FaStethoscope, FaInfoCircle } from 'react-icons/fa';
import SelectEspecialidad from '../components/SelectEspecialidad';

const Paso2InformacionMedica = ({ 
  especialidadCodigo, 
  setEspecialidadCodigo,
  onAutoAdvance
}) => {
  return (
    <div className="form-step">
      <div className="step-header">
        <div className="step-number">2</div>
        <h2>
          <FaStethoscope className="step-icon" /> 
          Información Médica
        </h2>
        <p className="step-description">
          Seleccione la especialidad médica que necesita
        </p>
      </div>

      <div className="step-content">
        <div className="form-group">
          <SelectEspecialidad
            onEspecialidadChange={setEspecialidadCodigo}
            value={especialidadCodigo}
            onAutoAdvance={onAutoAdvance}
          />
        </div>
      </div>

      <div className="step-info">
        <FaInfoCircle className="info-icon" />
        <p>Si no encuentra su especialidad, por favor seleccione "Medicina General" y coméntele los detalles al doctor por teléfono.</p>
      </div>
    </div>
  );
};

export default Paso2InformacionMedica;