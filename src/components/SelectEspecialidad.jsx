import React, { useState, useEffect } from 'react';
import { 
  FaUserMd, 
  FaBaby, 
  FaVenus, 
  FaHeartbeat, 
  FaEye, 
  FaTooth, 
  FaBrain, 
  FaAppleAlt, 
  FaCheck,
  FaStethoscope
} from 'react-icons/fa';
import { obtenerEspecialidades } from '../services/api';

// Mapeo de iconos médicos para la tercera edad
const ICONO_ESPECIALIDAD = {
  1: FaUserMd,       // Medicina General
  2: FaBaby,         // Pediatría
  3: FaVenus,        // Ginecología
  4: FaHeartbeat,    // Cardiología
  5: FaStethoscope,  // Dermatología
  6: FaStethoscope,  // Ortopedia
  7: FaEye,          // Oftalmología
  8: FaTooth,        // Odontología
  9: FaBrain,        // Psicología
  10: FaAppleAlt,    // Nutrición
};

const SelectEspecialidad = ({ onEspecialidadChange, value, onAutoAdvance }) => {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        console.log('🔄 Obteniendo especialidades...');
        const data = await obtenerEspecialidades();
        console.log('📊 Datos recibidos:', data);
        
        let especialidadesData = [];
        
        if (data && data.especialidades) {
          especialidadesData = data.especialidades;
        } else if (data && data.data) {
          especialidadesData = data.data;
        } else if (Array.isArray(data)) {
          especialidadesData = data;
        } else if (data && data.success && data.especialidades) {
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
          { codigo: 6, nombre: 'Ortopedia' },
          { codigo: 7, nombre: 'Oftalmología' },
          { codigo: 8, nombre: 'Odontología' },
          { codigo: 9, nombre: 'Psicología' },
          { codigo: 10, nombre: 'Nutrición' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEspecialidades();
  }, []);

  const handleSelect = (codigo) => {
    console.log('🔽 Especialidad seleccionada:', codigo);
    if (onEspecialidadChange) {
      onEspecialidadChange(codigo);
    }
  };

  if (loading) {
    return (
      <div className="especialidades-loading">
        <span className="loading-spinner"></span>
        <p>Cargando especialidades médicas...</p>
      </div>
    );
  }

  if (error && especialidades.length === 0) {
    return (
      <div className="especialidades-error">
        <p>⚠️ No se pudieron cargar las especialidades. Inténtelo de nuevo.</p>
      </div>
    );
  }

  return (
    <div className="especialidades-grid-wrapper">
      <p className="label-ayuda">Por favor, toque la especialidad médica que necesita:</p>
      <div className="especialidades-grid">
        {especialidades.map((especialidad) => {
          const isSelected = value == especialidad.codigo;
          const IconComponent = ICONO_ESPECIALIDAD[especialidad.codigo] || FaStethoscope;
          
          return (
            <button
              key={especialidad.codigo}
              type="button"
              className={`especialidad-card-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(especialidad.codigo)}
            >
              <div className="especialidad-card-content">
                <div className="especialidad-icon-container">
                  <IconComponent className="especialidad-icon" />
                </div>
                <span className="especialidad-name">{especialidad.nombre}</span>
                {isSelected && (
                  <span className="especialidad-check-badge">
                    <FaCheck />
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SelectEspecialidad;