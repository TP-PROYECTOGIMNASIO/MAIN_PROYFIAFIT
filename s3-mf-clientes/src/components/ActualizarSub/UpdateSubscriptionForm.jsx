import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateSubscriptionForm = () => {
  const [memberships, setMemberships] = useState([]);
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const apiUrl21 = import.meta.env.VITE_APP_API_URL_21;

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  const clienteId = params.get("clienteId");
  console.log("role recibido en Actualizando de Suscripcion clientes:", role);
  console.log("token recibido en Actualizando de Suscripcion clientes:", token);
  console.log("username recibido en Actualizando de Suscripcion clientes:", username);
  console.log("clienteId recibido en Actualizando de Suscripcion clientes:", clienteId);

  // Obtener membresías desde el API
  useEffect(() => {
    fetch(`${apiUrl21}`)
      .then(response => response.json())
      .then(data => setMemberships(data))
      .catch(error => console.error('Error al obtener membresías:', error));
  }, []);

  // Manejo del checkbox de selección
  const handleCheckboxChange = (membershipId) => {
    if (selectedMembership === membershipId) {
      setSelectedMembership(null);
    } else {
      setSelectedMembership(membershipId);
    }
  };

  // Manejo del botón siguiente: Redirigir a pagoSub.html con los datos necesarios
  const handleNextClick = () => {
    if (!selectedMembership) {
      setShowModal(true); // Mostrar modal si no se seleccionó una membresía
    } else {
      // Obtener la membresía seleccionada
      const selectedPlan = memberships.find(m => m.membership_id === selectedMembership);
      const price = selectedPlan.price;

      // Redirigir a pagoSub.html con los parámetros necesarios (membership_id y price)
      window.location.href = `/pagoSub.html?membership_id=${selectedMembership}&price=${price}&role=${role}&token=${token}&username=${username}&clienteId=${clienteId}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra superior */}
      <div className="bg-red-600 p-4 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="text-white font-bold flex items-center">
          <span className="ml-2">Regresar</span>
        </button>
      </div>

      {/* Formulario de actualización de suscripción */}
      <div className="container mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Selecciona tu suscripción:</h2>
        <div className="space-y-4">
          {memberships.map(membership => (
            <div
              key={membership.membership_id}
              className={`border rounded-lg p-4 bg-white shadow-md flex justify-between items-center space-x-4
              ${selectedMembership === membership.membership_id ? 'border-red-500' : 'border-gray-300'}`}
            >
              {/* Checkbox de selección */}
              <input
                type="checkbox"
                checked={selectedMembership === membership.membership_id}
                onChange={() => handleCheckboxChange(membership.membership_id)}
                className="form-checkbox h-6 w-6 text-red-500"
              />

              {/* Información de la membresía */}
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{membership.name}</h3>
                <p className="text-gray-600">{membership.description}</p>
              </div>

              {/* Precio */}
              <div className="flex-shrink-0 text-center">
                <p className="text-gray-600 font-semibold">Inscripción</p>
                <p className="text-gray-800 font-bold">S/. {membership.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Botón Siguiente */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleNextClick}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Modal de advertencia */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-red-500 font-bold">Debes seleccionar un nuevo plan de membresía para continuar.</p>
            <button onClick={() => setShowModal(false)} className="mt-4 bg-red-500 text-white p-2 rounded-lg">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white text-center py-4 mt-6">
        <p>Copyright 2024</p>
      </footer>
    </div>
  );
};

export default UpdateSubscriptionForm;