export default function Navbar(){
    return(
        <nav className="h-[10vh] flex justify-between p-2" style={{backgroundColor:"#FFFFFF"}}>
            <img src={"/logo-3.png"} alt="logo fia fit" className="w-[30vh] h-[10vh]" />
            <div className="flex flex-row items-center mr-4 gap-20">
                <h1 className="text-[20px] font-bold" style={{color:"#4B4F57"}}>hola</h1>
                <img src={"/icono-user.png"} alt="icono usuario" className="border border-white rounded-full w-[8vh] h-[6vh]"/>
            </div>
        </nav>
    )
}