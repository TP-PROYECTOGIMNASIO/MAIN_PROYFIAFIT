import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa"; // Importamos el ícono que usaremos

const HUVISUALLIZARINICIOSEGN = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-end p-10 relative">
      <img
        src="/assets/fondo.png"
        alt="Imagen de fondo"
        className="absolute left-0 bottom-0 w-full h-full object-cover z-0"
      />

      <div className="w-full max-w-4xl relative z-10">
        <h1 className="text-4xl font-bold mb-12 text-red-600 text-center">
          Bienvenido Admin
        </h1>

        <div className="grid grid-cols-2 gap-0">
          <div className="text-left">
            <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-b-lg max-w-xs mx-auto">
              <Link to={"/"} className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-lg">Administrar</h3>
                  <h1 className="text-3xl">EMPLEADOS</h1>
                </div>
                <FaChevronRight className="text-red-600 text-3xl" /> {/* Ícono de flecha */}
              </Link>
              <Link to={"/Lista_Tipo_Productos"} className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-lg">Administrar</h3>
                  <h1 className="text-3xl">T.PRODUCTOS</h1>
                </div>
                <FaChevronRight className="text-red-600 text-3xl" />
              </Link>
              <Link to={"/Lista_Productos"} className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-lg">Administrar</h3>
                  <h1 className="text-3xl">PRODUCTOS</h1>
                </div>
                <FaChevronRight className="text-red-600 text-3xl" />
              </Link>
            </div>
          </div>

          <div className="text-left">
            <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-b-lg max-w-xs mx-auto">
              <Link to={"/"} className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-lg">Administrar</h3>
                  <h1 className="text-3xl">CLIENTES</h1>
                </div>
                <FaChevronRight className="text-red-600 text-3xl" />
              </Link>
              <Link to={"/tejercicios"}className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-lg">Administrar</h3>
                  <h1 className="text-3xl">T.EJERCICIOS</h1>
                </div>
                <FaChevronRight className="text-red-600 text-3xl" />
              </Link>
              <Link to={"/"} className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-lg">Administrar</h3>
                  <h1 className="text-3xl">OTRO</h1>
                </div>
                <FaChevronRight className="text-red-600 text-3xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HUVISUALLIZARINICIOSEGN;

