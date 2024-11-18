import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Definición del componente ListStudents y declaración de estado
const ListStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Estados para manejo de carga y variables de API
  const [loading, setLoading] = useState(true);
  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
  const apiUrl26 = import.meta.env.VITE_APP_API_URL_26;
  const apiUrl27 = import.meta.env.VITE_APP_API_URL_27;

  // Estado user y obtención de parámetros de URL:
  const [user, setUser] = useState({});

  // Obtener los parámetros de búsqueda de la ubicación actual
  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en ListStudents:", window.location.search);

  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en ListStudents:", role);
  console.log("token recibido en ListStudents:", token);
  console.log("username recibido en ListStudents:", username);

  // useEffect para obtener datos del usuario al cargar el componente
  useEffect(() => {
    if (token && username) {
      console.log("Datos recibidos:", { role, token, username });
      fetchUserName();
    }
  }, [role, token, username]);

  // Función fetchUserName para obtener datos de usuario desde la API
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

  // useEffect para obtener lista de estudiantes cuando user.id cambia    
  useEffect(() => {
    const fetchStudents = async () => {
      if (user.id) {
        try {
          const response = await fetch(`${apiUrl26}?staff_id=${user.id}`);
          if (!response.ok) throw new Error('Error en la respuesta de la API');
          const data = await response.json();
          const parsedData = data.map(student => ({
            ...student,
            client_id: parseInt(student.client_id, 10), // Convertir a entero
          }));
          setStudents(parsedData);
          console.log("Estudiantes obtenidos:", parsedData);
        } catch (error) {
          console.error('Error fetching students:', error);
          setStudents([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStudents();
  }, [user.id]);

  // Funciones para abrir y cerrar el modal
  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
    
    // Guardar el nombre del alumno en localStorage
    localStorage.setItem('selectedStudentName', student.nombres);
    
    // Almacenar el client_id en localStorage correctamente
    localStorage.setItem('selectedClientId', student.client_id);
    console.log("Client ID almacenado:", student.client_id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  // Función handlePlanEntrenamientoClick para gestionar plan de entrenamiento
  const handlePlanEntrenamientoClick = async () => {
    if (!selectedStudent) return; // Si no hay estudiante seleccionado, no hacer nada.

    try {
      const response = await fetch(`${apiUrl27}?client_id=${selectedStudent.client_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ client_id: selectedStudent.client_id })
      });

      const trainingPlanData = await response.json();
      
      if (trainingPlanData.training_plan?.training_plan_id) {
        console.log('Plan de entrenamiento encontrado:', trainingPlanData);

        // Guardar el training_plan_id en localStorage si existe
        localStorage.setItem('trainingPlanId', trainingPlanData.training_plan.training_plan_id);
        console.log('Plan ID:', trainingPlanData.training_plan.training_plan_id);

        navigate(`/TrainingPlanOk?client_id=${selectedStudent.client_id}&role=${role}&token=${token}&username=${username}`);
      } else {
        navigate(`/Trainingplan?client_id=${selectedStudent.client_id}&role=${role}&token=${token}&username=${username}`);
      }
    } catch (error) {
      console.error('Error al traer el plan de entrenamiento:', error);
    }
  };

  // Filtrado de estudiantes según el término de búsqueda
  const filteredStudents = students.filter((student) =>
    student.nombres.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estructura del JSX para la interfaz
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        {loading && <p>Cargando estudiantes...</p>}

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
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td className="border-t py-2 px-4 text-black">{student.nombres}</td>
                <td className="border-t py-2 px-4 text-black">{student.entrenador}</td>
                <td className="border-t py-2 px-4 text-black">{student.sede}</td>
                <td className="border-t py-2 px-4 text-black">{student.membresia || 'No disponible'}</td>
                <td className="border-t py-2 px-4 text-black">{student.rango}</td>

                <td className="border-t py-2 px-4">
                  <button
                    className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded"
                    onClick={() => {
                      openModal(student); // Abre el modal y guarda el estudiante seleccionado
                      handlePlanEntrenamientoClick(); // Llama a la función para manejar el plan de entrenamiento
                    }}
                  >
                    Expandir
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListStudents;
