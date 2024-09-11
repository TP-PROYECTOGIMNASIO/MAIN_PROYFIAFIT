import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';
import EmployeeList from '../../components/EmployeeList/EmployeeList';
import './HomePage.css';

const HomePage = () => {
  const [employees, setEmployees] = useState([]);

  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  const toggleEmployeeStatus = (dni) => {
    setEmployees(employees.map(emp => 
      emp.dni === dni ? { ...emp, status: emp.status === 'Activo' ? 'Inactivo' : 'Activo' } : emp
    ));
  };

  const viewContract = (dni) => {
    // Implementar lógica para visualizar contrato
    alert(`Ver contrato de empleado con DNI: ${dni}`);
  };

  const updateEmployee = (dni) => {
    // Implementar lógica para actualizar empleado
    alert(`Actualizar empleado con DNI: ${dni}`);
  };

  return (
    <div className="home-page">
      <Navbar />
      <EmployeeForm onAddEmployee={addEmployee} />
      <EmployeeList 
        employees={employees} 
        onToggleStatus={toggleEmployeeStatus} 
        onViewContract={viewContract} 
        onUpdateEmployee={updateEmployee} 
      />
    </div>
  );
};

export default HomePage;
