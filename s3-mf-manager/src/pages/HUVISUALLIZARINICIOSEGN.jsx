import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa"; // Importamos el ícono

const ManagerPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-end p-10 relative">
      {/* Imagen a la izquierda */}
      <img
        src="/assets/fondo.png"
        alt="Imagen de fondo"
        className="absolute left-0 bottom-0 w-full h-full object-cover z-0" // Ajustar z-index aquí
      />

      <div className="w-full max-w-4xl relative z-10">
        {/* Asegurarse de que el contenedor esté encima */}
        <h1 className="text-4xl font-bold mb-12 text-red-600 text-center">
          Bienvenido Manager!
        </h1>

        <div className="grid grid-cols-3 gap-12">
          {/* Columna 1 - Información de Inventarios */}
          <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-b-lg">
            <Link to="/Inventario-Sede" className="text-xl font-semibold bg-red-600 text-white py-2 px-4 rounded-t-lg">
              Información de Inventarios
            </Link>
            <Link to="/sedes" className="bg-white text-red-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center">
              Sedes <FaChevronRight className="text-red-600 text-lg" />
            </Link>
            <Link to="/ActualizarInventarioSedes" className="bg-white text-red-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center">
              Inventario <FaChevronRight className="text-red-600 text-lg" />
            </Link>
            <Link to="/" className="bg-white text-red-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center">
              Visitantes <FaChevronRight className="text-red-600 text-lg" />
            </Link>
          </div>

          {/* Columna 2 - Información de Compras */}
          <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-b-lg">
            <Link to="/Informe-Compra" className="text-xl font-semibold bg-red-600 text-white py-2 px-4 rounded-t-lg">
              Información de Compras
            </Link>
            <Link to="/membresias" className="bg-white text-red-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center">
              Membresías <FaChevronRight className="text-red-600 text-lg" />
            </Link>
            <Link to="/" className="bg-white text-red-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center">
              Promociones <FaChevronRight className="text-red-600 text-lg" />
            </Link>
            <Link to="/empleados" className="bg-white text-red-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center">
              Empleados <FaChevronRight className="text-red-600 text-lg" />
            </Link>
          </div>

          {/* Columna 3 - Información de Ventas */}
          <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-b-lg">
            <h2 className="text-xl font-semibold bg-red-600 text-white py-2 px-4 rounded-t-lg">
              Información de Ventas
            </h2>
            <Link to="/" className="bg-white text-red-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center">
              Rangos <FaChevronRight className="text-red-600 text-lg" />
            </Link>
            <Link to="/" className="bg-white text-red-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center">
              Clientes <FaChevronRight className="text-red-600 text-lg" />
            </Link>
            <Link to="/" className="bg-white text-red-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center">
              Pagos <FaChevronRight className="text-red-600 text-lg" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;
