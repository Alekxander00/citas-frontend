import React from 'react';

const DIAS_SEMANA = [
  { value: 'LUNES', label: 'Lunes' },
  { value: 'MARTES', label: 'Martes' },
  { value: 'MIERCOLES', label: 'Miércoles' },
  { value: 'JUEVES', label: 'Jueves' },
  { value: 'VIERNES', label: 'Viernes' },
  { value: 'SABADO', label: 'Sábado' },
];

const JORNADAS = [
  { value: 'MANANA', label: 'Mañana' },
  { value: 'TARDE', label: 'Tarde' },
];

const SelectDisponibilidad = ({ diaSemana, setDiaSemana, jornada, setJornada }) => {
  return (
    <div className="disponibilidad-container">
      <div className="form-group">
        <label htmlFor="dia_semana">Día de la semana <span className="required">*</span></label>
        <select
          id="dia_semana"
          name="dia_semana"
          value={diaSemana}
          onChange={(e) => setDiaSemana(e.target.value)}
          required
          className="form-control"
        >
          <option value="">Seleccione un día</option>
          {DIAS_SEMANA.map((dia) => (
            <option key={dia.value} value={dia.value}>
              {dia.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="jornada">Jornada <span className="required">*</span></label>
        <select
          id="jornada"
          name="jornada"
          value={jornada}
          onChange={(e) => setJornada(e.target.value)}
          required
          className="form-control"
        >
          <option value="">Seleccione una jornada</option>
          {JORNADAS.map((jornadaItem) => (
            <option key={jornadaItem.value} value={jornadaItem.value}>
              {jornadaItem.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectDisponibilidad;