import React, { useState } from 'react';
import InputNumerico from '../components/InputNumerico';
import SelectIdentificacion from '../components/SelectIdentificacion';
import SelectEspecialidad from '../components/SelectEspecialidad';
import SelectDisponibilidad from '../components/SelectDisponibilidad';
import FileUpload from '../components/FileUpload';
import { crearCita } from '../services/api';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensajeExito('');

    // Validación básica del archivo
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
      
      // Mostrar mensaje de éxito
      setMensajeExito(respuesta.mensaje);
      
      // Limpiar el formulario
      resetForm();
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
  };

  return (
    <div className="agendar-cita-container">
      <h1>Agendamiento de Citas Médicas</h1>
      <p className="subtitle">Sistema para pacientes no contributivos</p>

      <form onSubmit={handleSubmit} className="cita-form">
        <div className="form-section">
          <h2>Datos Personales</h2>
          
          <SelectIdentificacion
            value={tipoIdentificacion}
            onChange={(e) => setTipoIdentificacion(e.target.value)}
            required={true}
          />

          <InputNumerico
            label="Número de Identificación"
            name="numero_identificacion"
            value={numeroIdentificacion}
            onChange={(e) => setNumeroIdentificacion(e.target.value)}
            required={true}
            minLength="5"
            maxLength="20"
            placeholder="Solo números, sin puntos ni espacios"
          />

          <InputNumerico
            label="Teléfono de Contacto"
            name="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required={true}
            minLength="7"
            maxLength="15"
            placeholder="Solo números"
          />
        </div>

        <div className="form-section">
          <h2>Información Médica</h2>
          
          <SelectEspecialidad
            value={especialidadCodigo}
            onChange={(e) => setEspecialidadCodigo(e.target.value)}
            required={true}
          />
        </div>

        <div className="form-section">
          <h2>Disponibilidad</h2>
          <p className="info-text">
            Seleccione su disponibilidad para la cita. Será contactado telefónicamente para confirmar la fecha y hora exactas.
          </p>
          
          <SelectDisponibilidad
            diaSemana={diaSemana}
            setDiaSemana={setDiaSemana}
            jornada={jornada}
            setJornada={setJornada}
          />
        </div>

        <div className="form-section">
          <h2>Documentación</h2>
          
          <FileUpload
            archivo={archivo}
            setArchivo={setArchivo}
            error={error && error.includes('archivo') ? error : ''}
          />
        </div>

        {mensajeExito && (
          <div className="alert alert-success">
            <h3>✅ Solicitud Registrada Exitosamente</h3>
            <p>{mensajeExito}</p>
          </div>
        )}

        {error && !error.includes('archivo') && (
          <div className="alert alert-error">
            <h3>❌ Error</h3>
            <p>{error}</p>
          </div>
        )}

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={cargando}
          >
            {cargando ? 'Enviando...' : 'Agendar Cita'}
          </button>
          
          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
            disabled={cargando}
          >
            Limpiar Formulario
          </button>
        </div>
      </form>

      <div className="info-box">
        <h3>📋 Importante</h3>
        <ul>
          <li>No se requiere registro ni correo electrónico.</li>
          <li>Será contactado telefónicamente en los próximos días.</li>
          <li>Asegúrese de que el archivo PDF sea legible y no exceda 15 MB.</li>
          <li>El horario exacto será confirmado por el personal médico.</li>
        </ul>
      </div>
    </div>
  );
};

export default AgendarCita;