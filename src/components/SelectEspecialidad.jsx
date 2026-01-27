import React, { useState, useEffect } from 'react';
import { obtenerEspecialidades } from '../services/api';

const SelectEspecialidad = ({ onEspecialidadChange, value }) => {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        console.log('🔄 Obteniendo especialidades...');
        const data = await obtenerEspecialidades();
        console.log('📊 Datos recibidos:', data);
        
        // Ajustar según la estructura real de tu API
        let especialidadesData = [];
        
        if (data && data.especialidades) {
          // Caso: { especialidades: [...] }
          especialidadesData = data.especialidades;
        } else if (data && data.data) {
          // Caso: { data: [...] }
          especialidadesData = data.data;
        } else if (Array.isArray(data)) {
          // Caso: Array directo
          especialidadesData = data;
        } else if (data && data.success && data.especialidades) {
          // Caso: { success: true, especialidades: [...] }
          especialidadesData = data.especialidades;
        } else {
          console.warn('Formato de datos inesperado:', data);
          especialidadesData = [];
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
          { codigo: 4, nombre: 'Cardiología' },
          { codigo: 5, nombre: 'Dermatología' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEspecialidades();
  }, []);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    console.log('🔽 Especialidad seleccionada:', selectedValue);
    if (onEspecialidadChange) {
      onEspecialidadChange(selectedValue);
    }
  };

  if (loading) {
    return (
      <select className="form-control" disabled>
        <option>Cargando especialidades...</option>
      </select>
    );
  }

  if (error) {
    return (
      <select className="form-control" disabled>
        <option>Error al cargar las especialidades</option>
      </select>
    );
  }

  if (especialidades.length === 0) {
    return (
      <select className="form-control" disabled>
        <option>No hay especialidades disponibles</option>
      </select>
    );
  }

  return (
    <select
      className="form-control"
      value={value}
      onChange={handleChange}
      required
    >
      <option value="">Seleccione una especialidad</option>
      {especialidades.map((especialidad) => (
        <option 
          key={especialidad.codigo} 
          value={especialidad.codigo}
        >
          {especialidad.nombre}
        </option>
      ))}
    </select>
  );
};

export default SelectEspecialidad;