import React, { useState } from 'react';
import ConfirmationModal from '../Modal/ConfirmationModal'; // Importa el nuevo componente de modal

const EmployeeForm = ({ onClose, addEmployee }) => {
  const [formData, setFormData] = useState({
    dni: '',
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    genero: '',
    ciudad: '',
    distrito: '',
    direccion: '',
    sede: '',
    rol: '',
    contrato: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { dni, nombres, primerApellido, segundoApellido } = formData;

    if (dni && nombres && primerApellido && segundoApellido) {
      addEmployee(formData);
      setConfirmationMessage('Empleado agregado con éxito');
      setShowConfirmation(true);
    } else {
      setConfirmationMessage('No se han completado los datos correctamente');
      setShowConfirmation(true);
    }
  };

  const handleSearchSUNAT = async () => {
    if (formData.dni) {
      try {
        const response = await fetch(`https://km60tf0wo7.execute-api.us-east-2.amazonaws.com/v0/api?dni=${formData.dni}`);
        const data = await response.json();
        setFormData({
          ...formData,
          nombres: data.nombres,
          primerApellido: data.apellido_paterno,
          segundoApellido: data.apellido_materno,
          direccion: data.direccion,
          genero: data.genero,
          ciudad: data.ciudad,
          distrito: data.distrito
        });
      } catch (error) {
        alert('No se encontraron datos para el DNI proporcionado.');
      }
    } else {
      alert('Por favor, ingrese un DNI.');
    }
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    onClose(); // Regresar a la lista
  };

  const handleClose = () => {
    setShowConfirmation(false);
    // Regresar al formulario
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="employee-form-header">
          <h2>Agregar Empleado</h2>
        </div>
        <form className="employee-form" onSubmit={handleSubmit}>
          <div className="dni-search">
            <input
              type="text"
              name="dni"
              placeholder="DNI"
              value={formData.dni}
              onChange={handleChange}
            />
            <button type="button" className="search-sunat-btn" onClick={handleSearchSUNAT}>
              Buscar DNI por RENIEC
            </button>
          </div>
          <div className="form-grid">
            <div className="column">
              <input
                type="text"
                name="dni"
                placeholder="DNI"
                value={formData.dni}
                onChange={handleChange}
              />
              <select name="genero" value={formData.genero} onChange={handleChange}>
                <option value="">Género</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </select>
              <input
                type="text"
                name="ciudad"
                placeholder="Ciudad"
                value={formData.ciudad}
                onChange={handleChange}
              />
              <select name="sede" value={formData.sede} onChange={handleChange}>
                <option value="">Sede</option>
                <option value="La Molina">La Molina</option>
                <option value="San Isidro">San Isidro</option>
              </select>
            </div>
            <div className="column">
              <input
                type="text"
                name="nombres"
                placeholder="Nombres"
                value={formData.nombres}
                onChange={handleChange}
              />
              <input
                type="text"
                name="primerApellido"
                placeholder="Primer Apellido"
                value={formData.primerApellido}
                onChange={handleChange}
              />
              <input
                type="text"
                name="distrito"
                placeholder="Distrito"
                value={formData.distrito}
                onChange={handleChange}
              />
              <select name="rol" value={formData.rol} onChange={handleChange}>
                <option value="">Rol</option>
                <option value="Entrenador">Entrenador</option>
                <option value="Encargado">Encargado</option>
              </select>
            </div>
            <div className="column">
              <input
                type="text"
                name="segundoApellido"
                placeholder="Segundo Apellido"
                value={formData.segundoApellido}
                onChange={handleChange}
              />
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={formData.direccion}
                onChange={handleChange}
              />
              <input
                type="file"
                name="contrato"
                onChange={(e) => setFormData({ ...formData, contrato: e.target.files[0] })}
                className="contract-upload-btn"
              />
            </div>
          </div>
          <div className="btn-section">
            <button type="submit" className="add-btn">Agregar</button>
            <button type="button" className="return-btn" onClick={onClose}>Volver</button>
          </div>
        </form>
        {showConfirmation && (
          <ConfirmationModal
            message={confirmationMessage}
            onConfirm={handleConfirm}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
};

export default EmployeeForm;
