import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft as ArrowLeftIcon } from 'react-icons/fa';

const RegistrarMetricasAlumno = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const clientId = searchParams.get('client_id');
    
    const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
    const apiUrl22 = import.meta.env.VITE_APP_API_URL_22;

    const [user, setUser] = useState({});
   
    const params = new URLSearchParams(window.location.search);
    console.log("Todos los parámetros:", window.location.search); // Verificar que todos los parámetros están presentes
    
    const role = params.get("role");
    const token = params.get("token");
    const username = params.get("username");
    console.log("role recibido en Visualizar inicio:", role);
    console.log("token recibido en Visualizar inicio:", token);
    console.log("username recibido en Visualizar inicio:", username);
  
    
  
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

    const [formData, setFormData] = useState({
        height: "",
        weight: "",
        Pecho: "",
        Cintura: "",
        Cadera: "",
        Brazo: "",
        Muslo: "",
        Hombro: "",
        goal_id: "",
        ideal_weight: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const calculateIMC = (weight, height) => {
        const heightInMeters = height / 100;
        return weight / (heightInMeters * heightInMeters);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const imc = calculateIMC(parseFloat(formData.weight), parseFloat(formData.height));
            const currentDate = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

            const bodyData = {
                client_id: parseInt(clientId),
                metric_date: currentDate,
                height: parseFloat(formData.height),
                weight: parseFloat(formData.weight),
                chest_cm: parseFloat(formData.Pecho),
                waist_cm: parseFloat(formData.Cintura),
                hip_cm: parseFloat(formData.Cadera),
                arm_cm: parseFloat(formData.Brazo),
                thigh_cm: parseFloat(formData.Muslo),
                shoulder_cm: parseFloat(formData.Hombro),
                goal_id: parseInt(formData.goal_id) || 1,
                ideal_weight: parseFloat(formData.ideal_weight),
                imc: parseFloat(imc.toFixed(2))
            };

            console.log("Datos a enviar:", JSON.stringify(bodyData, null, 2));

            const response = await fetch(`${apiUrl22}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });

            const responseData = await response.json();
            console.log("Respuesta del servidor:", responseData);

            if (response.ok) {
                alert('Métricas registradas con éxito');
                navigate(`/vista-no-registrado?client_id=${clientId}&role=${role}&token=${token}&username=${username}`);
            } else {
                throw new Error(responseData.error || 'Error al registrar las métricas');
            }
        } catch (error) {
            console.error('Error completo:', error);
            alert(`Hubo un error al registrar las métricas: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="flex flex-col items-center w-full min-h-screen p-4 bg-gray-100">
            <div className="flex items-center justify-between w-full mb-4 sm:mb-6">
                <Link to={`/vista-no-registrado?client_id=${clientId}&role=${role}&token=${token}&username=${username}`}>
                    <ArrowLeftIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
                </Link>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row w-full p-4 bg-white shadow-md mt-4 space-y-4 md:space-y-0">
                <section className="text-black w-full md:w-1/3 p-4 bg-gray-50">
                    <h3 className="text-lg font-bold mb-2 border-b-2 border-red-600 pb-2">Ingresar Datos Básicos</h3>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block mb-2">
                                <span className="text-gray-700">Altura (cm)</span>
                                <input
                                    type="number"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    placeholder="Ingrese la altura" required/>
                            </label>
                        </div>
                        <div>
                            <label className="block mb-2">
                                <span className="text-gray-700">Peso (kg)</span>
                                <input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    placeholder="Ingrese el peso"
                                    required/>
                            </label>
                        </div>
                    </div>
                </section>
                <section className="text-black w-full md:w-1/3 p-4 bg-gray-50 border-l-4">
                    <h3 className="text-lg font-bold mb-2 border-b-2 border-red-600 pb-2">Ingresar Medidas</h3>
                    <div className="flex flex-col gap-4">
                        {['Pecho', 'Cintura', 'Cadera', 'Brazo', 'Muslo', 'Hombro'].map(key => (
                            <label key={key} className="block mb-2">
                                <span className="text-gray-700 capitalize">{key.replace(/_/g, ' ')}</span>
                                <input
                                    type="number"
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    placeholder={`Ingrese ${key.replace(/_/g, ' ')}`}
                                    required/>
                            </label>
                        ))}
                    </div>
                </section>
                <section className="text-black w-full md:w-1/3 p-4 bg-gray-50 border-l-4">
                    <h3 className="text-lg font-bold mb-2 border-b-2 border-red-600 pb-2">Objetivos</h3>
                    <div className="mb-4">
                        <select
                            name="goal_id"
                            value={formData.goal_id}
                            onChange={handleInputChange}
                            className="block w-full text-white bg-red-600 border border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="">Seleccionar Objetivo</option>
                            <option value="1">Ganar Masa Muscular</option>
                            <option value="2">Pérdida de Peso o Grasa</option>
                            <option value="3">Mejorar la Flexibilidad</option>
                            <option value="4">Mejorar la Resistencia</option>
                        </select>
                    </div>
                    <br/>
                    <label className="block mb-6">
                        <span className="text-gray-700">Peso Ideal (kg)</span>
                        <input
                            type="number"
                            name="ideal_weight"
                            value={formData.ideal_weight}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            placeholder="Ingrese el peso ideal"
                            required/>
                    </label>

                    <button
                        type="submit"
                        className="bg-red-600 text-white px-4 py-2 rounded-md">
                        Aceptar
                    </button>
                </section>
            </form>
        </div>
    );
};

export default RegistrarMetricasAlumno;