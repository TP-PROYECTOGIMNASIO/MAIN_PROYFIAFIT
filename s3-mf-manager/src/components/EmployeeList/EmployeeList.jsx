import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import EmployeeForm from '../EmployeeForm/EmployeeForm';
import Modal from '../Modal/Modal';
import ConfirmationPopup from '../Modal/ConfirmationPopup'; // Importa el componente de confirmación
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    sede: '',
    rol: '',
    active: '', // Cambiamos el filtro 'estado' por 'active'
  });
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const navigate = useNavigate(); // Inicializa useNavigate
  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;

  const [user, setUser] = useState({});
 
  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en EmployeeList:", role);
  console.log("token recibido en EmployeeList:", token);
  console.log("username recibido en EmployeeList:", username);

  

  useEffect(() => {
    if (token && username) {
      console.log("Datos recibidos:", { role, token, username });
      fetchUserName();
    }
  }, [role, token, username]); // Dependencias del useEffect // Dependencia de `navigate` // Dependencia de `token` y `username` para volver a ejecutar si estos cambian

  const fetchUserName = async () => {
    try {
      const response = await fetch(`${apiUrlUSERNAME}?username=${username}`);

      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }

      const data = await response.json();
      console.log("Respuesta de la API:", data);

      if (Array.isArray(data)) {
        if (data.length > 0) {
          setUser(data[0]);
        } else {
          console.error("El array está vacío");
          setUser({});
        }
      } else if (data && typeof data === "object") {
        setUser(data);
      } else {
        console.error("Formato inesperado en la respuesta de la API:", data);
        setUser({});
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario", error);
    }
  };


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/hu-tp-74');
        const data = await response.json();
        if (Array.isArray(data)) {
          setEmployees(data);
          setFilteredEmployees(data);
        } else {
          throw new Error('Received data is not an array');
        }
      } catch (error) {
        console.error('Error al cargar la lista de empleados:', error);
        alert('Error al cargar la lista de empleados.');
      }
    };
    fetchEmployees();
  }, []);

  const handleAddEmployeeClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const addEmployee = (newEmployee) => {
    const employeeWithDefaultStatus = { ...newEmployee, active: true }; // Por defecto, nuevo empleado es activo
    const updatedEmployees = [...employees, employeeWithDefaultStatus];
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    filterEmployees(filters, value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    filterEmployees(updatedFilters, searchQuery);
  };

  const filterEmployees = (filters, searchQuery) => {
    const filtered = employees.filter((employee) => {
      const matchSede = filters.sede ? employee.location_id === filters.sede : true;
      const matchRol = filters.rol ? employee.rol_id === filters.rol : true;
      const matchActive = filters.active ? employee.active === (filters.active === 'true') : true;
      const matchSearch =
        employee.document.includes(searchQuery) ||
        `${employee.names} ${employee.father_last_name} ${employee.mother_last_name}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchSede && matchRol && matchActive && matchSearch;
    });
    setFilteredEmployees(filtered);
  };

  const toggleEmployeeStatus = (employee) => {
    setShowConfirmPopup(true);
    setSelectedEmployee(employee);
  };

  const updateEmployeeStatus = async (staffId, newStatus) => {
    console.log(staffId, newStatus);
    try {
      const response = await fetch(`https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/hu-tp-75?staff_id=${staffId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          staff_id: staffId,
          active: newStatus, // Enviamos el nuevo estado como booleano
        }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error al actualizar el estado del empleado:', error);
      alert('Error al actualizar el estado del empleado.');
    }
  };

  const confirmToggleStatus = async () => {
    const newStatus = !selectedEmployee.active; // Invertimos el estado actual
    const updateResult = await updateEmployeeStatus(selectedEmployee.staff_id, newStatus);
    
    if (updateResult) {
      const updatedEmployees = employees.map((emp) =>
        emp.staff_id === selectedEmployee.staff_id
          ? { ...emp, active: newStatus }
          : emp
      );
      setEmployees(updatedEmployees);
      setFilteredEmployees(updatedEmployees);
      setShowConfirmPopup(false);
      setSelectedEmployee(null);
    }
  };

  const closePopup = () => {
    setShowConfirmPopup(false);
    setSelectedEmployee(null);
  };

  const viewContract = (contractUrl) => {
    window.open(contractUrl, '_blank'); 
  };

  const handleBackClick = () => {
    navigate(`/?role=${role}&token=${token}&username=${username}`); // Redirige a ManagerPage
  };

  return (
    <div className="employee-list-page">
      <div className="employee-list-header">
        <button className="back-button" onClick={handleBackClick}>← Regresar</button>
        <h1>Lista de Empleados</h1>
        <button className="add-employee-btn" onClick={handleAddEmployeeClick}>
          + Registrar Nuevo Empleado
        </button>
      </div>

      <div className="filters">
        <select
          name="sede"
          className="filter"
          value={filters.sede}
          onChange={handleFilterChange}
        >
          <option value="">Agrupar por sedes</option>
          <option value="1">La Molina</option>
          <option value="2">San Isidro</option>
        </select>
        <select
          name="rol"
          className="filter"
          value={filters.rol}
          onChange={handleFilterChange}
        >
          <option value="">Agrupar por roles</option>
          <option value="1">Entrenador</option>
          <option value="2">Encargado</option>
        </select>
        <select
          name="active"
          className="filter"
          value={filters.active}
          onChange={handleFilterChange}
        >
          <option value="">Agrupar por estado</option>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
        <input
          type="text"
          placeholder="Buscar por DNI o Nombre..."
          className="search-bar"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <EmployeeForm onClose={handleCloseModal} addEmployee={addEmployee} />
        </Modal>
      )}

      <div className="employee-table">
        <table>
          <thead>
            <tr>
              <th>DNI</th>
              <th>Foto del empleado</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Sede</th>
              <th>Contrato</th>
              <th>Actualizar estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.staff_id}>
                <td>{employee.document}</td>
                <td>
                  <img src={employee.photo_url} alt="Foto del empleado" />
                </td>
                <td>{`${employee.names} ${employee.father_last_name} ${employee.mother_last_name}`}</td>
                <td>{employee.rol_id === '1' ? 'Entrenador' : 'Encargado'}</td>
                <td>{employee.location_id === '1' ? 'La Molina' : 'San Isidro'}</td>
                <td>
                  <button
                    className="view-button"
                    onClick={() => viewContract(employee.contract_url)}
                  >
                    Ver
                  </button>
                </td>
                <td>
                  <button
                    className={`status-button ${employee.active ? 'active' : 'inactive'}`}
                    onClick={() => toggleEmployeeStatus(employee)}
                  >
                    {employee.active ? 'Desactivar' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showConfirmPopup && (
        <ConfirmationPopup
          message={`¿Estás seguro de que deseas ${selectedEmployee.active ? 'desactivar' : 'activar'} a este empleado?`}
          onConfirm={confirmToggleStatus}
          onCancel={closePopup}
        />
      )}
    </div>
  );
};

export default EmployeeList;
