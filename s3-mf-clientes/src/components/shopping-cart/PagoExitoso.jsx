import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const [paymentDetails, setPaymentDetails] = useState(null);
    const navigate = useNavigate(); // Cambiado de useHistory a useNavigate

    useEffect(() => {
        const details = localStorage.getItem('paymentDetails');
        if (details) {
            setPaymentDetails(JSON.parse(details));
            localStorage.removeItem('paymentDetails'); // Limpiar después de usar
        }
    }, []);

    const handleLogout = () => {
        navigate('/'); // Redirigir al inicio
    };

    if (!paymentDetails) {
        return <div>No hay detalles de pago disponibles.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
            <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 w-96">
                <h2 className="text-2xl font-bold text-red-600 text-center mb-4">REGISTRO COMPLETO</h2>
                <p>A continuación le adjuntamos los datos utilizados:</p>
                <ul className="mt-4">
                    <li><strong>Número de Tarjeta:</strong> {paymentDetails.cardNumber}</li>
                    <li><strong>Email:</strong> {paymentDetails.email}</li>
                    <li><strong>N° de Boleta:</strong> 1232</li>
                    <li><strong>Moneda:</strong> {paymentDetails.currency}</li>
                    <li><strong>Importe:</strong> S/. {paymentDetails.amount.toFixed(2)}</li>
                </ul>
                <button
                    onClick={handleLogout}
                    className="w-full py-2 mt-6 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
                >
                    SALIR
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;