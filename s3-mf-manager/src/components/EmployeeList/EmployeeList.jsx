import React, { useState, useEffect } from 'react';
import EmployeeForm from '../EmployeeForm/EmployeeForm';
import Modal from '../Modal/Modal';
import ConfirmationPopup from '../Modal/ConfirmationPopup'; // Importa el componente de confirmación
import './EmployeeList.css';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    sede: '',
    rol: '',
    estado: '',
  });
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        console.log('Fetching employees...');
        const response = await fetch('https://cxdt2lrhdb.execute-api.us-east-2.amazonaws.com/desarrollo/staff/visualize');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Employees data:', data);

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
    console.log('Opening employee form modal...');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    console.log('Closing employee form modal...');
    setShowModal(false);
  };

  const addEmployee = (newEmployee) => {
    console.log('Adding new employee:', newEmployee);
    const employeeWithDefaultStatus = { ...newEmployee, estado: 'Activo' };
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
      const matchEstado = filters.estado ? employee.estado === filters.estado : true;
      const matchSearch =
        employee.c_document.includes(searchQuery) ||
        `${employee.c_names} ${employee.father_last_name} ${employee.mother_last_name}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchSede && matchRol && matchEstado && matchSearch;
    });
    setFilteredEmployees(filtered);
  };

  const toggleEmployeeStatus = (employee) => {
    setShowConfirmPopup(true);
    setSelectedEmployee(employee);
  };

  const updateEmployeeStatus = async (staffId, newStatus) => {
    try {
      const response = await fetch('https://cxdt2lrhdb.execute-api.us-east-2.amazonaws.com/desarrollo/staff/actualizacion', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          staff_id: staffId,
          status: newStatus,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Update result:', result);
      return result;
    } catch (error) {
      console.error('Error al actualizar el estado del empleado:', error);
      alert('Error al actualizar el estado del empleado.');
    }
  };

  const confirmToggleStatus = async () => {
    const newStatus = selectedEmployee.estado === 'Activo' ? 'Inactivo' : 'Activo';
    const updateResult = await updateEmployeeStatus(selectedEmployee.c_document, newStatus);
    
    if (updateResult) {
      const updatedEmployees = employees.map((emp) =>
        emp.c_document === selectedEmployee.c_document
          ? { ...emp, estado: newStatus }
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

  return (
    <div className="employee-list-page min-h-[90vh]">
      <div className="employee-list-header">
        <Link to={"/"} className="back-button">← Regresar</Link>
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
          name="estado"
          className="filter"
          value={filters.estado}
          onChange={handleFilterChange}
        >
          <option value="">Agrupar por estado</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
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
            {filteredEmployees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.c_document}</td>
                <td>
                  <img
                    src={employee.photo_url || 'default-image.jpg'}
                    alt="Foto del empleado"
                    className="employee-photo"
                  />
                </td>
                <td>{`${employee.c_names} ${employee.father_last_name} ${employee.mother_last_name}`}</td>
                <td>{employee.rol_id === '1' ? 'Entrenador' : 'Encargado'}</td>
                <td>{employee.location_id === '1' ? 'La Molina' : 'San Isidro'}</td>
                <td>
                  <button className="view-button" onClick={() => viewContract(employee.contract_url)}>Ver</button>
                </td>
                <td>
                  <button
                    className={`status-button ${
                      employee.estado === 'Activo' ? 'active' : 'inactive'
                    }`}
                    onClick={() => toggleEmployeeStatus(employee)}
                  >
                    {employee.estado === 'Activo'
                      ? 'Desactivar'
                      : 'Activar'}{' '}
                    empleado
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showConfirmPopup && (
        <ConfirmationPopup
          message={`¿Seguro que quieres ${
            selectedEmployee?.estado === 'Activo' ? 'desactivar' : 'activar'
          } este empleado?`}
          onConfirm={confirmToggleStatus}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default EmployeeList;
