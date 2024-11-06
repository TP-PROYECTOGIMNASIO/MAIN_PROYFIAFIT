import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const RegisterForm = () => {
  const [fileName, setFileName] = useState('');
  const [fileData, setFileData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [distrito, setDistrito] = useState('');
  const [departamento] = useState('LIMA');
  const [provincia, setProvincia] = useState('LIMA');
  const [inputVia, setInputVia] = useState('');
  const [isInputLocked, setIsInputLocked] = useState(false);
  const [mapPosition, setMapPosition] = useState({ lat: -12.0464, lng: -77.0428 }); // Coordenadas predeterminadas (Lima, Perú)
  const [selectedLocation, setSelectedLocation] = useState({});
  const [foundAddresses, setFoundAddresses] = useState([]);
  const [modalDistrito, setModalDistrito] = useState('');
  const [modalProvincia, setModalProvincia] = useState('');
  const [modalDepartamento, setModalDepartamento] = useState('');
  const [isMapReady, setIsMapReady] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileData(e.target.result);
        document.getElementById('imagePreview').src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      setFileName('');
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      setModalDepartamento(departamento);
      setModalProvincia(provincia);
      setModalDistrito(distrito);
      // Activar la carga del mapa después de una pequeña demora para garantizar que el modal esté completamente montado
      setTimeout(() => setIsMapReady(true), 200); 
    } else {
      setIsMapReady(false);
    }
  };

  const handleGeolocalizar = () => {
    toggleModal();
  };

  const handleBuscar = () => {
    const location = `${inputVia}, ${distrito}, ${provincia}, ${departamento}`;
    const encodedLocation = encodeURIComponent(location);

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedLocation}&key=${import.meta.env.VITE_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setFoundAddresses(data.results);
          setMapPosition({ lat, lng }); // Actualiza la posición del mapa con la ubicación encontrada
          setSelectedLocation({});
        } else {
          alert('No se encontró la ubicación');
        }
      })
      .catch((error) => {
        console.error('Error al obtener la ubicación:', error);
        alert('Error al obtener la ubicación');
      });
  };

  const handleAddressSelection = (selectedAddress) => {
    const { lat, lng } = selectedAddress.geometry.location;
    setMapPosition({ lat, lng });
    setSelectedLocation({
      address: selectedAddress.formatted_address,
      lat,
      lng,
    });
    setInputVia(selectedAddress.formatted_address);
    setFoundAddresses([]);
    setIsInputLocked(true);
  };

  const getAddressFromCoordinates = (lat, lng) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_API_KEY}`;
    fetch(geocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const selectedAddress = data.results[0].formatted_address;
          setInputVia(selectedAddress);
          setSelectedLocation({ address: selectedAddress, lat, lng });
        } else {
          alert('No se encontró la dirección para estas coordenadas');
        }
      })
      .catch((error) => {
        console.error('Error al obtener la dirección:', error);
        alert('Error al obtener la dirección');
      });
  };

  const handleMarkerDragEnd = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setMapPosition({ lat: newLat, lng: newLng });
    getAddressFromCoordinates(newLat, newLng);
  };

  const handleLimpiar = () => {
    setInputVia('');
    setMapPosition({ lat: -12.0464, lng: -77.0428 }); // Coordenadas predeterminadas (Lima, Perú)
    setIsInputLocked(false);
    setFoundAddresses([]);
    setSelectedLocation({});
  };

  const handleConfirmar = () => {
    setShowModal(false);
    setIsInputLocked(true);
  };

  const handleRegistrar = async () => {
    const formData = new FormData();
    formData.append('departamento', departamento);
    formData.append('provincia', provincia);
    formData.append('distrito', distrito);
    formData.append('name', inputVia);
    formData.append('lat', selectedLocation.lat);
    formData.append('long', selectedLocation.lng);
  
    const base64Data = fileData.split(',')[1]; 
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' }); 
    
    formData.append('files', blob, fileName);

    try {
      const response = await fetch('VITE_APP_API_URL_76', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        alert('Registro exitoso');
      } else {
        const errorData = await response.json();
        alert(`Error en el registro: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error de red: ${error.message}`);
    }
  };
  


  return (
    <div className="min-h-[82.23vh] bg-[#f3f4f7] p-4 flex flex-col">
      <div className="flex flex-col mb-4">
        <div className="flex justify-between w-full mb-4">
          <button className="text-gray-700 text-[24px] flex items-center gap-2">
            <span>&lt;</span> Regresar
          </button>
          <button className="bg-red-600 text-white text-[24px] py-2 px-4 rounded" onClick={handleRegistrar}>
            Registrar Nueva Sede
          </button>
        </div>

        <div className="w-full max-w-2xl p-6 rounded-lg mx-auto overflow-auto bg-[#f3f4f7]">
          <div className="space-y-8">
            <div className="flex items-center mb-4">
              <label className="text-[20px] font-bold text-[#4b4f57] w-1/3 text-right pr-4">DEPARTAMENTO</label>
              <input type="text" value={departamento} readOnly className="p-2 bg-gray-200 rounded w-2/3 text-gray-700" />
            </div>

            <div className="flex items-center mb-4">
              <label className="text-[20px] font-bold text-[#4b4f57] w-1/3 text-right pr-4">PROVINCIA</label>
              <input type="text" value={provincia} readOnly className="p-2 bg-gray-200 rounded w-2/3 text-gray-700" />
            </div>

            <div className="flex items-center mb-4">
              <label className="text-[20px] font-bold text-[#4b4f57] w-1/3 text-right pr-4">DISTRITO</label>
              <select className="p-2 bg-gray-200 rounded w-2/3 text-gray-700" value={distrito} onChange={(e) => setDistrito(e.target.value)}>
                <option value="">Seleccione...</option>
                <option value="Miraflores">Miraflores</option>
                <option value="San Isidro">San Isidro</option>
                <option value="Miraflores">La Molina</option>
                <option value="San Isidro">Los Oliivos</option>
                {/* Otros distritos */}
              </select>
            </div>

            <div className="flex items-center mb-4">
              <label className="text-[20px] font-bold text-[#4b4f57] w-1/3 text-right pr-4">NOMBRE DE LA VIA</label>
              <div className="flex items-center w-2/3">
                <input type="text" className="p-2 bg-gray-200 rounded text-gray-700 w-full" placeholder="Ingrese el nombre de la vía" value={inputVia} disabled={isInputLocked} />
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-4" onClick={handleGeolocalizar}>
                  GEOLOCALIZAR
                </button>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <label className="text-[20px] font-bold text-[#4b4f57] w-1/3 text-right pr-4">ADJUNTAR IMAGEN:</label>
              <div className="flex items-center w-2/3 bg-gray-200 rounded">
                <label className="p-2 bg-gray-200 rounded flex justify-center items-center cursor-pointer hover:bg-gray-300">
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5V19a2.5 2.5 0 002.5 2.5h13a2.5 2.5 0 002.5-2.5v-2.5m-4-4l-5-5m0 0l-5 5m5-5v12" />
                  </svg>
                </label>
                <span className="ml-2 text-gray-700">{fileName || "Ningún archivo seleccionado"}</span>
              </div>
            </div>

            {fileName && (
              <div className="flex justify-center mb-4">
                <img id="imagePreview" alt="Vista previa" className="w-40 h-40 object-cover rounded" />
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[70%] relative">
            <button onClick={toggleModal} className="absolute top-4 right-4 text-2xl font-bold text-red-600">
              &times;
            </button>
            <h2 className="text-[24px] font-bold text-center mb-4">GEOLOCALIZAR</h2>
            <div className="flex justify-center gap-4 mb-4">
              <button className="bg-gray-300 text-gray-800 px-10 py-2 text-xl rounded">{modalDepartamento}</button>
              <button className="bg-gray-300 text-gray-800 px-10 py-2 text-xl rounded">{modalProvincia}</button>
              <button className="bg-gray-300 text-gray-800 px-20 py-2 text-xl rounded">{modalDistrito}</button>
            </div>

            {/* Sección de entrada y botones de búsqueda */}
            <div className="flex justify-center gap-4 mb-5">
              <input 
                value={inputVia} 
                onChange={(e) => setInputVia(e.target.value)} 
                className="bg-gray-300 text-gray-800 px-20 py-2 text-xl rounded" 
                disabled={isInputLocked} 
              />
              <button 
                className="bg-[#AC1919] text-white px-5 py-2 text-xl rounded" 
                onClick={handleBuscar}
              >
                BUSCAR
              </button>
              <button 
                className="bg-[#3C4862] text-white px-5 py-2 text-xl rounded" 
                onClick={handleLimpiar}
              >
                LIMPIAR
              </button>
            </div>

            {/* Contenedor del mapa y lista de direcciones encontradas */}
            <div className="relative w-full h-[400px] flex">
            <div className="w-[75%] h-full relative">
                <LoadScript googleMapsApiKey={import.meta.env.VITE_API_KEY}>
                  <GoogleMap 
                    key={mapPosition ? `${mapPosition.lat}-${mapPosition.lng}` : 'default-map'} // Cambio clave aquí
                    mapContainerStyle={{ width: '100%', height: '100%' }} 
                    center={mapPosition} 
                    zoom={17}
                  >
                    <Marker 
                      position={mapPosition} 
                      draggable={true} 
                      onDragEnd={handleMarkerDragEnd} 
                    />
                  </GoogleMap>
                </LoadScript>
              </div>

              {/* Condicional para mostrar la lista o el cuadro de información */}
              <div className="absolute top-0 right-0 bg-green-100 p-4 rounded-lg w-[25%] h-full flex flex-col justify-center shadow-lg">
                {foundAddresses.length > 0 && !selectedLocation.address ? (
                  <div className="flex flex-col w-full h-full">
                    <div className="bg-green-600 text-white font-bold p-2 rounded-t-lg">
                      {`Se ha encontrado ${foundAddresses.length} resultado${foundAddresses.length > 1 ? 's' : ''}`}
                    </div>
                    <div className="overflow-y-auto max-h-[300px] border-t border-gray-200 divide-y divide-gray-200">
                      {foundAddresses.map((address, index) => (
                        <div 
                          key={index} 
                          className="cursor-pointer hover:bg-gray-200 p-2 rounded-none text-blue-700 text-sm flex items-center justify-center"
                          onClick={() => handleAddressSelection(address)}
                        >
                          {address.formatted_address}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  selectedLocation.address && (
                    <>
                      <div className="bg-green-600 text-white font-bold p-2 rounded-t-lg">
                        Información del Punto
                      </div>
                      <div className="flex flex-col items-start p-4 space-y-2 border-t border-gray-200">
                        <h3 className="font-bold text-lg">Seleccione Punto</h3>
                        <p className="text-sm"><strong>Dirección:</strong> {selectedLocation.address}</p>
                        <p className="text-sm"><strong>Latitud:</strong> {selectedLocation.lat}</p>
                        <p className="text-sm"><strong>Longitud:</strong> {selectedLocation.lng}</p>
                      </div>
                      <div className="flex justify-center mt-4 gap-4">
                        <button 
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" 
                          onClick={handleConfirmar}
                        >
                          Confirmar
                        </button>                    
                      </div>
                    </>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
