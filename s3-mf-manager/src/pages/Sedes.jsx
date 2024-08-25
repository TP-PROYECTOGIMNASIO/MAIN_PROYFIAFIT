import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sedes(){

    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalErrorOpen, setModalErrorOpen] = useState(false);
    const [msjError,setMsjError] = useState("");
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);



    const handleOpenModalError = () => setModalErrorOpen(true);
    const handleCloseModalError = () => setModalErrorOpen(false);
    return(
        <main className="min-h-[84vh] flex flex-col gap-4">
            <div className="flex justify-between pt-4">
                <Link className="ml-4 flex items-center justify-center gap-1" to={"/home"}>
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
                    <CardSede />
                    <CardSede />
                    <CardSede />
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} openError={handleOpenModalError} asignarMsj={setMsjError} />
            <ModalError isOpen={isModalErrorOpen} onClose={handleCloseModalError} msj={msjError} asignarMsj={setMsjError}/>

        </main>

    )
}

function CardSede({}){
    return(
        <div className="flex flex-col justify-center items-center m-2 p-4 pt-8 pb-8 gap-2 min-w-[200px] max-w-[500px]" style={{borderRadius:"10px",backgroundColor:"#BFB6B8"}}>
            <img src={"/logo.png"} alt="" className="min-w-[180px] max-w-[300px] md:max-w-[350px] lg:max-w-[400px] border border-white" />
            <h2 className="font-extrabold text-[24px]">Nombre de la sede</h2>
            <select className="p-2 border min-w-[150px] font-semibold" style={{backgroundColor:"#B5121C",borderRadius:"5px"}}>
                <option value="activas">Activas</option>
                <option value="inactivas">Inactivas</option>
            </select>
        </div>
    )
}


function Modal({ isOpen, onClose,openError, asignarMsj }) {
    if (!isOpen) return null;

    const ejercutarModal=()=>{
        openError
        asignarMsj("Error: No se ha completado todos los campos")
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

                <div className="bg-white min-w-[320px] min-h-[300px] p-4 flex flex-col justify-center gap-4"
                    style={{borderRadius:"10px"}}
                >
                    <h2 className="text-xl font-bold mb-4 text-black text-center">Registrar Nueva Sede</h2>
                    <div className="flex flex-row justify-between">
                        <label className="text-black" htmlFor="sede">Sede:</label>
                        <input className="text-white p-1 text-center" type="text" placeholder="sede"/>
                    </div>
                    <div className="flex flex-row justify-between">
                        <label className="text-black" htmlFor="sede">Ubicación:</label>
                        <input className="text-white p-1 text-center" type="text" placeholder="ubicación"/>
                    </div>
                    <div className="flex flex-row justify-between">
                        <label className="text-black" htmlFor="sede">Imagen:</label>
                        <input className="text-white p-1 text-center" type="text" placeholder="imagen"/>
                    </div>
                    <div className="flex justify-center" onClick={ejercutarModal}>
                        <button className="ml-4 p-2 text-white font-semibold min-w-[100px] max-w-[200px]" style={{backgroundColor:"#B5121C",borderRadius:"5px"}}>
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