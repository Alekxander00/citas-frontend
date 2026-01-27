import React from 'react';
import { FaFilePdf, FaCheck, FaInfoCircle } from 'react-icons/fa';
import FileUpload from '../components/FileUpload';

const Paso4Documentacion = ({ 
  archivo, 
  setArchivo,
  error
}) => {
  return (
    <div className="form-step">
      <div className="step-header">
        <div className="step-number">4</div>
        <h2>
          <FaFilePdf className="step-icon" /> 
          Documentación
        </h2>
        <p className="step-description">
          Adjunte la orden o autorización médica
        </p>
      </div>

      <div className="step-content">
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
            <span>Archivo listo: <strong>{archivo.name}</strong> ({(archivo.size / 1024 / 1024).toFixed(2)} MB)</span>
          </div>
        )}
      </div>

      <div className="step-info">
        <p><strong>Requisitos del archivo:</strong> Formato PDF, tamaño máximo 15 MB, legible.</p>
      </div>
    </div>
  );
};

export default Paso4Documentacion;