

const PhysicPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-end p-10 relative">
      {/* Imagen a la izquierda */}
    


<div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-12 text-red-600 text-center">
          
        </h1>

        <div className="grid grid-cols-1 gap-12">
          {/* Columna 1 - Información de Inventarios */}
          <div className="text-left">
            
            
            <div className="flex flex-col gap-4 bg-white p-4 rounded-b-lg shadow-lg">
              <button className="bg-white text-red-600  font-semibold py-2 px-4 rounded-lg">
                Administrar EMPLEADOS
              </button>
              <button className="bg-white text-red-600 font-semibold py-2 px-4 rounded-lg">
              Administrar T. PRODUCTOS
              </button> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicPage;
