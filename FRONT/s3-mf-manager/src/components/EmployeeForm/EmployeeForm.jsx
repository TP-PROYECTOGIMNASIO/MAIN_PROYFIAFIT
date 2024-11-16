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
  const [loading, setLoading] = useState(false);

  const [genders, setGenders] = useState([]);
  const [roles, setRoles] = useState([]);
  const [locations, setLocations] = useState([]);

  const closeModal = () => {
    setModalVisible(false);
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'dni' && value.length === 8 && /^[0-9]+$/.test(value)) {
      handleSearch(value);
    }
  };

  // Function to handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData({ ...formData, contrato: file });
    } else {
      setModalMessage('Solo se permiten archivos PDF.');
      setModalVisible(true);
    }
  };

  // Function to fetch data based on DNI
  const handleSearch = async (dni) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  // Function to handle form submission
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
    formDataToSend.append('gender_id', formData.genero);
    formDataToSend.append('role_id', formData.rol);
    formDataToSend.append('location_id', formData.sede);
    formDataToSend.append('contract_url', formData.contrato);

    try {
      const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/hu-tp-73', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setModalMessage('Empleado se registró correctamente');
        setModalVisible(true);
        onAddEmployee(formData);
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

  // Fetching gender, role, and location data on component mount
  useEffect(() => {
    const fetchGenders = async () => {
      const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/hu-tp-73?gender=1');
      const data = await response.json();
      setGenders(data);
    };

    const fetchRoles = async () => {
      const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/hu-tp-73?roles=1');
      const data = await response.json();
      setRoles(data);
    };

    const fetchLocations = async () => {
      const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/hu-tp-73?locations=1');
      const data = await response.json();
      setLocations(data);
    };

    fetchGenders();
    fetchRoles();
    fetchLocations();
  }, []);

  // Render the form
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-gray-900"
          >
            X
          </button>
          <h2 className="text-2xl font-bold mb-4">Formulario de Empleado</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
              {/* Column 1 */}
              <div className="flex flex-col">
                <label>DNI</label>
                <input
                  type="text"
                  name="dni"
                  value={formData.dni}
                  onChange={handleInputChange}
                  maxLength={8}
                  required
                />
                <label>Nombres</label>
                <input
                  type="text"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleInputChange}
                  required
                />
                <label>Primer Apellido</label>
                <input
                  type="text"
                  name="primerApellido"
                  value={formData.primerApellido}
                  onChange={handleInputChange}
                  required
                />
                <label>Correo</label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Column 2 */}
              <div className="flex flex-col">
                <label>Segundo Apellido</label>
                <input
                  type="text"
                  name="segundoApellido"
                  value={formData.segundoApellido}
                  onChange={handleInputChange}
                />
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                />
                <label>Ciudad</label>
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleInputChange}
                />
                <label>Distrito</label>
                <input
                  type="text"
                  name="distrito"
                  value={formData.distrito}
                  onChange={handleInputChange}
                />
              </div>

              {/* Column 3 */}
              <div className="flex flex-col">
                <label>Género</label>
                <select name="genero" value={formData.genero} onChange={handleInputChange}>
                  <option value="">Seleccione género</option>
                  {genders.map((gender) => (
                    <option key={gender.gender_id} value={gender.gender_id}>{gender.gender}</option>
                  ))}
                </select>

                <label>Rol</label>
                <select name="rol" value={formData.rol} onChange={handleInputChange}>
                  <option value="">Seleccione rol</option>
                  {roles.map((role) => (
                    <option key={role.role_id} value={role.role_id}>{role.name}</option>
                  ))}
                </select>

                <label>Sede</label>
                <select name="sede" value={formData.sede} onChange={handleInputChange}>
                  <option value="">Seleccione sede</option>
                  {locations.map((location) => (
                    <option key={location.location_id} value={location.location_id}>{location.name}</option>
                  ))}
                </select>

                <label>Contrato</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="bg-[#ca130c] text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-300"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-96">
            <p>{modalMessage}</p>
            <button onClick={closeModal} className="mt-4 bg-gray-300 px-4 py-2 rounded">Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeForm;
