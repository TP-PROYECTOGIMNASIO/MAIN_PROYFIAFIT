import React, { useState } from 'react';

const PlanForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [registeredDays, setRegisteredDays] = useState({});
  const [message, setMessage] = useState('');

  const openModal = (day) => {
    setSelectedDay(day);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDay('');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Registrar el día como completado
    setRegisteredDays((prevDays) => ({
      ...prevDays,
      [selectedDay]: true,
    }));
    closeModal();
  };

  const handleSubmit = () => {
    const allRegistered = Object.keys(registeredDays).length === 5; // Cambiar a 5 si tienes 5 días

    if (allRegistered) {
      const confirmRegister = window.confirm("¿SEGURO QUE DESEAS REGISTRAR ESTE PLAN?");
      if (confirmRegister) {
        // Lógica para registrar el plan
        alert("Plan registrado con éxito!");
        // Aquí puedes añadir la lógica para navegar a la pantalla principal
      } //else {
        // Navegar a la pantalla principal de general plan
        //alert("Regresando a la pantalla principal.");
      //}
    } else {
      setMessage("Aún no has registrado todos los días."); // Mensaje de error
      setTimeout(() => setMessage(''), 5000); // Limpiar mensaje después de 5 segundos
    }
  };

  return (
    <div className="min-h-[82vh] bg-gray-100 flex flex-col items-center justify-center py-4 relative">
      {/* Botón Regresar */}
      <button className="absolute top-4 left-4 text-gray-600 text-2xl hover:text-black">
        <span>&lt; Regresar</span>
      </button>

      {/* Contenedor Principal Centrando el Formulario */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8 mx-auto">
        {/* Encabezado del Formulario */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold mb-2 text-[#8c1c13] text-[24px]">SOBRE EL PLAN</h2>
          <button
            className="bg-[#b5121c] text-white py-0 px-4 rounded hover:bg-red-700 text-[24px]"
            onClick={handleSubmit} // Cambiado para manejar la validación
          >
            REGISTRAR
          </button>
        </div>

        {/* Campos del Formulario */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Nombre del Plan */}
          <div className="col-span-3 md:col-span-1">
            <label className="block text-gray-700 font-bold mb-2" style={{ fontSize: '20px' }}>Nombre del Plan:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
            />
          </div>

          {/* Fecha de Inicio */}
          <div className="col-span-3 md:col-span-1">
            <label className="block text-gray-700 font-bold mb-2" style={{ fontSize: '20px' }}>Fecha de Inicio:</label>
            <div className="relative">
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
              />
            </div>
          </div>

          {/* Fecha de Fin */}
          <div className="col-span-3 md:col-span-1">
            <label className="block text-gray-700 font-bold mb-2" style={{ fontSize: '20px' }}>Fecha de Fin:</label>
            <div className="relative">
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Distribución de Macronutrientes */}
        <h3 className="font-semibold mb-2 text-[#8c1c13] text-[24px]">Distribución de Macronutrientes:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* Proteínas */}
          <div>
            <label className="block text-[#4b4f57] font-bold mb-2" style={{ fontSize: '20px' }}>Proteínas</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
            />
          </div>

          {/* Carbohidratos */}
          <div>
            <label className="block text-[#4b4f57] font-bold mb-2" style={{ fontSize: '20px' }}>Carbohidratos</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
            />
          </div>

          {/* Grasas */}
          <div>
            <label className="block text-[#4b4f57] font-bold mb-2" style={{ fontSize: '20px' }}>Grasas</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
            />
          </div>

          {/* Calorías Diarias */}
          <div>
            <label className="block text-[#4b4f57] font-bold mb-2" style={{ fontSize: '20px' }}>Calorías Diarias</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Mensaje de error */}
      {message && (
        <div className="bg-red-200 text-red-700 p-4 rounded mt-4">
          {message}
        </div>
      )}

      {/* Espacio de separación */}
      <div className="my-1"></div>

      {/* Contenedor de Botones de Días */}
      <div className="bg-white w-full max-w-3xl p-4 rounded-lg mx-auto shadow-md">
        {/* Botones de Días en Dos Filas */}
        <div className="flex justify-center gap-4 mb-4">
          {/* Primera Fila (centrada) */}
          <button 
            onClick={() => openModal('Lunes')} 
            className={`text-white font-semibold text-[24px] py-2 rounded hover:bg-[#8c1c13]`}
            style={{ backgroundColor: registeredDays['Lunes'] ? '#b5121c' : '#4b4f57', width: '200px' }}>
            Lunes
          </button>
          <button 
            onClick={() => openModal('Martes')} 
            className={`text-white font-semibold text-[24px] py-2 rounded hover:bg-[#8c1c13]`}
            style={{ backgroundColor: registeredDays['Martes'] ? '#b5121c' : '#4b4f57', width: '200px' }}>
            Martes
          </button>
          <button 
            onClick={() => openModal('Miércoles')} 
            className={`text-white font-semibold text-[24px] py-2 rounded hover:bg-[#8c1c13]`}
            style={{ backgroundColor: registeredDays['Miércoles'] ? '#b5121c' : '#4b4f57', width: '200px' }}>
            Miércoles
          </button>
        </div>
        <div className="flex justify-center gap-4 mb-4">
          {/* Segunda Fila (centrada) */}
          <button 
            onClick={() => openModal('Jueves')} 
            className={`text-white font-semibold text-[24px] py-2 rounded hover:bg-[#8c1c13]`}
            style={{ backgroundColor: registeredDays['Jueves'] ? '#b5121c' : '#4b4f57', width: '200px' }}>
            Jueves
          </button>
          <button 
            onClick={() => openModal('Viernes')} 
            className={`text-white font-semibold text-[24px] py-2 rounded hover:bg-[#8c1c13]`}
            style={{ backgroundColor: registeredDays['Viernes'] ? '#b5121c' : '#4b4f57', width: '200px' }}>
            Viernes
          </button>
        </div>
      </div>

      {/* Modal para Registrar el Día */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[400px] p-8">
            <h2 className="text-[#8c1c13] text-[24px] font-bold mb-4 text-center">{selectedDay}</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-[#4b4f57] font-semibold mb-2" style={{ fontSize: '20px' }}>Desayuno</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none" />
              </div>
              <div>
                <label className="block text-[#4b4f57] font-semibold mb-2" style={{ fontSize: '20px' }}>Almuerzo</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none" />
              </div>
              <div>
                <label className="block text-[#4b4f57] font-semibold mb-2" style={{ fontSize: '20px' }}>Cena</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none" />
              </div>
              <div>
                <label className="block text-[#4b4f57] font-semibold mb-2" style={{ fontSize: '20px' }}>Notas</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none" />
              </div>

              <div className="mt-8 flex justify-center space-x-4">
                <button onClick={handleRegister} className="bg-[#8c1c13] text-white hover:bg-[#b5121c] py-2 px-4 rounded">
                  Registrar
                </button>
                <button onClick={closeModal} className="bg-[#4b4f57] hover:bg-[#8c1c13] text-white py-2 px-4 rounded">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanForm;
