import React, { useRef } from 'react';

const FileUpload = ({ archivo, setArchivo, error }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (file.type !== 'application/pdf') {
        alert('Solo se permiten archivos PDF.');
        return;
      }

      // Validar tamaño (15 MB)
      if (file.size > 15 * 1024 * 1024) {
        alert('El archivo no debe superar los 15 MB.');
        return;
      }

      setArchivo(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="form-group">
      <label>Orden/Autorización (PDF) <span className="required">*</span></label>
      <div className="file-upload-container">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,application/pdf"
          style={{ display: 'none' }}
          required
        />
        <button type="button" onClick={handleButtonClick} className="btn btn-upload">
          Seleccionar Archivo PDF
        </button>
        {archivo && (
          <div className="file-info">
            <span className="file-name">{archivo.name}</span>
            <span className="file-size">({(archivo.size / 1024 / 1024).toFixed(2)} MB)</span>
            <button type="button" className="btn-remove" onClick={() => setArchivo(null)}>
              ✕
            </button>
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
        <div className="file-requirements">
          <small>Formato permitido: PDF. Tamaño máximo: 15 MB</small>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;