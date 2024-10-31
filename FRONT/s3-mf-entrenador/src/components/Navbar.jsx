import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser as UserIcon, FaBars as MenuIcon, FaTimes as CloseIcon } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
    const apiUrl26 = import.meta.env.VITE_APP_API_URL_26;
    const [user, setUser] = useState({});

    const params = new URLSearchParams(location.search);
    const role = params.get("role");
    const token = params.get("token");
    const username = params.get("username");
    console.log("role recibido en Navbar entrenador:", role);
    console.log("token recibido en Navbar entrenador:", token);
    console.log("username recibido en Navbar entrenador:", username);
    
    useEffect(() => {
        if (token && username) {
            fetchUserName();
        }
    }, [token, username]);

    const fetchUserName = async () => {
        try {
            const response = await fetch(`${apiUrlUSERNAME}?username=${username}`);
            if (!response.ok) throw new Error("Error en la respuesta de la API");
            const data = await response.json();

            if (Array.isArray(data) && data.length > 0) {
                setUser(data[0]);
                console.log("Usuario obtenido estando en el navbar:", data[0]); // Imprimir información del usuario
            } else {
                setUser({});
                console.warn("No se encontró información del usuario.");
            }
        } catch (error) {
            console.error("Error al obtener la información del usuario", error);
        }
    };

    useEffect(() => {
        const fetchStudents = async () => {
            if (user.id) {
                try {
                    const response = await fetch(`${apiUrl26}?staff_id=${user.id}`);
                    if (!response.ok) throw new Error('Error en la respuesta de la API');
                    const data = await response.json();
                    setStudents(data);
                    console.log("Estudiantes obtenidos:", data); // Imprimir información de los estudiantes
                } catch (error) {
                    console.error('Error fetching students:', error);
                    setStudents([]); // Asegúrate de que se establezca un array vacío en caso de error
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchStudents();
    }, [user.id]);

    const handleListStudentsClick = () => {
        if (students.length === 0) {
            alert('No hay alumnos disponibles.');
        } else {
            navigate(`/listar-alumnos?role=${role}&token=${token}&username=${username}`);
        }
    };

    return (
        <nav className="min-h-[10vh] flex flex-col sm:flex-row justify-between items-center p-2 bg-white text-black border-b border-gray-300">
            <Link to={`/?role=${role}&token=${token}&username=${username}`}>
                <img src={"/logo-3.png"} alt="logo fia fit" className="w-[30vh] h-[10vh]" />
            </Link>
            <button className="text-red-600 text-3xl sm:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            <div className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-20 ${isMenuOpen ? 'block' : 'hidden'} sm:flex`}>
                <div className="flex flex-col text-center cursor-pointer text-black" onClick={() => navigate(`/?role=${role}&token=${token}&username=${username}`)}>
                    <h1 className="text-[20px] font-bold">Alumnos</h1>
                    <h1 className="text-[20px] font-bold">Check - in</h1>
                </div>
                <div className="flex flex-col text-center cursor-pointer text-black mr-16" onClick={handleListStudentsClick}>
                    <h1 className="text-[20px] font-bold">Lista de</h1>
                    <h1 className="text-[20px] font-bold">Alumnos</h1>
                </div>
            </div>

            {loading && <p>Cargando estudiantes...</p>} {/* Mensaje de carga */}
        </nav>
    );
}
