

import { Link } from "react-router-dom";
const ManagerPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-end p-10 relative">
      {/* Imagen a la izquierda */}
      <img
  src="/assets/fondo.png"
  alt="Imagen de fondo"
  className="absolute left-0 bottom-0 w-full h-full object-cover"
/>



      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-12 text-red-600 text-center">
          Bienvenido Manager!
        </h1>

        <div className="grid grid-cols-3 gap-12">
          {/* Columna 1 - Información de Inventarios */}
          <div className="text-left">
            <h2 className="text-xl font-semibold bg-red-600 text-white py-2 px-4 rounded-t-lg">
              Información de Inventarios
            </h2>
            <div className="flex flex-col gap-4 bg-white p-4 rounded-b-lg shadow-lg">
         
                <Link to="/sedes" className="bg-white text-red-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
                  Sedes →
                </Link>
              
                <Link to="/ActualizarInventarioSedes" className="bg-white text-red-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
                  Inventario →
                </Link>
             
                <Link to="/GenerarNuevoInventario" className="bg-white text-red-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
                  Visitantes →
                </Link>
          
            </div>
          </div>

          {/* Columna 2 - Información de Compras */}
          <div className="text-left">
            <h2 className="text-xl font-semibold bg-red-600 text-white py-2 px-4 rounded-t-lg">
              Información de Compras
            </h2>
            <div className="flex flex-col gap-4 bg-white p-4 rounded-b-lg shadow-lg">
              <button className="bg-white text-red-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
                Membresías →
              </button>
              <button className="bg-white text-red-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
                Promociones →
              </button>
              <button className="bg-white text-red-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
                Empleados →
              </button>
            </div>
          </div>

          {/* Columna 3 - Información de Ventas */}
          <div className="text-left">
            <h2 className="text-xl font-semibold bg-red-600 text-white py-2 px-4 rounded-t-lg">
              Información de Ventas
            </h2>
            <div className="flex flex-col gap-4 bg-white p-4 rounded-b-lg shadow-lg">
              <button className="bg-white text-red-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
                Rangos →
              </button>
              <button className="bg-white text-red-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
                Clientes →
              </button>
              <button className="bg-white text-red-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
                Pagos →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;
