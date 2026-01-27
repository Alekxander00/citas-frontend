import React, { useState, useEffect } from 'react';
import { obtenerEspecialidades } from '../services/api';

const SelectEspecialidad = ({ value, onChange, required }) => {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        console.log('🔄 Obteniendo especialidades...');
        const data = await obtenerEspecialidades();
        console.log('📊 Datos recibidos:', data);
        
        // IMPORTANTE: Ajusta según la estructura real de tu API
        // Si tu API devuelve { especialidades: [...] } usa data.especialidades
        // Si devuelve { data: [...] } usa data.data
        // Si devuelve directamente un array, usa data directamente
        
        let especialidadesData = [];
        
        if (data && data.especialidades) {
          // Caso 1: { especialidades: [...] }
          especialidadesData = data.especialidades;
        } else if (data && data.data) {
          // Caso 2: { data: [...] }
          especialidadesData = data.data;
        } else if (Array.isArray(data)) {
          // Caso 3: Array directo
          especialidadesData = data;
        } else {
          // Caso 4: Otro formato
          console.warn('Formato de datos inesperado:', data);
          especialidadesData = data || [];
        }
        
        console.log('✅ Especialidades procesadas:', especialidadesData);
        setEspecialidades(especialidadesData);
        
      } catch (err) {
        console.error('❌ Error al cargar especialidades:', err);
        setError('Error al cargar especialidades médicas');
        
        // Datos de prueba para desarrollo
        setEspecialidades([
          { codigo: 1, nombre: 'Medicina General' },
          { codigo: 2, nombre: 'Pediatría' },
          { codigo: 3, nombre: 'Ginecología' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEspecialidades();
  }, []);

  if (loading) {
    return (
      <div className="form-group">
        <label>Especialidad Médica <span className="required">*</span></label>
        <div className="loading">Cargando especialidades...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="form-group">
        <label>Especialidad Médica <span className="required">*</span></label>
        <div className="error-message">{error}</div>
        <select className="form-control" disabled>
          <option>No se pudieron cargar las especialidades</option>
        </select>
      </div>
    );
  }

  return (
    <div className="form-group">
      <label htmlFor="especialidad">Especialidad Médica <span className="required">*</span></label>
      <select
        id="especialidad"
        name="especialidad"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
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
      <small className="form-text">
        {especialidades.length} especialidades disponibles
      </small>
    </div>
  );
};

export default SelectEspecialidad;