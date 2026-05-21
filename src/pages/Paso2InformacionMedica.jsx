import React from 'react';
import { FaStethoscope, FaInfoCircle } from 'react-icons/fa';
import SelectEspecialidad from '../components/SelectEspecialidad';

const Paso2InformacionMedica = ({ 
  especialidadCodigo, 
  setEspecialidadCodigo
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
          />
        </div>
      </div>
    </div>
  );
};

export default Paso2InformacionMedica;