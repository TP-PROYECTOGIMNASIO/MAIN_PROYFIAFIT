import { useState, useEffect } from 'react';

const SubscriptionDetails = ({ clientMembershipId }) => {
  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
  const [user, setUser] = useState({});
  const [details, setDetails] = useState(null);
  const [error, setError] = useState('');
  const apiUrl21 = import.meta.env.VITE_APP_API_URL_21;
  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Suscripcion Details:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Suscripcion Details clientes:", role);
  console.log("token recibido en Suscripcion Details clientes:", token);
  console.log("username recibido en Suscripcion Details clientes:", username);

  useEffect(() => {
    if (token && username) {
      console.log("Datos recibidos en Suscripcion Details :", { role, token, username });
      fetchUserName();
    }
  }, [role, token, username]); // Dependencias del useEffect

  const fetchUserName = async () => {
    try {
      const response = await fetch(`${apiUrlUSERNAME}?username=${username}`);

      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }

      const data = await response.json();
      console.log("Respuesta de la API:", data);

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

  useEffect(() => {
    fetch(`${apiUrl21}?client_membership_id=${clientMembershipId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('No se encontraron detalles de la suscripción');
        }
        return response.json(); 
      })
      .then(data => setDetails(data[0]))
      .catch(error => setError(error.message));
  }, [clientMembershipId]);

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-2xl mb-4">Detalles de la Suscripción</h2>
      {error && <p className="text-red-500">{error}</p>}
      {details ? (
        <div>
          <p><strong>ID de Membresía:</strong> {details.membership_id}</p>
          <p><strong>Estado:</strong> {details.status}</p>
          <p><strong>Fecha de Inicio:</strong> {new Date(details.membership_start_date).toLocaleDateString()}</p>
          <p><strong>Fecha de Fin:</strong> {details.membership_end_date ? new Date(details.membership_end_date).toLocaleDateString() : 'Activa'}</p>
          <p><strong>Frecuencia de Pago (meses):</strong> {details.payment_frequency_months}</p>
        </div>
      ) : (
        <p>Cargando detalles de la suscripción...</p>
      )}
    </div>
  );
};

export default SubscriptionDetails;