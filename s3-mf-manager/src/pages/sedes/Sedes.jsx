import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Sedes() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalErrorOpen, setModalErrorOpen] = useState(false);
    const [msjError, setMsjError] = useState("");
    const [sedes, setSedes] = useState([]);
    const [filter, setFilter] = useState('all'); // Estado para manejar el filtro

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
    const handleOpenModalError = () => setModalErrorOpen(true);
    const handleCloseModalError = () => setModalErrorOpen(false);

    const fetchSedes = () => {
        fetch("https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/planilla-por-sedes/hu-tp-77")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener las sedes");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setSedes(data.locations); // Asegúrate de que data.locations contenga las sedes correctas
            })
            .catch(error => {
                console.error("Error:", error);
                setMsjError("Error al cargar las sedes");
                setModalErrorOpen(true);
            });
    };

    useEffect(() => {
        fetchSedes();
    }, []);

    // Filtra las sedes basado en el filtro seleccionado
    const filteredSedes = sedes.filter(sede => {
        if (filter === 'all') return true;
        if (filter === 'active') return sede.active; // Filtra las sedes activas
        if (filter === 'inactive') return !sede.active; // Filtra las sedes inactivas
    });

    return (
        <main className="min-h-[84vh] flex flex-col gap-4" style={{ backgroundColor: "#F3F4F7" }}>
            <div className="flex justify-between pt-4">
                <Link className="ml-4 flex items-center justify-center gap-1 text-black" to={"/"}>
                    <strong className="h-full flex items-center text-center text-[24px] font-bold">&lt;</strong>
                    <span className="h-full flex items-center text-center mt-1">Regresar</span>
                </Link>
                <button 
                    onClick={handleOpenModal} 
                    className="mr-4 p-2 pr-8 pl-4 flex items-center"
                    style={{ backgroundColor: "#B5121C", borderRadius: "5px" }}
                >
                    <strong className="font-extrabold text-[30px] text-white">+</strong>
                    <span className="mt-1 text-white">Registrar Nueva Sede</span>
                </button>
            </div>
            <div className="pb-4 flex flex-row justify-right max-w-[300px]">
                <label className="ml-4 p-2 text-black font-semibold flex items-center" style={{ backgroundColor: "#B5121C", borderRadius: "5px" }}>
                    <span>Ordenar por</span>
                </label>
                <select 
                    className="ml-4 mt-2 p-2 border bg-white text-black min-w-[150px] font-semibold" 
                    style={{ borderRadius: "5px" }}
                    value={filter} // Establece el valor del filtro en el select
                    onChange={(e) => setFilter(e.target.value)} // Actualiza el filtro cuando cambia el select
                >
                    <option value="all">Todos</option>
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                </select>
            </div>
            <div className="flex min-h-[60vh] justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                    {filteredSedes && filteredSedes.length > 0 ? (
                        filteredSedes.map((sede) => (
                            <CardSede key={sede.location_id} sede={sede} />
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">No se encontraron sedes.</p>
                    )}
                </div>
            </div>
            <Modal 
                isOpen={isModalOpen} onClose={handleCloseModal} openError={handleOpenModalError} 
                asignarMsj={setMsjError} 
                onRegisterSuccess={fetchSedes} // Pasa la función fetchSedes como prop
            />
            <ModalError isOpen={isModalErrorOpen} onClose={handleCloseModalError} msj={msjError} asignarMsj={setMsjError} />
        </main>
    );
}
function CardSede({ sede }) {
    const [selectBgColor, setSelectBgColor] = useState(sede.active ? '#B5121C' : '#4B4F57');
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [pendingStatus, setPendingStatus] = useState(sede.active ? 'active' : 'inactive');
    const [prevStatus, setPrevStatus] = useState(sede.active ? 'active' : 'inactive');

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setPrevStatus(pendingStatus); // Guardar el estado anterior
        setPendingStatus(newStatus); // Guardar el estado pendiente para confirmación

        const newColor = newStatus === 'inactive' ? '#4B4F57' : '#B5121C';
        setSelectBgColor(newColor);

        const action = newStatus === 'inactive' ? 'deshabilitar' : 'habilitar';
        setModalMessage(`¿Desea ${action} esta sede?`);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectBgColor(prevStatus === 'inactive' ? '#4B4F57' : '#B5121C'); // Restaurar color anterior
        setPendingStatus(prevStatus); // Restaurar estado anterior
        setModalOpen(false);
    };

    const handleConfirm = () => {
        // Hacer la llamada a la API para actualizar el estado
        fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/planilla-por-sedes/hu-tp-77', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: pendingStatus === 'inactive' ? false : true,
                location_id: sede.location_id
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setPrevStatus(pendingStatus); // Confirmar el nuevo estado como anterior
            setSelectBgColor(pendingStatus === 'inactive' ? '#4B4F57' : '#B5121C'); // Cambiar color basado en el nuevo estado
            setModalOpen(false); // Cerrar el modal
        })
        .catch((error) => {
            console.error('Error:', error);
            setSelectBgColor(prevStatus === 'inactive' ? '#4B4F57' : '#B5121C'); // Restaurar color anterior
            setPendingStatus(prevStatus); // Restaurar estado anterior
            setModalOpen(false); // Cerrar el modal
        });
    };

    return (
        <div className="flex flex-col justify-center items-center m-2 p-4 pt-8 pb-8 gap-2 min-w-[200px] max-w-[500px]" style={{ borderRadius: "10px", backgroundColor: "#BFB6B8" }}>
            <img 
                src={sede.image_url} 
                alt={`Imagen de ${sede.name}`} 
                className="min-w-[180px] max-w-[300px] md:max-w-[350px] lg:max-w-[400px] border border-white" 
            />
            <h2 className="font-extrabold text-[24px] text-white">{sede.name}</h2>
            <p className="text-center text-gray-700">{sede.address}</p>
            <select
                value={pendingStatus}
                onChange={handleStatusChange}
                className="p-2 border min-w-[150px] font-extrabold"
                style={{ backgroundColor: selectBgColor, borderRadius: "5px" }}
            >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
            </select>
            
            {/* Modal Component */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
                    <div className="bg-white p-6 rounded-lg shadow-lg relative">
                        <button 
                            onClick={handleCloseModal} 
                            className="absolute top-1 right-2 text-black text-[24px] rounded-full flex items-center justify-center"
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-bold mb-4" style={{ color: "#B5121C" }}>{modalMessage}</h3>
                        <div className="flex justify-center gap-4">
                            <button 
                                onClick={handleConfirm} 
                                className="p-2 px-4 text-white rounded"
                                style={{ backgroundColor: "#B5121C" }}
                            >
                                Sí
                            </button>
                            <button 
                                onClick={handleCloseModal} 
                                className="p-2 px-4 text-white rounded"
                                style={{ backgroundColor: "#4B4F57" }}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



function Modal({ isOpen, onClose, openError, asignarMsj, onRegisterSuccess }) {
    const [sede, setSede] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [imagen, setImagen] = useState(null);

    if (!isOpen) return null;

    const ejercutarModal = () => {
        // Validar que todos los campos estén llenos
        if (!sede || !ubicacion || !imagen) {
            ejecutarError();
            return;
        }

        const formData = new FormData();
        formData.append('name', sede);
        formData.append('address', ubicacion);
        formData.append('file', imagen);  // Agregar archivo de imagen

        // Imprimir el contenido de formData en la consola para verificar
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        // Enviar los datos usando fetch
        fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/planilla-por-sedes/hu-tp-76', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 409) {
                    throw new Error('Conflict: El recurso ya existe.');
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            limpiarFormulario();
            onRegisterSuccess();  // Ejecutar la acción de éxito
            onClose();  // Cerrar el modal
        })
        .catch((error) => {
            console.error('Error:', error.message);
            ejecutarError();
        });
    };

    const limpiarFormulario = () => {
        setSede('');
        setUbicacion('');
        setImagen(null);  // Restablecer imagen a null
    };

    const ejecutarError = () => {
        openError();
        asignarMsj("Error: No se ha completado todos los campos");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="p-8 rounded-lg shadow-lg relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 text-black text-[50px] w-[75px] rounded-full flex items-center justify-center"
                >
                    <span style={{ fontWeight: 900, textAlign: "center" }}>&times;</span>
                </button>

                <div className="min-w-[360px] min-h-[350px] p-4 flex flex-col justify-center gap-4"
                    style={{ borderRadius: "10px", backgroundColor: "#DFE0E1" }}
                >
                    <h2 className="text-xl font-extrabold mb-4 text-black text-center" style={{ color: "#B5121C" }}>Registrar Nueva Sede</h2>
                    <div className="flex flex-row justify-between">
                        <label className="text-black" htmlFor="sede">Sede:</label>
                        <input 
                            className="text-black bg-white p-1 text-center max-w-[180px]" 
                            type="text" 
                            placeholder="sede"
                            value={sede}
                            onChange={(e) => setSede(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row justify-between">
                        <label className="text-black" htmlFor="ubicacion">Ubicación:</label>
                        <input 
                            className="text-black bg-white p-1 text-center max-w-[180px]" 
                            type="text" 
                            placeholder="ubicación"
                            value={ubicacion}
                            onChange={(e) => setUbicacion(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row justify-between">
                        <label className="text-black" htmlFor="imagen">Imagen:</label>
                        <input 
                            className="text-black bg-white p-1 text-center max-w-[180px]" 
                            type="file" // Cambiado a "file"
                            accept="image/jpeg" // Acepta solo JPEG
                            onChange={(e) => setImagen(e.target.files[0])} // Guardar el archivo seleccionado
                        />
                    </div>
                    <div className="flex justify-center">
                        <button 
                            className="ml-4 p-2 text-white font-semibold min-w-[100px] max-w-[200px]" 
                            style={{ backgroundColor: "#B5121C", borderRadius: "5px" }}
                            onClick={ejercutarModal}  // Llamar a ejercutarModal al hacer clic
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ModalError({ isOpen, onClose,msj,asignarMsj}) {
    if (!isOpen) return null;

    if(msj=="") return null;

    const cerrarError=()=>{
        onClose
        asignarMsj("")
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className=" p-8 rounded-lg shadow-lg relative">

                <button 
                    onClick={onClose} 
                    className="absolute  text-white text-[50px] w-[75px] rounded-full flex items-center justify-center"
                    
                >
                    <span className="text-black" style={{fontWeight:900,textAlign:"center"}}>&times;</span>
                    
                </button>

                <div className="bg-white min-w-[500px] min-h-[200px] p-4 flex flex-col justify-center gap-4"
                    style={{borderRadius:"10px"}}
                >
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-black text-center">{msj}</h2>

                    </div>

                    <div className="flex justify-center">
                        <button onClick={cerrarError} className="ml-4 p-2 text-white font-semibold min-w-[100px] max-w-[200px]" style={{backgroundColor:"#B5121C",borderRadius:"5px"}}>
                            Volver
                        </button>
                    </div>

                </div>


            </div>
        </div>
    );
}