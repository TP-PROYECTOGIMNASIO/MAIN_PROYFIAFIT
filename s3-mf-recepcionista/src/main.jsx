import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import H_44 from './h-44.jsx';
import Registrar from './registrar.jsx';
import Validacion from './validacion.jsx';
import RegistroCompleto from './registrocompleto.jsx';
import ClienteLibre from './clientelibre.jsx';
import ClienteRegular from './clienteregular.jsx';
import ClienteRegular2 from './clienteregular2.jsx';
import './css/index.css'
createRoot(document.getElementById('root')).render(
<Router>
    <Routes>
      <Route path="/" element={<Registrar />} />
      <Route path="/Validacion" element={<Validacion />} />
      <Route path="/H_44" element={<H_44 />} />
      <Route path="/RegistroCompleto" element={<RegistroCompleto />}/>
      <Route path="/ClienteLibre" element={<ClienteLibre/>} />
      <Route path="/ClienteRegular" element={<ClienteRegular />}/>
      <Route path="/ClienteRegular2" element={<ClienteRegular2 />}/>

    </Routes>
  </Router>

)
