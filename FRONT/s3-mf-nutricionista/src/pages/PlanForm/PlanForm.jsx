import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';


const PlanForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [registeredDays, setRegisteredDays] = useState({});
  const [message, setMessage] = useState('');
  
  const [namePlan, setNamePlan] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [proteinGr, setProteinGr] = useState('');
  const [carbohydratesGr, setCarbohydratesGr] = useState('');
  const [dailyCaloriesKcal, setDailyCaloriesKcal] = useState('');

  /*CODIGO PARA OBTENER EL ID DEL CLIENTE DE LA URL*/ 
  const params = new URLSearchParams(window.location.search);
  const clientId = params.get('client_id');
  const apiUrl34 = import.meta.env.VITE_APP_API_URL_34;

  
  console.log("Todos los parámetros en Plan Form nutricionista:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Plan Form nutricionista:", role);
  console.log("token recibido en Plan Form nutricionista:", token);
  console.log("username recibido en Plan Form nutricionista:", username);

  const [dayData, setDayData] = useState({
    breakfast: '',
    lunch: '',
    dinner: '',
    notes: ''
  });

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

    // Validación de campos
    if (!dayData.breakfast || !dayData.lunch || !dayData.dinner || !dayData.notes) {
      alert('Debe Completar los Campos');
      return;
    }
    
    setRegisteredDays((prevDays) => ({
      ...prevDays,
      [selectedDay]: true,
    }));

       // Limpiar los inputs del modal
       setDayData({ breakfast: '', lunch: '', dinner: '', notes: '' });
       
    closeModal();
  };

  const handleSubmit = async () => {
    if (!clientId) {
      alert("No se encontró el ID del cliente en la URL.");
      return;
    }

    const allRegistered = Object.keys(registeredDays).length === 5;

    if (allRegistered) {
      const confirmRegister = window.confirm("¿SEGURO QUE DESEAS REGISTRAR ESTE PLAN?");
      if (confirmRegister) {
        try {
          const response = await fetch(apiUrl34, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              client_id: clientId, // Usar el clientId obtenido de la URL
              name_plan: namePlan,
              start_date: startDate,
              end_date: endDate,
              protein_gr: parseFloat(proteinGr),
              carbohydrates_gr: parseFloat(carbohydratesGr),
              daily_calories_kcal: parseInt(dailyCaloriesKcal, 10),
              days: [
                {
                  day_number: 7,
                  breakfast: "Avena con frutas",
                  lunch: "Ensalada de pollo",
                  dinner: "Pescado al horno",
                  notes: "Mantener la hidratación"
                },
                {
                  day_number: 2,
                  breakfast: "Yogur con granola",
                  lunch: "Quinoa con verduras",
                  dinner: "Pasta integral",
                  notes: "Incluir proteínas"
                }
              ]
            }),
          });

          if (response.ok) {
            alert("Plan registrado con éxito!");
            setNamePlan('');
            setStartDate('');
            setEndDate('');
            setProteinGr('');
            setCarbohydratesGr('');
            setDailyCaloriesKcal('');
            setDayData({ breakfast: '', lunch: '', dinner: '', notes: '' });
            setRegisteredDays({});
            setShowModal(false);
            setSelectedDay('');
          } else {
            alert("Hubo un problema al registrar el plan.");
          }
        } catch (error) {
          console.error("Error al hacer la solicitud POST:", error);
          alert("Error al conectar con la API.");
        }
      }
    } else {
      setMessage("Aún no has registrado todos los días.");
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div className="min-h-[82.25vh] bg-gray-100 flex flex-col items-center justify-center py-4 relative">
      {/* Botón Regresar */}
      <button onClick={() => window.history.back()} className="absolute top-4 left-4 text-gray-600 text-2xl hover:text-black">
        <span>&lt; Regresar</span>
      </button>

      {/* Contenedor Principal */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold mb-2 text-[#8c1c13] text-[24px]">SOBRE EL PLAN</h2>
          <button
            className="bg-[#b5121c] text-white py-0 px-4 rounded hover:bg-red-700 text-[24px]"
            onClick={handleSubmit}
          >
            REGISTRAR
          </button>
        </div>

        {/* Campos del Formulario */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-3 md:col-span-1">
            <label className="block text-gray-700 font-bold mb-2" style={{ fontSize: '20px' }}>Nombre del Plan:</label>
            <input
              type="text"
              value={namePlan}
              onChange={(e) => setNamePlan(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
            />
          </div>

          <div className="col-span-3 md:col-span-1">
            <label className="block text-gray-700 font-bold mb-2" style={{ fontSize: '20px' }}>Fecha de Inicio:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
            />
          </div>

          <div className="col-span-3 md:col-span-1">
            <label className="block text-gray-700 font-bold mb-2" style={{ fontSize: '20px' }}>Fecha de Fin:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
            />
          </div>
        </div>

        {/* Macronutrientes */}
        <h3 className="font-semibold mb-2 text-[#8c1c13] text-[24px]">Distribución de Macronutrientes:</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-[#4b4f57] font-bold mb-2" style={{ fontSize: '20px' }}>Proteínas</label>
            <input
              type="text"
              value={proteinGr}
              onChange={(e) => setProteinGr(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#4b4f57] font-bold mb-2" style={{ fontSize: '20px' }}>Carbohidratos</label>
            <input
              type="text"
              value={carbohydratesGr}
              onChange={(e) => setCarbohydratesGr(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#4b4f57] font-bold mb-2" style={{ fontSize: '20px' }}>Calorías Diarias</label>
            <input
              type="text"
              value={dailyCaloriesKcal}
              onChange={(e) => setDailyCaloriesKcal(e.target.value)}
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
        <div className="flex justify-center gap-4 mb-4">
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

        <div className="flex justify-center gap-4">
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
          <h2 className="text-[#8c1c13] text-[24px] font-bold mb-4 text-center">{selectedDay}</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" style={{ fontSize: '18px' }}>Desayuno:</label>
                <input
                  type="text"
                  value={dayData.breakfast}
                  onChange={(e) => setDayData({ ...dayData, breakfast: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" style={{ fontSize: '18px' }}>Almuerzo:</label>
                <input
                  type="text"
                  value={dayData.lunch}
                  onChange={(e) => setDayData({ ...dayData, lunch: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" style={{ fontSize: '18px' }}>Cena:</label>
                <input
                  type="text"
                  value={dayData.dinner}
                  onChange={(e) => setDayData({ ...dayData, dinner: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" style={{ fontSize: '18px' }}>Notas:</label>
                <input
                  type="text"
                  value={dayData.notes}
                  onChange={(e) => setDayData({ ...dayData, notes: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#b5121c] text-white py-2 px-4 rounded hover:bg-red-700 mr-2"
                >
                  Registrar
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
                  onClick={closeModal}
                >
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
