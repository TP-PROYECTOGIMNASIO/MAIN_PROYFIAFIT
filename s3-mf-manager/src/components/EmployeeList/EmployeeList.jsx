import React, { useState, useEffect } from 'react';
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
    estado: '',
  });
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    // Simulación de carga de empleados desde una API (puedes reemplazar con tu fetch real)
    const fetchEmployees = async () => {
      try {
        const response = await fetch(''); // Coloca la URL de la API aquí
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
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
    // Establece el estado inicial como 'Activo' si no está definido
    const employeeWithDefaultStatus = { ...newEmployee, estado: newEmployee.estado || 'Activo' };
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
    const updatedFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(updatedFilters);
    filterEmployees(updatedFilters, searchQuery);
  };

  const filterEmployees = (filters, searchQuery) => {
    const filtered = employees.filter((employee) => {
      // Ajustar los nombres de las propiedades según la estructura de tus empleados
      const matchSede = filters.sede ? employee.sede === filters.sede : true;
      const matchRol = filters.rol ? employee.rol === filters.rol : true;
      const matchEstado = filters.estado ? employee.estado === filters.estado : true;
      const matchSearch =
        employee.dni.includes(searchQuery) ||
        `${employee.nombres} ${employee.primerApellido} ${employee.segundoApellido}`
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

  const confirmToggleStatus = () => {
    const updatedEmployees = employees.map((emp) =>
      emp.dni === selectedEmployee.dni
        ? { ...emp, estado: emp.estado === 'Activo' ? 'Inactivo' : 'Activo' }
        : emp
    );
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
    setShowConfirmPopup(false);
    setSelectedEmployee(null);
  };

  const closePopup = () => {
    setShowConfirmPopup(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="employee-list-page min-h-[84vh]">
      <div className="employee-list-header">
        <button className="back-button">← Regresar</button>
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
          <option value="La Molina">La Molina</option>
          <option value="San Isidro">San Isidro</option>
        </select>
        <select
          name="rol"
          className="filter"
          value={filters.rol}
          onChange={handleFilterChange}
        >
          <option value="">Agrupar por roles</option>
          <option value="Entrenador">Entrenador</option>
          <option value="Encargado">Encargado</option>
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
                <td>{employee.dni}</td>
                <td>
                  <img
                    src={employee.foto || 'default-image.jpg'}
                    alt="Foto del empleado"
                    className="employee-photo"
                  />
                </td>
                <td>{`${employee.nombres} ${employee.primerApellido} ${employee.segundoApellido}`}</td>
                <td>{employee.rol}</td>
                <td>{employee.sede}</td>
                <td>
                  <button className="view-button">Ver</button>
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
