import React from 'react';
import { FaSun, FaCloudSun, FaCalendarDay, FaCheck } from 'react-icons/fa';

const DIAS_SEMANA = [
  { value: 'LUNES', label: 'Lunes' },
  { value: 'MARTES', label: 'Martes' },
  { value: 'MIERCOLES', label: 'Miércoles' },
  { value: 'JUEVES', label: 'Jueves' },
  { value: 'VIERNES', label: 'Viernes' },
  { value: 'SABADO', label: 'Sábado' },
];

const JORNADAS = [
  { value: 'MANANA', label: 'Mañana', icon: FaSun, desc: '8:00 AM - 12:00 PM' },
  { value: 'TARDE', label: 'Tarde', icon: FaCloudSun, desc: '2:00 PM - 6:00 PM' },
];

const SelectDisponibilidad = ({ diaSemana, setDiaSemana, jornada, setJornada }) => {
  
  const handleSelectDia = (diaVal) => {
    setDiaSemana(diaVal);
  };

  const handleSelectJornada = (jornadaVal) => {
    setJornada(jornadaVal);
  };

  return (
    <div className="disponibilidad-grid-container">
      <div className="form-group select-grupo-dia">
        <label className="section-label">1. Seleccione el Día <span className="required">*</span></label>
        <p className="label-ayuda">Toque el día que prefiere para su cita:</p>
        <div className="dias-grid">
          {DIAS_SEMANA.map((dia) => {
            const isSelected = diaSemana === dia.value;
            return (
              <button
                key={dia.value}
                type="button"
                className={`dia-card-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectDia(dia.value)}
              >
                <div className="dia-card-content">
                  <FaCalendarDay className="dia-icon" />
                  <span className="dia-text">{dia.label}</span>
                  {isSelected && <FaCheck className="check-badge" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="form-group select-grupo-jornada">
        <label className="section-label">2. Seleccione la Jornada <span className="required">*</span></label>
        <p className="label-ayuda">¿Prefiere ir por la mañana o por la tarde?:</p>
        <div className="jornadas-grid">
          {JORNADAS.map((jor) => {
            const isSelected = jornada === jor.value;
            const IconComponent = jor.icon;
            return (
              <button
                key={jor.value}
                type="button"
                className={`jornada-card-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectJornada(jor.value)}
              >
                <div className="jornada-card-content">
                  <IconComponent className={`jornada-icon ${jor.value.toLowerCase()}`} />
                  <div className="jornada-info">
                    <span className="jornada-title">{jor.label}</span>
                    <span className="jornada-desc">{jor.desc}</span>
                  </div>
                  {isSelected && <FaCheck className="check-badge-jornada" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SelectDisponibilidad;