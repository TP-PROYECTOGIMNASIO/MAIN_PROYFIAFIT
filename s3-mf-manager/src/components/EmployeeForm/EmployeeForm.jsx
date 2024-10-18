import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ onClose, onAddEmployee }) => {
  const [formData, setFormData] = useState({
    dni: '',
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    correo: '',
    direccion: '',
    ciudad: '',
    distrito: '',
    genero: '',
    sede: '',
    rol: '',
    contrato: null
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState(false); // Nuevo estado para controlar la carga

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'dni' && value.length === 8 && /^[0-9]+$/.test(value)) {
      handleSearch(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData({ ...formData, contrato: file });
    } else {
      setModalMessage('Solo se permiten archivos PDF.');
      setModalVisible(true);
    }
  };

  const handleSearch = async (dni) => {
    setLoading(true); // Activar el estado de carga
    try {
      const response = await fetch(`https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/hu-tp-73?document=${dni}`);
      const data = await response.json();

      setFormData({
        ...formData,
        nombres: data.names || '',
        primerApellido: data.father_last_name || '',
        segundoApellido: data.mother_last_name || '',
        correo: data.email || '',
        direccion: data.address || '',
        ciudad: data.city || '',
        distrito: data.district || ''
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setModalMessage('Error al buscar los datos por DNI');
      setModalVisible(true);
    } finally {
      setLoading(false); // Desactivar el estado de carga al finalizar
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.dni || !formData.nombres || !formData.primerApellido || !formData.genero || !formData.sede || !formData.rol) {
      setModalMessage('Datos incompletos');
      setModalVisible(true);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('document', formData.dni);
    formDataToSend.append('names', formData.nombres);
    formDataToSend.append('father_last_name', formData.primerApellido);
    formDataToSend.append('mother_last_name', formData.segundoApellido);
    formDataToSend.append('email', formData.correo);
    formDataToSend.append('city', formData.ciudad);
    formDataToSend.append('district', formData.distrito);
    formDataToSend.append('address', formData.direccion);
    formDataToSend.append('gender_id', formData.genero === 'Masculino' ? '7' : '8');
    formDataToSend.append('rol_id', formData.rol === 'Entrenador' ? '1' : '2');
    formDataToSend.append('location_id', formData.sede === 'La Molina' ? '2' : '1');
    formDataToSend.append('contract_url', formData.contrato);

    try {
      const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/hu-tp-73', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setModalMessage('Empleado se registró correctamente');
        setModalVisible(true);
        onAddEmployee(formData); // Llama a la función para agregar el nuevo empleado
        setFormData({
          dni: '',
          nombres: '',
          primerApellido: '',
          segundoApellido: '',
          correo: '',
          direccion: '',
          ciudad: '',
          distrito: '',
          genero: '',
          sede: '',
          rol: '',
          contrato: null
        });
      } else if (response.status === 409) {
        setModalMessage('El usuario ya existe, revisar los datos por favor');
        setModalVisible(true);
      } else {
        setModalMessage('Error al registrar empleado');
        setModalVisible(true);
      }
    } catch (error) {
      setModalMessage('Error durante el envío del formulario');
      setModalVisible(true);
    }
  };

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (modalVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset'; // Reset overflow on unmount
    };
  }, [modalVisible]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white w-[90%] md:w-[40%] rounded-lg shadow-lg p-6 relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 font-bold text-xl">X</button>
          <div className="text-center text-xl font-bold text-red-700 mb-4">Agregar Empleado</div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <label>DNI</label>
                <input
                  type="text"
                  name="dni"
                  value={formData.dni}
                  onChange={handleInputChange}
                  className="border rounded-lg w-full p-2 mt-1"
                  required
                />
                {loading && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <div className="w-4 h-4 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              <div>
                <label>Nombres</label>
                <input
                  type="text"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleInputChange}
                  className="border rounded-lg w-full p-2 mt-1"
                  required
                />
              </div>

              <div>
                <label>Correo</label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  className="border rounded-lg w-full p-2 mt-1"
                />
              </div>

              <div>
                <label>Primer Apellido</label>
                <input
                  type="text"
                  name="primerApellido"
                  value={formData.primerApellido}
                  onChange={handleInputChange}
                  className="border rounded-lg w-full p-2 mt-1"
                  required
                />
              </div>

              <div>
                <label>Segundo Apellido</label>
                <input
                  type="text"
                  name="segundoApellido"
                  value={formData.segundoApellido}
                  onChange={handleInputChange}
                  className="border rounded-lg w-full p-2 mt-1"
                />
              </div>

              <div>
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  className="border rounded-lg w-full p-2 mt-1"
                />
              </div>

              <div>
                <label>Ciudad</label>
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleInputChange}
                  className="border rounded-lg w-full p-2 mt-1"
                />
              </div>

              <div>
                <label>Distrito</label>
                <input
                  type="text"
                  name="distrito"
                  value={formData.distrito}
                  onChange={handleInputChange}
                  className="border rounded-lg w-full p-2 mt-1"
                />
              </div>

              <div>
                <label>Género</label>
                <select
                  name="genero"
                  value={formData.genero}
                  onChange={handleInputChange}
                  className="border rounded-lg w-full p-2 mt-1"
                >
                  <option value="">Seleccione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>

              <div>
                <label>Sede</label>
                <select
                  name="sede"
                  value={formData.sede}
                  onChange={handleInputChange}
                  className="border rounded-lg w-full p-2 mt-1"
                >
                  <option value="">Seleccione</option>
                  <option value="La Molina">La Molina</option>
                  <option value="San Isidro">San Isidro</option>
                </select>
              </div>

              <div>
                <label>Rol</label>
                <select
                  name="rol"
                  value={formData.rol}
                  onChange={handleInputChange}
                  className="border rounded-lg w-full p-2 mt-1"
                >
                  <option value="">Seleccione</option>
                  <option value="Entrenador">Entrenador</option>
                  <option value="Encargado">Encargado</option>
                </select>
              </div>

              <div>
                <label>Contrato (PDF)</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="border rounded-lg w-full p-2 mt-1"
                />
              </div>
            </div>
            <button type="submit" className="bg-red-700 text-white rounded-lg py-2 mt-4 w-full">Agregar</button>
          </form>
          {modalVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <h2 className="text-lg font-bold text-red-700">{modalMessage}</h2>
                <button onClick={closeModal} className="mt-4 bg-red-700 text-white rounded-lg py-2 px-4">Cerrar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeeForm;
