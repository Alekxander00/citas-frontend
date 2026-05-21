import React from 'react';
import { FaCalendarAlt, FaClock, FaInfoCircle } from 'react-icons/fa';
import SelectDisponibilidad from '../components/SelectDisponibilidad';

const Paso3Disponibilidad = ({ 
  diaSemana, 
  setDiaSemana,
  jornada,
  setJornada
}) => {
  return (
    <div className="form-step">
      <div className="step-header">
        <div className="step-number">3</div>
        <h2>
          <FaCalendarAlt className="step-icon" /> 
          Disponibilidad
        </h2>
        <p className="step-description">
          Indique su disponibilidad para la cita médica
        </p>
      </div>

      <div className="step-content">
        <SelectDisponibilidad
          diaSemana={diaSemana}
          setDiaSemana={setDiaSemana}
          jornada={jornada}
          setJornada={setJornada}
        />
      </div>
    </div>
  );
};

export default Paso3Disponibilidad;