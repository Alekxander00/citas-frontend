import React, { useState, useEffect, useRef } from 'react';
import { 
  FaUser, 
  FaStethoscope, 
  FaCalendarAlt, 
  FaFilePdf,
  FaPhone,
  FaIdCard,
  FaCheck,
  FaExclamationTriangle,
  FaUpload,
  FaTrash,
  FaClock,
  FaInfoCircle,
  FaShieldAlt,
  FaHeartbeat,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart  // ← IMPORTANTE: Agregar esto
} from 'react-icons/fa';
import InputNumerico from '../components/InputNumerico';
import SelectIdentificacion from '../components/SelectIdentificacion';
import SelectEspecialidad from '../components/SelectEspecialidad';
import SelectDisponibilidad from '../components/SelectDisponibilidad';
import FileUpload from '../components/FileUpload';
import AnimatedBackground from '../components/AnimatedBackground';
import { crearCita } from '../services/api';
import '../App.css';
import Footer from '../components/Footer';

const AgendarCita = () => {
  // Estados para los campos del formulario
  const [tipoIdentificacion, setTipoIdentificacion] = useState('');
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [especialidadCodigo, setEspecialidadCodigo] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [jornada, setJornada] = useState('');
  const [archivo, setArchivo] = useState(null);
  
  // Estados para la respuesta y errores
  const [mensajeExito, setMensajeExito] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const formRef = useRef(null);

  // Función para generar confeti
  const ConfettiEffect = () => {
    if (!showConfetti) return null;
    
    return (
      <div className="confetti-container">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 60%)`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
            }}
          />
        ))}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensajeExito('');
    
    // Validaciones básicas
    if (!tipoIdentificacion) {
      setError('Por favor seleccione un tipo de identificación');
      return;
    }
    
    if (!numeroIdentificacion || numeroIdentificacion.length < 5) {
      setError('El número de identificación debe tener al menos 5 dígitos');
      return;
    }
    
    if (!telefono || telefono.length < 7) {
      setError('El teléfono debe tener al menos 7 dígitos');
      return;
    }
    
    if (!especialidadCodigo) {
      setError('Por favor seleccione una especialidad médica');
      return;
    }
    
    if (!diaSemana) {
      setError('Por favor seleccione un día de la semana');
      return;
    }
    
    if (!jornada) {
      setError('Por favor seleccione una jornada');
      return;
    }
    
    if (!archivo) {
      setError('Debe seleccionar un archivo PDF.');
      return;
    }

    // Crear FormData para enviar al backend
    const formData = new FormData();
    formData.append('tipo_identificacion', tipoIdentificacion);
    formData.append('numero_identificacion', numeroIdentificacion);
    formData.append('telefono', telefono);
    formData.append('especialidad_codigo', especialidadCodigo);
    formData.append('dia_semana', diaSemana);
    formData.append('jornada', jornada);
    formData.append('orden_pdf', archivo);

    try {
      setCargando(true);
      const respuesta = await crearCita(formData);
      
      // Mostrar mensaje de éxito con confeti
      setMensajeExito(respuesta.mensaje || 'Su solicitud de cita ha sido registrada correctamente. En los próximos días será contactado telefónicamente para confirmar la fecha y hora exactas de su cita.');
      setShowConfetti(true);
      
      // Limpiar el formulario después de 5 segundos
      setTimeout(() => {
        resetForm();
        setShowConfetti(false);
      }, 5000);
      
    } catch (err) {
      console.error('Error al crear la cita:', err);
      setError(err.error || 'Ocurrió un error al agendar la cita. Por favor, intente nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  const resetForm = () => {
    setTipoIdentificacion('');
    setNumeroIdentificacion('');
    setTelefono('');
    setEspecialidadCodigo('');
    setDiaSemana('');
    setJornada('');
    setArchivo(null);
    setError('');
    setMensajeExito('');
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <div className="app-container">
      <AnimatedBackground />
      <ConfettiEffect />
      
      <div className="agendar-cita-container">
        <div className="header-section">
          <div className="title-container">
            <FaHeartbeat className="title-icon" />
            <h1>Agendamiento de Citas Médicas</h1>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="cita-form">
          {/* Sección 1: Datos Personales */}
          <div className="form-section">
            <h2>
              <FaUser className="section-icon" /> 
              Datos Personales
            </h2>
            
            <SelectIdentificacion
              value={tipoIdentificacion}
              onChange={(e) => setTipoIdentificacion(e.target.value)}
              required={true}
            />

            <InputNumerico
              label={
                <>
                  <FaIdCard /> Número de Identificación
                </>
              }
              name="numero_identificacion"
              value={numeroIdentificacion}
              onChange={(e) => setNumeroIdentificacion(e.target.value)}
              required={true}
              minLength="5"
              maxLength="20"
              placeholder="Ej: 1234567890"
            />

            <InputNumerico
              label={
                <>
                  <FaPhone /> Teléfono de Contacto
                </>
              }
              name="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required={true}
              minLength="7"
              maxLength="15"
              placeholder="Ej: 3001234567"
            />
          </div>

          {/* Sección 2: Información Médica */}
          <div className="form-section">
            <h2>
              <FaStethoscope className="section-icon" /> 
              Información Médica
            </h2>
            
            <div className="form-group">
              <SelectEspecialidad
                onEspecialidadChange={setEspecialidadCodigo}
                value={especialidadCodigo}
              />
              <small className="form-text">
                Seleccione la especialidad médica que necesita
              </small>
            </div>
          </div>

          {/* Sección 3: Disponibilidad */}
          <div className="form-section">
            <h2>
              <FaCalendarAlt className="section-icon" /> 
              Disponibilidad
            </h2>
            
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

          {/* Sección 4: Documentación */}
          <div className="form-section">
            <h2>
              <FaFilePdf className="section-icon" /> 
              Documentación
            </h2>
            
            <div className="info-box">
              <FaInfoCircle className="info-icon" />
              <p>
                <strong>Importante:</strong> Suba la orden o autorización médica en formato PDF.
                Este documento es necesario para procesar su solicitud.
              </p>
            </div>
            
            <FileUpload
              archivo={archivo}
              setArchivo={setArchivo}
              error={error && error.includes('archivo') ? error : ''}
            />
            
            {archivo && (
              <div className="file-success">
                <FaCheck className="success-icon" />
                <span>Archivo listo para enviar: <strong>{archivo.name}</strong></span>
              </div>
            )}
          </div>

          {/* Alertas de éxito y error */}
          {mensajeExito && (
            <div className="alert alert-success">
              <div className="alert-content">
                <FaCheck className="alert-icon" />
                <div>
                  <h3>¡Solicitud Registrada Exitosamente!</h3>
                  <p>{mensajeExito}</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-error">
              <div className="alert-content">
                <FaExclamationTriangle className="alert-icon" />
                <div>
                  <h3>Error en el formulario</h3>
                  <p>{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={cargando}
            >
              {cargando ? (
                <>
                  <span className="loading-spinner"></span>
                  Procesando...
                </>
              ) : (
                <>
                  <FaCheck /> Agendar Cita
                </>
              )}
            </button>
            
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
              disabled={cargando}
            >
              <FaTrash /> Limpiar Formulario
            </button>
          </div>
        </form>

        {/* Información importante */}
        <div className="info-container">
          <div className="info-header">
            <FaInfoCircle className="info-header-icon" />
            <h3>Información importante para pacientes</h3>
          </div>
          
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon-container">
                <FaUser />
              </div>
              <h4>Sin registro</h4>
              <p>No se requiere registro previo ni correo electrónico</p>
            </div>
            
            <div className="info-item">
              <div className="info-icon-container">
                <FaPhone />
              </div>
              <h4>Contacto telefónico</h4>
              <p>Será contactado en los próximos días para confirmar</p>
            </div>
            
            <div className="info-item">
              <div className="info-icon-container">
                <FaFilePdf />
              </div>
              <h4>Documentación</h4>
              <p>El archivo PDF debe ser legible y no exceder 15 MB</p>
            </div>
            
            <div className="info-item">
              <div className="info-icon-container">
                <FaClock />
              </div>
              <h4>Horario confirmado</h4>
              <p>El horario exacto será definido por el personal médico</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
        
      </div>
    </div>
  );
};

export default AgendarCita;