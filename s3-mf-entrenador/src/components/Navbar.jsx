import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser as UserIcon, FaBars as MenuIcon, FaTimes as CloseIcon } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const isHomePage = location.pathname === '/Inicio';

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/alumnos?staff_id=1');
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
                setStudents([]); // Asegúrate de que se establezca un array vacío en caso de error
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleListStudentsClick = () => {
        if (students.length === 0) {
            alert('No hay alumnos disponibles.'); // Muestra un mensaje si no hay alumnos
        } else {
            navigate('/listar-alumnos'); // Navega a la lista de alumnos si hay
        }
    };

    return (
        <nav className="min-h-[10vh] flex flex-col sm:flex-row justify-between items-center p-2 bg-white text-black border-b border-gray-300">
            <Link to="/">
                <img src={"/logo-3.png"} alt="logo fia fit" className="w-[30vh] h-[10vh]" />
            </Link>
            <button
                className="text-red-600 text-3xl sm:hidden"
                onClick={toggleMenu}
            >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            <div className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-20 ${isMenuOpen ? 'block' : 'hidden'} sm:flex`}>
                <div
                    className="flex flex-col text-center cursor-pointer text-black"
                    onClick={() => navigate('/')}
                >
                    <h1 className="text-[20px] font-bold">Alumnos</h1>
                    <h1 className="text-[20px] font-bold">Check - in</h1>
                </div>
                <div
                    className="flex flex-col text-center cursor-pointer text-black mr-16"
                    onClick={handleListStudentsClick} // Cambiado a la función de manejo
                >
                    <h1 className="text-[20px] font-bold">Lista de</h1>
                    <h1 className="text-[20px] font-bold">Alumnos</h1>
                </div>
            </div>
        </nav>
    );
}
