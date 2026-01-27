import React from 'react';
import { 
  FaCheck, 
  FaUser, 
  FaStethoscope, 
  FaCalendarAlt, 
  FaFilePdf,
  FaPhone,
  FaIdCard,
  FaClock,
  FaEdit
} from 'react-icons/fa';

const Paso5Resumen = ({ 
  tipoIdentificacion,
  numeroIdentificacion,
  telefono,
  especialidadCodigo,
  especialidades,
  diaSemana,
  jornada,
  archivo,
  onEditStep
}) => {
  // Función para obtener nombre de especialidad
  const getEspecialidadNombre = () => {
    if (!especialidadCodigo || !especialidades.length) return 'No seleccionada';
    const especialidad = especialidades.find(e => e.codigo == especialidadCodigo);
    return especialidad ? especialidad.nombre : 'No seleccionada';
  };

  // Función para formatear tipo de identificación
  const getTipoIdentificacionNombre = () => {
    const tipos = {
      'CEDULA_CIUDADANIA': 'Cédula de Ciudadanía',
      'CEDULA_EXTRANJERIA': 'Cédula de Extranjería',
      'CERTIFICADO_NACIDO_VIVO': 'Certificado de Nacido Vivo',
      'PERMISO_ESPECIAL_PERMANENCIA': 'Permiso Especial de Permanencia',
      'PERMISO_POR_PROTECCION_TEMPORAL': 'Permiso por Protección Temporal',
      'REGISTRO_CIVIL': 'Registro Civil',
      'TARJETA_IDENTIDAD': 'Tarjeta de Identidad'
    };
    return tipos[tipoIdentificacion] || 'No seleccionado';
  };

  // Función para formatear día
  const getDiaNombre = () => {
    const dias = {
      'LUNES': 'Lunes',
      'MARTES': 'Martes',
      'MIERCOLES': 'Miércoles',
      'JUEVES': 'Jueves',
      'VIERNES': 'Viernes',
      'SABADO': 'Sábado'
    };
    return dias[diaSemana] || 'No seleccionado';
  };

  // Función para formatear jornada
  const getJornadaNombre = () => {
    return jornada === 'MANANA' ? 'Mañana' : jornada === 'TARDE' ? 'Tarde' : 'No seleccionada';
  };

  return (
    <div className="form-step">
      <div className="step-header">
        <div className="step-number">5</div>
        <h2>
          <FaCheck className="step-icon" /> 
          Resumen y Confirmación
        </h2>
        <p className="step-description">
          Revise toda la información antes de enviar su solicitud
        </p>
      </div>

      <div className="step-content">
        <div className="resumen-container">
          {/* Sección 1: Datos Personales */}
          <div className="resumen-section">
            <div className="resumen-header">
              <h3>
                <FaUser /> Datos Personales
              </h3>
              <button 
                type="button" 
                className="btn-edit-step"
                onClick={() => onEditStep(1)}
              >
                <FaEdit /> Editar
              </button>
            </div>
            <div className="resumen-details">
              <div className="resumen-item">
                <span className="resumen-label">Tipo de identificación:</span>
                <span className="resumen-value">{getTipoIdentificacionNombre()}</span>
              </div>
              <div className="resumen-item">
                <span className="resumen-label">
                  <FaIdCard /> Número de identificación:
                </span>
                <span className="resumen-value">{numeroIdentificacion || 'No ingresado'}</span>
              </div>
              <div className="resumen-item">
                <span className="resumen-label">
                  <FaPhone /> Teléfono:
                </span>
                <span className="resumen-value">{telefono || 'No ingresado'}</span>
              </div>
            </div>
          </div>

          {/* Sección 2: Información Médica */}
          <div className="resumen-section">
            <div className="resumen-header">
              <h3>
                <FaStethoscope /> Información Médica
              </h3>
              <button 
                type="button" 
                className="btn-edit-step"
                onClick={() => onEditStep(2)}
              >
                <FaEdit /> Editar
              </button>
            </div>
            <div className="resumen-details">
              <div className="resumen-item">
                <span className="resumen-label">Especialidad:</span>
                <span className="resumen-value">{getEspecialidadNombre()}</span>
              </div>
            </div>
          </div>

          {/* Sección 3: Disponibilidad */}
          <div className="resumen-section">
            <div className="resumen-header">
              <h3>
                <FaCalendarAlt /> Disponibilidad
              </h3>
              <button 
                type="button" 
                className="btn-edit-step"
                onClick={() => onEditStep(3)}
              >
                <FaEdit /> Editar
              </button>
            </div>
            <div className="resumen-details">
              <div className="resumen-item">
                <span className="resumen-label">Día de preferencia:</span>
                <span className="resumen-value">{getDiaNombre()}</span>
              </div>
              <div className="resumen-item">
                <span className="resumen-label">
                  <FaClock /> Jornada:
                </span>
                <span className="resumen-value">{getJornadaNombre()}</span>
              </div>
            </div>
          </div>

          {/* Sección 4: Documentación */}
          <div className="resumen-section">
            <div className="resumen-header">
              <h3>
                <FaFilePdf /> Documentación
              </h3>
              <button 
                type="button" 
                className="btn-edit-step"
                onClick={() => onEditStep(4)}
              >
                <FaEdit /> Editar
              </button>
            </div>
            <div className="resumen-details">
              <div className="resumen-item">
                <span className="resumen-label">Archivo PDF:</span>
                <span className="resumen-value">
                  {archivo ? (
                    <>
                      <strong>{archivo.name}</strong> ({(archivo.size / 1024 / 1024).toFixed(2)} MB)
                    </>
                  ) : 'No subido'}
                </span>
              </div>
            </div>
          </div>

          {/* Mensaje de confirmación */}
          <div className="confirmation-message">
            <FaCheck className="confirmation-icon" />
            <p>
              Al enviar esta solicitud, acepta que será contactado telefónicamente en los próximos días 
              para confirmar la fecha y hora exacta de su cita médica.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paso5Resumen;