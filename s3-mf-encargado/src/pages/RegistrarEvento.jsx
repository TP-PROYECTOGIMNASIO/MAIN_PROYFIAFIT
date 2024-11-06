import { useState } from 'react'

function RegistrarEvento() {
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState('aprobados')
  
  const eventos = {
    aprobados: [
      {
        id: 1,
        nombre: "Reto Fitness Total",
        sede: "Sede Santa Anita",
        aforo: 15,
        imagen: "/reto-fitness.jpg"
      }
    ],
    pendientes: [
      {
        id: 2,
        nombre: "Maratón de Spinning",
        sede: "Sede La Molina",
        aforo: 20,
        imagen: "/spinning.jpg"
      },
      {
        id: 3,
        nombre: "Clase Magistral de Yoga",
        sede: "Sede Santa Anita",
        aforo: 25,
        imagen: "/yoga.jpg"
      }
    ],
    rechazados: []
  }

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)
  
  return (
    <div className="container mx-auto p-4">
      {/* Botones de navegación */}
      <div className="flex justify-between mb-8">
        <div className="flex gap-4">
          <button 
            className={px-6 py-2 rounded-md ${activeTab === 'aprobados' ? 'bg-red-600 text-white' : 'bg-gray-300'}}
            onClick={() => setActiveTab('aprobados')}
          >
            EVENTOS APROBADOS
          </button>
          <button 
            className={px-6 py-2 rounded-md ${activeTab === 'rechazados' ? 'bg-red-600 text-white' : 'bg-gray-300'}}
            onClick={() => setActiveTab('rechazados')}
          >
            EVENTOS RECHAZADOS
          </button>
          <button 
            className={px-6 py-2 rounded-md ${activeTab === 'pendientes' ? 'bg-red-600 text-white' : 'bg-gray-300'}}
            onClick={() => setActiveTab('pendientes')}
          >
            EVENTOS PENDIENTES
          </button>
        </div>
        <button 
          onClick={handleOpenModal}
          className="bg-red-600 text-white px-6 py-2 rounded-md flex items-center gap-2"
        >
          <span className="text-2xl">+</span> Solicitar Evento
        </button>
      </div>

      {/* Selector */}
      <div className="mb-8">
        <select className="border p-2 w-48">
          <option>Filtrar por sede</option>
          <option>Sede Santa Anita</option>
          <option>Sede La Molina</option>
        </select>
      </div>

      {/* Grid de eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos[activeTab].map(evento => (
          <div key={evento.id} className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={evento.imagen} 
              alt={evento.nombre} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-white">
              <h3 className="text-xl font-bold">{evento.nombre}</h3>
              <p className="text-gray-600">{evento.sede}</p>
              <p className="text-red-600">Aforo disponible: {evento.aforo}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de registro */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={handleCloseModal}
                className="text-gray-600"
              >
                ← Regresar
              </button>
              <h2 className="text-2xl font-bold text-center text-red-800">REGISTRO DE NUEVO EVENTO</h2>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">NOMBRE:</label>
                <input type="text" className="w-full p-2 border rounded-md"/>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">DESCRIPCIÓN:</label>
                <textarea className="w-full p-2 border rounded-md"/>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Fecha y Hora:</label>
                <input type="datetime-local" className="w-full p-2 border rounded-md"/>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Aforo:</label>
                <input type="number" className="w-full p-2 border rounded-md"/>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Sedes:</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Seleccionar sede</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Requerimientos:</label>
                <textarea className="w-full p-2 border rounded-md"/>
              </div>
              
              <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md">
                GUARDAR
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      {false && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-600 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl text-red-600 mb-4">Solicitud Enviada!</h3>
            <button className="bg-red-600 text-white px-6 py-2 rounded-md">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RegistrarEvento