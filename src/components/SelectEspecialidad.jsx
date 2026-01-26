import React, { useState, useEffect } from 'react';
import { obtenerEspecialidades } from '../services/api';

const SelectEspecialidad = ({ onEspecialidadChange }) => {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const data = await obtenerEspecialidades();
        // Ajusta según la estructura de tu API
        setEspecialidades(data.especialidades || []);
      } catch (err) {
        setError('Error al cargar especialidades');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEspecialidades();
  }, []);

  if (loading) return <div>Cargando especialidades...</div>;
  if (error) return <div>{error}</div>;

  return (
    <select
      onChange={(e) => onEspecialidadChange && onEspecialidadChange(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded"
      required
    >
      <option value="">Seleccione una especialidad</option>
      {especialidades.map((especialidad) => (
        <option key={especialidad.codigo} value={especialidad.codigo}>
          {especialidad.nombre}
        </option>
      ))}
    </select>
  );
};

export default SelectEspecialidad;