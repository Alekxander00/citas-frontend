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
        <div className="info-box">
          <FaInfoCircle className="info-icon" />
          <p>
            Seleccione su disponibilidad para la cita. <strong>Será contactado telefónicamente</strong> para confirmar la fecha y hora exactas.
          </p>
        </div>
        
        <SelectDisponibilidad
          diaSemana={diaSemana}
          setDiaSemana={setDiaSemana}
          jornada={jornada}
          setJornada={setJornada}
        />
      </div>

      <div className="step-info">
        <FaClock className="info-icon" />
        <p><strong>Horarios:</strong> Mañana: 8:00 AM - 12:00 PM | Tarde: 2:00 PM - 6:00 PM</p>
      </div>
    </div>
  );
};

export default Paso3Disponibilidad;