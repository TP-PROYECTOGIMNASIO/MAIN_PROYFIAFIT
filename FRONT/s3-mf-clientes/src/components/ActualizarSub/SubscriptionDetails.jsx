import { useState, useEffect } from 'react';

const SubscriptionDetails = ({ clientMembershipId }) => {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/membresias/hu-tp-21?client_membership_id=${clientMembershipId}`)
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