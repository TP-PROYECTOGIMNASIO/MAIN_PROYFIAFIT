import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ListStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/alumnos?staff_id=3');
        const data = await response.json();
        console.log('Datos obtenidos de la API:', data);
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const openModal = async (student) => {
    try {
      const response = await fetch(`https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/alumnos?client_id=${student.client_id}`);
      const studentData = await response.json();
      setSelectedStudent(studentData);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div className="bg-white shadow-md rounded p-8 m-8">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-semibold" style={{ color: '#834044' }}>Lista de Alumnos</h2>
      </div>
      <div className="flex justify-end mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar..."
            className="p-3 pl-10 w-96 bg-gray-200 border border-gray-300 rounded-none text-black"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 111.35-1.35 7.5 7.5 0 01-1.35 1.35z"
            />
          </svg>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="py-2 px-4 text-left text-black">Nombres</th>
              <th className="py-2 px-4 text-left text-black">Entrenador</th>
              <th className="py-2 px-4 text-left text-black">Sede</th>
              <th className="py-2 px-4 text-left text-black">Membresía</th>
              <th className="py-2 px-4 text-left text-black">Rango</th>
              <th className="py-2 px-4 text-left text-black">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td className="border-t py-2 px-4 text-black">{student.nombres}</td>
                <td className="border-t py-2 px-4 text-black">{student.entrenador}</td>
                <td className="border-t py-2 px-4 text-black">{student.sede}</td>
                <td className="border-t py-2 px-4 text-black">{student.membresia || 'No disponible'}</td>
                <td className="border-t py-2 px-4 text-black">{student.rango}</td>
                <td className="border-t py-2 px-4">
                  <button
                    className="text-white py-2 px-6 rounded-md"
                    style={{ backgroundColor: '#b31b20' }}
                    onClick={() => openModal(student)}
                  >
                    Expandir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-[600px] h-auto p-6 relative flex flex-col">
            <button
              className="absolute top-2 right-4 text-black text-2xl"
              style={{ backgroundColor: 'transparent', border: 'none' }}
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="flex items-start mb-4">
              <div className="mr-6 flex items-center justify-center mt-2">
                <div className="w-24 h-24 bg-white flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-24 h-24 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 14h8v6H8z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 text-black">
                <p className="mb-2"><strong>Nombres:</strong> {selectedStudent.nombres}</p>
                <p className="mb-2"><strong>Género:</strong> {selectedStudent.genero || 'No disponible'}</p>
                <p className="mb-2"><strong>Entrenador:</strong> {selectedStudent.entrenador || 'N/A'}</p>
                <p className="mb-2"><strong>Sede:</strong> {selectedStudent.sede}</p>
                <p className="mb-2"><strong>Membresía:</strong> {selectedStudent.membresia || 'No disponible'}</p>
                <p><strong>Rango:</strong> {selectedStudent.rango}</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-1 flex flex-col mr-4">
                <button className="bg-[#b31b20] text-white py-2 px-4 rounded-md mb-2">HORARIO</button>
                <button className="bg-[#b31b20] text-white py-2 px-4 rounded-md">MÉTRICAS</button>
              </div>
              <div className="flex-1 flex flex-col">
                <button className="bg-gray-700 text-white py-2 px-4 rounded-md mb-2">PLAN ALIMENTICIO</button>
                <Link to={'/planes'} className="bg-gray-700 text-white py-2 px-4 rounded-md mb-2">PLAN DE ENTRENAMIENTO</Link>
                <button className="bg-gray-700 text-white py-2 px-4 rounded-md">REPORTE DE FISIOTERAPEUTA</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListStudents;
