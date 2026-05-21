import React, { useEffect } from 'react';
import { FaFilePdf, FaCheck } from 'react-icons/fa';
import FileUpload from '../components/FileUpload';

const Paso4Documentacion = ({ 
  archivo, 
  setArchivo,
  error,
  onAutoAdvance
}) => {

  // Auto-avance automático al Paso 5 cuando suben un archivo
  useEffect(() => {
    if (archivo && onAutoAdvance) {
      const timer = setTimeout(() => {
        onAutoAdvance();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [archivo, onAutoAdvance]);

  return (
    <div className="form-step">
      <div className="step-header">
        <div className="step-number">4</div>
        <h2>
          <FaFilePdf className="step-icon" /> 
          Documentación
        </h2>
        <p className="step-description">
          Adjunte la orden o autorización médica si la tiene
        </p>
      </div>

      <div className="step-content">
        <FileUpload
          archivo={archivo}
          setArchivo={setArchivo}
          error={error && error.includes('archivo') ? error : ''}
          onSkip={onAutoAdvance}
        />
        
        {archivo && (
          <div className="file-success">
            <FaCheck className="success-icon" />
            <span>Archivo listo: <strong>{archivo.name}</strong> ({(archivo.size / 1024 / 1024).toFixed(2)} MB)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paso4Documentacion;