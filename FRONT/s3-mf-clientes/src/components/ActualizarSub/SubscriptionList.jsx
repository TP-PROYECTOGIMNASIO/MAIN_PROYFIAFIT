import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionList = () => {
  const [, setSubscriptions] = useState([]);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [pastSubscriptions, setPastSubscriptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de errores
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
  const apiUrl21 = import.meta.env.VITE_APP_API_URL_21;


  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Lista de Suscripcion clientes:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  const clienteId = params.get("clienteId");
  console.log("role recibido en Lista de Suscripcion clientes:", role);
  console.log("token recibido en Lista de Suscripcion clientes:", token);
  console.log("username recibido en Lista de Suscripcion clientes:", username);
  console.log("clienteId recibido en Lista de Suscripcion clientes:", clienteId);

  useEffect(() => {
    if (token && username) {
      console.log("Datos recibidos en Lista de Suscripcion clientes:", { role, token, username });
      fetchUserName();
    }
  }, [role, token, username]); // Dependencias del useEffect // Dependencia de `navigate` // Dependencia de `token` y `username` para volver a ejecutar si estos cambian

  const fetchUserName = async () => {
    try {
      const response = await fetch(`${apiUrlUSERNAME}?username=${username}`);

      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }

      const data = await response.json();
      console.log("Respuesta de la API en Lista de Suscripcion clientes:", data);

      if (Array.isArray(data)) {
        if (data.length > 0) {
          setUser(data[0]);
        } else {
          console.error("El array está vacío");
          setUser({});
        }
      } else if (data && typeof data === "object") {
        setUser(data);
      } else {
        console.error("Formato inesperado en la respuesta de la API:", data);
        setUser({});
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario", error);
    }
  };

  // Obtener las suscripciones desde la API
  useEffect(() => {
    // Asegúrate de que user.id esté disponible antes de hacer la solicitud
    if (!user.id) {
      return; // Si user.id no está disponible, no hacemos nada
    }
  
    // Realizar la solicitud para obtener las suscripciones
    fetch(`${apiUrl21}?client_id=${user.id}`)
      .then(response => {
        if (!response.ok) {
          // Si la respuesta no es correcta, lanza un error
          return response.json().then(errorData => {
            throw new Error(errorData.message || 'Error al obtener suscripciones');
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Datos de la API:', data); // Verifica qué datos están llegando
  
        // Si no se encontraron suscripciones, muestra un error
        if (data.length === 0) {
          throw new Error('No se encontraron suscripciones para este cliente');
        }
  
        // Filtrar suscripción activa
        const active = data.find(sub => sub.status === 'activo');
  
        // Filtrar suscripciones pasadas (canceladas o vencidas)
        const past = data.filter(sub => {
          const endDate = new Date(sub.membership_end_date);
          const isExpired = endDate < new Date(); // Si la fecha de vencimiento ya pasó
          return sub.status === 'cancelado' || isExpired;
        });
  
        // Actualiza el estado con las suscripciones
        setSubscriptions(data);
        setActiveSubscription(active);
        setPastSubscriptions(past);
        setLoading(false); // Finaliza el estado de carga
      })
      .catch(error => {
        // Si ocurre un error, actualiza el estado con el mensaje de error
        setError(error.message);
        setLoading(false); // Finaliza el estado de carga en caso de error
        console.error('Error al obtener suscripciones:', error);
      });
  }, [user.id]); // Dependencia en `user.id` para que se ejecute cuando esté disponible
  

  // Manejar el click en el botón de actualizar suscripción
  const handleUpdateClick = () => {
    if (activeSubscription) {
      setShowModal(true); // Mostrar modal si hay una suscripción activa
    } else {
      navigate(`/sub-update?role=${role}&token=${token}&username=${username}&clienteId=${user.id}`); // Redirigir si no hay suscripción activa
    }
  };

  if (loading) {
    return <p>Cargando suscripciones...</p>;
  }

  if (error) {
    return (
      <p>
        <br />
        Error: {error}
        <br /><br />
        Por favor, intenta nuevamente más tarde.
        <br /><br />
      </p>
    );
  }

  return (
    <div className="p-6 bg-gray-100">
      {/* Botón de regresar */}
      <button
        onClick={() => navigate(-1)}
        className="text-gray-600 font-bold flex items-center mb-4"
      >
        <span className="ml-2">Regresar</span>
      </button>

      {/* Encabezado y botón de actualización */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-red-600">Mi Suscripción</h2>
        <button
          onClick={handleUpdateClick}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Actualizar suscripción
        </button>
      </div>

      {/* Suscripción activa */}
      {activeSubscription ? (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
          <p className="text-lg font-bold text-gray-800">Membresía Black Sede Santa Anita</p>
          <div className="grid grid-cols-4 gap-4 text-sm text-gray-600 mt-4">
            <div>
              <p className="font-bold">Fecha de inicio:</p>
              <p>{new Date(activeSubscription.membership_start_date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-bold">Fecha de vencimiento:</p>
              <p>{new Date(activeSubscription.membership_end_date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-bold">Fecha de pago:</p>
              <p>{new Date(activeSubscription.created_at).toLocaleString()}</p>
            </div>
            <div className="flex flex-col justify-between">
              <p className="font-bold">Estado:</p>
              <p className="text-green-600 font-semibold">Activo</p>
              <button className="mt-2 text-gray-600 font-medium hover:text-red-800">Descargar Comprobante</button>
            </div>
          </div>
        </div>
      ) : (
        <p>No tienes una suscripción activa.</p>
      )}

      {/* Título de suscripciones pasadas */}
      <h3 className="text-2xl font-semibold text-red-600 mb-4">Mis Suscripciones Pasadas</h3>

      {/* Lista de suscripciones pasadas */}
      {pastSubscriptions.length > 0 ? (
        <ul className="space-y-4">
          {pastSubscriptions.map(sub => (
            <li key={sub.client_membership_id} className="p-4 bg-white rounded-lg shadow-md">
              <p className="text-lg font-bold text-gray-800">Membresía Black Sede Santa Anita</p>
              <div className="grid grid-cols-4 gap-4 text-sm text-gray-600 mt-4">
                <div>
                  <p className="font-bold">Fecha de inicio:</p>
                  <p>{new Date(sub.membership_start_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-bold">Fecha de vencimiento:</p>
                  <p>{new Date(sub.membership_end_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-bold">Fecha de pago:</p>
                  <p>{new Date(sub.created_at).toLocaleString()}</p>
                </div>
                <div className="flex flex-col justify-between">
                  <p className="font-bold">Estado:</p>
                  <p className="text-red-600 font-semibold">{sub.status === 'cancelado' ? 'Cancelado' : 'Vencido'}</p>
                  <button className="mt-2 text-gray-600 font-medium hover:text-red-800">Descargar Comprobante</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes suscripciones pasadas.</p>
      )}

      {/* Modal de advertencia */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <p className="text-red-500">No puedes actualizar tu suscripción mientras esté activa.</p>
            <button onClick={() => setShowModal(false)} className="mt-4 bg-red-500 text-white p-2 rounded-lg">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;