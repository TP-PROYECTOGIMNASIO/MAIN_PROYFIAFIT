import { Link } from "react-router-dom";

export default function Sedes(){
    return(
        <main className="min-h-[84vh] flex flex-col gap-4">
            <div className="flex justify-between pt-4">
                <Link className="ml-4 flex items-center justify-center gap-1" to={"/home"}>
                    <strong className="h-full flex items-center text-center text-[24px] font-bold">&lt;</strong>
                    <span className="h-full flex items-center text-center mt-1">Regresar</span>
                </Link>
                <button className="mr-4 p-2 flex items-center" style={{backgroundColor:"#AC1919",borderRadius:"5px"}}>
                    <strong className="font-extrabold text-[24px]">+</strong> 
                    <span className="mt-1">Registrar Nueva Sede</span>
                </button>
            </div>
            <div>
                <button className="ml-4 p-2 text-black font-semibold" style={{backgroundColor:"#72EE9B",borderRadius:"5px"}}>
                    <span>
                        Ordernar por
                    </span>
                </button>
                <select className="ml-4 mt-2 p-2 border bg-white text-black min-w-[150px] font-semibold" style={{borderRadius:"5px"}}>
                    <option value="activas">Activas</option>
                    <option value="inactivas">Inactivas</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CardSede />
                <CardSede />
                <CardSede />
            </div>
        </main>

    )
}

export function CardSede({}){
    return(
        <div className="flex flex-col justify-center items-center bg-black p-4 pt-8 pb-8 gap-2" style={{borderRadius:"10px"}}>
            <img src={"/logo.png"} alt="" className="min-w-[200px] max-w-[400px] border border-white" />
            <h2 className="font-extrabold text-[24px]">Nombre de la sede</h2>
            <select className="p-2 border min-w-[150px] font-semibold" style={{backgroundColor:"#AC1919",borderRadius:"5px"}}>
                <option value="activas">Activas</option>
                <option value="inactivas">Inactivas</option>
            </select>
        </div>
    )
}