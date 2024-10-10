import { useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart as CartIcon, FaUser as UserIcon, FaBars as MenuIcon, FaTimes as CloseIcon } from 'react-icons/fa';
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
                const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/alumnos?staff_id=3');
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
        <nav className="min-h-[10vh] flex flex-col sm:flex-row justify-between items-center p-2 bg-white text-white border-b border-gray-300">
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
                {isHomePage ? (
                    <>
                        <div
                            className="flex items-center cursor-pointer text-red-600"
                            onClick={() => navigate('/products')}
                        >
                            <CartIcon className="text-3xl mr-2" /> 
                            <span className="text-lg">Productos</span>
                        </div>
                        <div
                            className="flex items-center cursor-pointer text-red-600 ml-4" 
                            onClick={() => navigate('/account')}
                        >
                            <UserIcon className="text-3xl mr-2" /> 
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            className="flex flex-col text-center cursor-pointer text-red-600"
                            onClick={() => navigate('/')}
                        >
                            <h1 className="text-[20px] font-bold">Alumnos</h1>
                            <h1 className="text-[20px] font-bold">Check - in</h1>
                        </div>
                        <div
                            className="flex flex-col text-center cursor-pointer text-red-600"
                            onClick={handleListStudentsClick} // Cambiado a la función de manejo
                        >
                            <h1 className="text-[20px] font-bold">Lista de</h1>
                            <h1 className="text-[20px] font-bold">Alumnos</h1>
                        </div>
                        <div
                            className="flex items-center gap-2 cursor-pointer text-red-600"
                            onClick={() => navigate('/')}
                        >
                            <UserIcon className="w-[8vh] h-[6vh]" />
                            <h1 className="text-[20px] font-bold">Salir</h1>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
}
