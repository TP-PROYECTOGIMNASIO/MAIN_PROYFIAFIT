import React, { useState } from 'react';
import mapaImg from '../../../public/image-56@2x.png'; // Ruta de la imagen

const RegisterForm = () => {
  const [fileName, setFileName] = useState(''); // Estado para el nombre del archivo
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [distrito, setDistrito] = useState(''); // Estado para el distrito seleccionado
  const [departamento] = useState('LIMA'); // Estado para el departamento
  const [provincia] = useState('LIMA'); // Estado para la provincia

  const [modalDistrito, setModalDistrito] = useState(''); // Estado para el distrito en el modal
  const [modalDepartamento, setModalDepartamento] = useState(''); // Estado para el departamento en el modal
  const [modalProvincia, setModalProvincia] = useState(''); // Estado para la provincia en el modal

  const handleRegresar = () => {
    console.log("Regresar");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Establece el nombre del archivo al seleccionarlo
    } else {
      setFileName(''); // Restablece el nombre si no hay archivo
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal); // Cambia el estado del modal
  };

  const handleGeolocalizar = () => {
    // Actualiza el estado del modal con los valores del formulario
    setModalDepartamento(departamento);
    setModalProvincia(provincia);
    setModalDistrito(distrito);
    toggleModal(); // Abre el modal
  };

  return (
    <div className="min-h-[82.23vh] bg-[#f3f4f7] p-4 flex flex-col">
      <div className="flex flex-col mb-4">
        <div className="flex justify-between w-full mb-4">
          <button
            onClick={handleRegresar}
            className="text-gray-700 text-[24px] flex items-center gap-2">
            <span>&lt;</span> Regresar
          </button>

          <button className="bg-red-600 text-white text-[24px] py-2 px-4 rounded">
            Registrar Nueva Sede
          </button>
        </div>

        {/* Contenedor de datos */}
        <div className="w-full max-w-2xl p-6 rounded-lg mx-auto overflow-auto bg-[#f3f4f7]">
          <div className="space-y-8">
            <div className="flex items-center mb-4">
              <label className="text-[20px] font-bold text-[#4b4f57] w-1/3 text-right pr-4">DEPARTAMENTO</label>
              <input
                type="text"
                value={departamento}
                readOnly
                className="p-2 bg-gray-200 rounded w-2/3 text-gray-700"
              />
            </div>

            <div className="flex items-center mb-4">
              <label className="text-[20px] font-bold text-[#4b4f57] w-1/3 text-right pr-4">PROVINCIA</label>
              <input
                type="text"
                value={provincia}
                readOnly
                className="p-2 bg-gray-200 rounded w-2/3 text-gray-700"
              />
            </div>

            <div className="flex items-center mb-4">
              <label className="text-[20px] font-bold text-[#4b4f57] w-1/3 text-right pr-4">DISTRITO</label>
              <select 
                className="p-2 bg-gray-200 rounded w-2/3 text-gray-700"
                value={distrito}
                onChange={(e) => setDistrito(e.target.value)} // Actualiza el estado del distrito
              >
                <option value="">Seleccione...</option>
                <option value="Miraflores">Miraflores</option>
                <option value="San Isidro">San Isidro</option>
                <option value="La Molina">La Molina</option>
                <option value="Surco">Surco</option>
                <option value="San Borja">San Borja</option>
                <option value="Lince">Lince</option>
                <option value="Barranco">Barranco</option>
                <option value="Pueblo Libre">Pueblo Libre</option>
                <option value="San Miguel">San Miguel</option>
                <option value="Callao">Callao</option>
                {/* Agregar más distritos según sea necesario */}
              </select>
            </div>

            <div className="flex items-center mb-4">
              <label className="text-[20px] font-bold text-[#4b4f57] w-1/3 text-right pr-4">NOMBRE DE LA VIA</label>
              <div className="flex items-center w-2/3">
                <input
                  type="text"
                  className="p-2 bg-gray-200 rounded text-gray-700 w-full"
                  placeholder="Ingrese el nombre de la vía"
                />
                {/* Botón "Geolocalizar" */}
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-4"
                  onClick={handleGeolocalizar} // Abre el modal y llena los campos
                >
                  GEOLOCALIZAR
                </button>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <label className="text-[20px] font-bold text-[#4b4f57] w-1/3 text-right pr-4">ADJUNTAR IMAGEN:</label>
              <div className="flex items-center w-2/3 bg-gray-200 rounded">
                <label className="p-2 bg-gray-200 rounded flex justify-center items-center cursor-pointer hover:bg-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 16.5V19a2.5 2.5 0 002.5 2.5h13a2.5 2.5 0 002.5-2.5v-2.5m-4-4l-5-5m0 0l-5 5m5-5v12"
                    />
                  </svg>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                <span className="ml-2 text-gray-700">{fileName || "Ningún archivo seleccionado"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de geolocalización */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[60%] h-[80%] relative ">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-2xl font-bold text-red-600"
            >
              &times;
            </button>
            <h2 className="text-[24px] font-bold text-center mb-4">GEOLOCALIZAR</h2>

            {/* Primera fila de botones con los datos del modal */}
            <div className="flex justify-center gap-4 mb-4">
              <button className="bg-gray-300 text-gray-800 px-12 py-3 text-xl rounded">{modalDepartamento}</button>
              <button className="bg-gray-300 text-gray-800 px-12 py-3 text-xl rounded">{modalProvincia}</button>
              <button className="bg-gray-300 text-gray-800 px-28 py-3 text-xl rounded">{modalDistrito}</button>
            </div>

            {/* Segunda fila de botones */}
            <div className="flex justify-center gap-4 mb-5 items-center">
            <input 
              type="INPUT" 

              className="bg-gray-300 justify-LEFT text-gray-800 px-28 py-3 text-xl rounded cursor-pointer" 
              onClick={() => {
                // Aquí puedes agregar la lógica que deseas ejecutar al hacer clic en el botón
              }} 
/>
              <button className="bg-[#AC1919] text-white px-5 py-3 text-xl rounded">BUSCAR</button>
              <button className="bg-green-600 text-white px-5 py-3 text-xl rounded">LIMPIAR</button>
            </div>
            <div className="flex justify-center">
              <img 
                src={mapaImg} 
                alt="Mapa" 
                className="object-cover" 
                style={{ width: '1000px', height: '400px' }} 
              />
            </div>
          </div>
         
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
