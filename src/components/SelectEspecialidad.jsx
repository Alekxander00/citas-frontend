import React, { useState, useEffect } from 'react';
import { obtenerEspecialidades } from '../services/api';

const SelectEspecialidad = ({ value, onChange, required }) => {
  const [especialidades, setEspecialidades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarEspecialidades = async () => {
      try {
        setCargando(true);
        const response = await obtenerEspecialidades();
        setEspecialidades(response.especialidades || []);
      } catch (err) {
        setError('No se pudieron cargar las especialidades. Intente más tarde.');
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    cargarEspecialidades();
  }, []);

  if (cargando) {
    return (
      <div className="form-group">
        <label>Especialidad Médica</label>
        <div>Cargando especialidades...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="form-group">
        <label>Especialidad Médica</label>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="form-group">
      <label htmlFor="especialidad_codigo">Especialidad Médica {required && <span className="required">*</span>}</label>
      <select
        id="especialidad_codigo"
        name="especialidad_codigo"
        value={value}
        onChange={onChange}
        required={required}
        className="form-control"
      >
        <option value="">Seleccione una especialidad</option>
        {especialidades.map((especialidad) => (
          <option key={especialidad.codigo} value={especialidad.codigo}>
            {especialidad.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectEspecialidad;