import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Asegúrate de que la ruta sea correcta
import Footer from './components/Footer'; // Asegúrate de que la ruta sea correcta
import Tipodeproducto from './components/Tipodeproducto'; // Asegúrate de que la ruta sea correcta
import ActualizarInventarioSedes from './components/ActualizarInventarioSedes'; // Asegúrate de que la ruta sea correcta
import './App.css'; // Asegúrate de que la ruta sea correcta

const App = () => {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/GenerarInventario" element={<Tipodeproducto />} />
          <Route path="/ActualizarInventarioSedes" element={<ActualizarInventarioSedes />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
};

export default App;
