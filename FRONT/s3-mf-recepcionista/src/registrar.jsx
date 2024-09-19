import { useState } from 'react';
import logo from './img/logo.png';
import './css/registrar.css';
import { useNavigate } from 'react-router-dom';

function Registrar() {
  const generos = ['Masculino', 'Femenino', 'Otro'];
  const paises = ['Perú', 'Argentina', 'Chile'];
  const ciudades = ['Lima', 'Buenos Aires', 'Santiago'];
  const tipoRelacion = ['Espos@','Herman@','Hij@', 'Padre','Madre', 'Otro'];

  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correoElectronico: '',
    telefono: '',
    genero: '',
    codigoCheckIn: '',
    direccion: '',
    pais: '',
    ciudad: '',
    codigoPostal: '',
    adjuntarImagen: null,
    contactoEmergencia: '',
    telefonoEmergencia: '',
    tipoRelacion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, adjuntarImagen: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el envío del formulario
    console.log(formData);
  };
  const navigate = useNavigate(); 

  const handleButtonClick = (clienteTipo) => {
    navigate('/Validacion', { state: { tipo: clienteTipo } }); 
  };

  return (
    <div className="app-container">
        <div>
        <header className="app-header">
          <img src={logo} alt="FIA FIT" className="logo" />
        </header>
        </div>
        <hr className="encabezado"></hr>       
        <div className='formulario-container scrollable-container'>  
           
            <h1>REGISTRO DEL CLIENTE</h1>
            <form onSubmit={handleSubmit} className='formulario'>
              <section className='formulario-part1'>
                <div>
                <label>DNI*</label>
                <input type="text" name="dni" value={formData.dni} onChange={handleChange} required />
                </div>
                <div>
                <label>Nombre*</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div>
                <label>Apellido Paterno*</label>
                <input type="text" name="apellidoPaterno" value={formData.apellidoPaterno} onChange={handleChange} required />
                </div>
                <div>
                <label>Apellido Materno*</label>
                <input type="text" name="apellidoMaterno" value={formData.apellidoMaterno} onChange={handleChange} required />
                </div>
                <div>
                <label>Correo Electrónico*</label>
                <input type="email" name="correoElectronico" value={formData.correoElectronico} onChange={handleChange} required />
                </div>
                <div>
                <label>Teléfono*</label>
                <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
                </div>
                <div>
                <label>Género*</label>
                <select name="genero" value={formData.genero} onChange={handleChange} required>
                    <option value=""></option>
                    {generos.map((genero) => (
                    <option key={genero} value={genero}>{genero}</option>
                    ))}
                </select>
                </div>
                <div>
                <label>Código Check-In*</label>
                <input type="text" name="codigoCheckIn" value={formData.codigoCheckIn} onChange={handleChange} required />
                </div>
                <div>
                <label>Dirección</label>
                <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
                </div>
                <div>
                <label>País</label>
                <select name="pais" value={formData.pais} onChange={handleChange}>
                    <option value=""></option>
                    {paises.map((pais) => (
                    <option key={pais} value={pais}>{pais}</option>
                    ))}
                </select>
                </div>
                <div>
                <label>Ciudad</label>
                <select name="ciudad" value={formData.ciudad} onChange={handleChange} >
                    <option value=""></option>
                    {ciudades.map((ciudad) => (
                    <option key={ciudad} value={ciudad}>{ciudad}</option>
                    ))}
                </select>
                </div>
                <div>
                <label>Código Postal</label>
                <input type="text" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange}  />
                </div>
                <div>
                <label>Adjuntar Imagen</label>
                <input type="file" name="adjuntarImagen" onChange={handleFileChange}  />
                </div>
              </section>
              <hr className="division"></hr>
              <section className="formulario-part2">                
                <div>
                <label>Contacto de Emergencia</label>
                <input type="text" name="contactoEmergencia" value={formData.contactoEmergencia} onChange={handleChange} required />
                </div>
                <div>
                <label>Teléfono de Emergencia</label>
                <input type="tel" name="telefonoEmergencia" value={formData.telefonoEmergencia} onChange={handleChange} required />
                </div>
                <div>
                <label>Tipo de Relación</label>
                <select name="tipoRelacion" value={formData.tipoRelacion} onChange={handleChange} required>
                    <option value=""></option>
                    {tipoRelacion.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                </select>            
                </div>
              </section>
                <button type="button" className='boton' onClick={() => handleButtonClick('/clientelibre')}>Siguiente</button>
            </form>
            
        </div>
        <footer className="app-footer">
            <p>Copyright 2024</p>
        </footer>
    </div>
  );
}

export default Registrar;
