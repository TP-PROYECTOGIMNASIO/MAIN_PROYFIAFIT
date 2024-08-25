export default function Navbar(){
    return(
        <nav className="h-[10vh] flex justify-between p-2" style={{backgroundColor:"#FFFFFF"}}>
            <img src={"/logo.png"} alt="logo fia fit" className="w-[80px]" />
            <div className="flex flex-row items-center mr-4 gap-20">
                <h1 className="text-[20px] font-bold" style={{color:"#4B4F57"}}>hola</h1>
                <img src={"/logo.png"} alt="icono usuario" className="border border-white rounded-full w-[60px] h-[60px]"/>
            </div>
        </nav>
    )
}