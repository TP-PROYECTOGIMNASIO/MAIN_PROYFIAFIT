import React, { useState } from 'react';
import ConfirmationModal from '../Modal/ConfirmationModal';

const EmployeeForm = ({ onClose, addEmployee }) => {
  // Estado inicial del formulario
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
    contrato: null // Se manejará como archivo
  });

  // Estado para mostrar el modal de confirmación
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value // Si es un archivo, almacena el archivo, si no, almacena el valor del input
    });
    console.log('Campo modificado:', name, files ? files[0] : value);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const { dni, nombres, primerApellido, segundoApellido, contrato } = formData;

    // Verifica si los campos obligatorios están completos
    if (dni && nombres && primerApellido && segundoApellido) {
      console.log('Datos del formulario antes de enviar:', formData);
      try {
        // Preparar el archivo de contrato si existe
        let contractUrl = '';
        if (contrato) {
          const reader = new FileReader();
          reader.readAsDataURL(contrato); // Lee el archivo como una URL de datos (base64)
          reader.onloadend = async () => {
            contractUrl = reader.result; // Obtiene el archivo en base64

            // Preparar los datos para la solicitud POST
            const payload = {
              c_document: formData.dni,
              names: formData.nombres,
              father_last_name: formData.primerApellido,
              mother_last_name: formData.segundoApellido,
              city: formData.ciudad,
              district: formData.distrito,
              address: formData.direccion,
              gender_id: formData.genero,
              rol_id: formData.rol,
              location_id: formData.sede,
              contract_url: contractUrl // Incluye el archivo en base64 en el payload
            };

            await sendEmployeeData(payload); // Envía los datos a la API
          };
        } else {
          const payload = {
            c_document: formData.dni,
            names: formData.nombres,
            father_last_name: formData.primerApellido,
            mother_last_name: formData.segundoApellido,
            city: formData.ciudad,
            district: formData.distrito,
            address: formData.direccion,
            gender_id: formData.genero,
            rol_id: formData.rol,
            location_id: formData.sede,
          };

          await sendEmployeeData(payload); // Envía los datos a la API sin archivo
        }
      } catch (error) {
        console.error('Error al conectar con la API:', error);
        setConfirmationMessage('Hubo un problema al conectar con la API');
        setShowConfirmation(true);
      }
    } else {
      setConfirmationMessage('No se han completado los datos correctamente');
      setShowConfirmation(true);
    }
  };

  // Envía los datos del empleado a la API
  const sendEmployeeData = async (payload) => {
    try {
      console.log('Enviando datos del empleado:', payload);
      const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/hu-tp-73', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Respuesta de la API al agregar empleado:', data);
        addEmployee(data);  // Agregar el nuevo empleado a la lista
        setConfirmationMessage('Empleado agregado con éxito');
        setShowConfirmation(true);
      } else {
        const errorData = await response.json();
        console.log('Error al agregar empleado:', errorData);
        setConfirmationMessage(`Error al agregar el empleado: ${errorData.message}`);
        setShowConfirmation(true);
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      setConfirmationMessage('Hubo un problema al conectar con la API');
      setShowConfirmation(true);
    }
  };

  // Maneja la búsqueda de datos por DNI en SUNAT
  const handleSearchSUNAT = async () => {
    if (formData.dni) {
      try {
        console.log('Buscando datos para DNI:', formData.dni);
        const response = await fetch(`https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/hu-tp-73?document=${formData.dni}`);
        const data = await response.json();
        console.log('Datos encontrados para el DNI:', data);
        setFormData({
          ...formData,
          nombres: data.names,
          primerApellido: data.father_last_name,
          segundoApellido: data.mother_last_name,
          direccion: data.address,
          genero: data.gender_id,
          ciudad: data.city,
          distrito: data.district,
          sede: data.location_id,
          rol: data.rol_id,
        });
      } catch (error) {
        console.error('No se encontraron datos para el DNI proporcionado:', error);
        alert('No se encontraron datos para el DNI proporcionado.');
      }
    } else {
      alert('Por favor, ingrese un DNI.');
    }
  };

  // Maneja la confirmación del modal
  const handleConfirm = () => {
    setShowConfirmation(false);
    onClose(); // Regresar a la lista de empleados
  };

  // Maneja el cierre del modal
  const handleClose = () => {
    setShowConfirmation(false);
    // Regresar al formulario si es necesario
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
                <option value="" disabled>Género</option>
                <option value="1">Masculino</option>
                <option value="2">Femenino</option>
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
                <option value="1">La Molina</option>
                <option value="2">San Isidro</option>
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
                <option value="" disabled>Rol</option>
                <option value="1">Entrenador</option>
                <option value="2">Encargado</option>
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
                onChange={handleChange}
                className="contract-upload-btn"
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit">Agregar Empleado</button>
            <button type="button" onClick={onClose} className="close-form-btn">Cerrar</button>
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
