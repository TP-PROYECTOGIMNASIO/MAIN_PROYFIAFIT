import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Sedes(){

    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalErrorOpen, setModalErrorOpen] = useState(false);
    const [msjError,setMsjError] = useState("");
    const [sedes, setSedes] = useState([]); // Estado para almacenar las sedes

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);



    const handleOpenModalError = () => setModalErrorOpen(true);
    const handleCloseModalError = () => setModalErrorOpen(false);

    useEffect(() => {
        fetch("https://lwxfkitc10.execute-api.us-east-2.amazonaws.com/listar/")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener las sedes");
                }
                console.log(response)
                return response.json();
            })
            .then(data => {
                const datatotal=JSON.parse(data.body)
                console.log(datatotal.locations);  // Imprime los datos obtenidos
                setSedes(datatotal.locations); // Almacena las sedes en el estado
            })
            .catch(error => {
                console.error("Error:", error);
                setMsjError("Error al cargar las sedes");
                setModalErrorOpen(true); // Muestra el modal de error si falla la solicitud
            });
    }, []);
    return(
        <main className="min-h-[84vh] flex flex-col gap-4" style={{backgroundColor:"#F3F4F7"}}>
            <div className="flex justify-between pt-4">
                <Link className="ml-4 flex items-center justify-center gap-1 text-black" to={"/home"}>
                    <strong className="h-full flex items-center text-center text-[24px] font-bold">&lt;</strong>
                    <span className="h-full flex items-center text-center mt-1">Regresar</span>
                </Link>
                <button 
                    onClick={handleOpenModal} 
                    className="mr-4 p-2 pr-8 pl-4 flex items-center"
                    style={{backgroundColor:"#B5121C",borderRadius:"5px"}}
                >
                    <strong className="font-extrabold text-[30px]">+</strong>
                    <span className="mt-1">Registrar Nueva Sede</span>
                </button>
            </div>
            <div className="pb-4">
                <button className="ml-4 p-2 text-black font-semibold" style={{backgroundColor:"#B5121C",borderRadius:"5px"}}>
                    <span>
                        Ordernar por
                    </span>
                </button>
                <select className="ml-4 mt-2 p-2 border bg-white text-black min-w-[150px] font-semibold" style={{borderRadius:"5px"}}>
                    <option value="activas">Activas</option>
                    <option value="inactivas">Inactivas</option>
                </select>
            </div>
            <div className="flex min-h-[60vh] justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                    {sedes && sedes.length > 0 ? (
                        sedes.map((sede, index) => (
                            <CardSede key={index} sede={sede} /> // Pasa cada sede a CardSede
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">No se encontraron sedes.</p>
                    )}
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} openError={handleOpenModalError} asignarMsj={setMsjError} />
            <ModalError isOpen={isModalErrorOpen} onClose={handleCloseModalError} msj={msjError} asignarMsj={setMsjError}/>

        </main>

    )
}
/*
https://smecstc9rd.execute-api.us-east-2.amazonaws.com/actualizar/

{
  "action": "disable",
  "id": 3
}
enable  
*/
function CardSede({ sede }) {
    const [selectBgColor, setSelectBgColor] = useState(sede.status === 'inactive' ? '#4B4F57' : '#B5121C');
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        const newColor = newStatus === 'inactive' ? '#4B4F57' : '#B5121C';
        setSelectBgColor(newColor);

        // Set the message for the modal based on the new status
        const action = newStatus === 'inactive' ? 'deshabilitar' : 'habilitar';
        setModalMessage(`¿Desea ${action} esta sede?`);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirm = () => {
        // Make the API call to update the status

    };

    return (
        <div className="flex flex-col justify-center items-center m-2 p-4 pt-8 pb-8 gap-2 min-w-[200px] max-w-[500px]" style={{ borderRadius: "10px", backgroundColor: "#BFB6B8" }}>
            <img 
                src={sede.photo} 
                alt={`Imagen de ${sede.name}`} 
                className="min-w-[180px] max-w-[300px] md:max-w-[350px] lg:max-w-[400px] border border-white" 
            />
            <h2 className="font-extrabold text-[24px]">{sede.name}</h2>
            <p className="text-center text-gray-700">{sede.address}</p>
            <select
                defaultValue={sede.status}
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
function Modal({ isOpen, onClose, openError, asignarMsj }) {
    const [sede, setSede] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [imagen, setImagen] = useState('');

    if (!isOpen) return null;

    const ejercutarModal = () => {
        if (!sede || !ubicacion || !imagen) {
            ejecutarError();
            return;
        }

        const data = {
            name: sede,
            photo: imagen,
            address: ubicacion
        };
        console.log(data);
        fetch('https://irgzydz99c.execute-api.us-east-2.amazonaws.com/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response =>response.json())
            
        .then(data => {
            console.log('Success:', data);
            onClose();  // Cierra el modal después de la respuesta exitosa
        })
        .catch((error) => {
            console.error('Error:', error);
            ejecutarError();
        });
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
                    className="absolute top-1 left-1 text-white text-[50px] w-[75px] rounded-full flex items-center justify-center"
                    style={{backgroundColor:"#B5121C"}}
                >
                    <span style={{fontWeight:900, textAlign:"center"}}>&times;</span>
                </button>

                <div className="bg-white min-w-[320px] min-h-[300px] p-4 flex flex-col justify-center gap-4"
                    style={{borderRadius:"10px"}}
                >
                    <h2 className="text-xl font-bold mb-4 text-black text-center">Registrar Nueva Sede</h2>
                    <div className="flex flex-row justify-between">
                        <label className="text-black" htmlFor="sede">Sede:</label>
                        <input 
                            className="text-white bg-black p-1 text-center" 
                            type="text" 
                            placeholder="sede"
                            value={sede}
                            onChange={(e) => setSede(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row justify-between">
                        <label className="text-black" htmlFor="ubicacion">Ubicación:</label>
                        <input 
                            className="text-white bg-black p-1 text-center" 
                            type="text" 
                            placeholder="ubicación"
                            value={ubicacion}
                            onChange={(e) => setUbicacion(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row justify-between">
                        <label className="text-black" htmlFor="imagen">Imagen:</label>
                        <input 
                            className="text-white bg-black p-1 text-center" 
                            type="text" 
                            placeholder="imagen"
                            value={imagen}
                            onChange={(e) => setImagen(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center" onClick={ejercutarModal}>
                        <button className="ml-4 p-2 text-white font-semibold min-w-[100px] max-w-[200px]" style={{backgroundColor:"#B5121C", borderRadius:"5px"}}>
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
                    className="absolute top-1 left-1 text-white text-[50px] w-[75px] rounded-full flex items-center justify-center"
                    style={{backgroundColor:"#B5121C"}}
                >
                    <span style={{fontWeight:900,textAlign:"center"}}>&times;</span>
                    
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