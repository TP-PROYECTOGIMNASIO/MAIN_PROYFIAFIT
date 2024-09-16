const HUVISUALLIZARINICIOSEGN = () => {
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
          Bienvenido Admin!
        </h1>

        <div className="grid grid-cols-2 gap-12">
          {/* Columna 1 - Información de Inventarios */}
          <div className="text-left">
            
            <div className="flex flex-col gap-4 bg-white p-4 rounded-b-lg shadow-lg">
              <button className="bg-white text-gray-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
                Administrar EMPLEADOS →
              </button>
              <button className="bg-white text-gray-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
                Administrar T.PRODUCTOS →
              </button>
              <button className="bg-white text-gray-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
               
              </button>
            </div>
          </div>

          {/* Columna 2 - Información de Compras */}
          <div className="text-left">
            
            <div className="flex flex-col gap-4 bg-white p-4 rounded-b-lg shadow-lg">
              <button className="bg-white text-gray-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
                Administrar CLIENTES →
              </button>
              <button className="bg-white text-gray-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
              Administrar T.EJERCICIOS →
              </button>
              <button className="bg-white text-gray-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
               
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HUVISUALLIZARINICIOSEGN;
