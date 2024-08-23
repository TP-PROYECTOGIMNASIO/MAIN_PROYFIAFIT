export default function Navbar(){
    return(
        <nav className="h-[10vh] flex justify-between bg-black">
            <img src={"/logo.png"} alt="logo fia fit" className="w-[80px]" />
            <div className="flex flex-row items-center mr-4 gap-20">
                <h1 className="text-[20px] font-bold">hola</h1>
                <img src={"/logo.png"} alt="icono usuario" className="border border-white rounded-full w-[60px] h-[60px]"/>
            </div>
        </nav>
    )
}