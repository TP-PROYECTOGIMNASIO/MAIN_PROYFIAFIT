import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Tipodeproducto from './components/Tipodeproducto';
import ActualizarInventarioSedes from './components/ActualizarInventarioSedes';
import GenerarNuevoInventario from './components/GenerarNuevoInventario';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/GenerarInventario" element={<Tipodeproducto />} />
            <Route path="/ActualizarInventarioSedes" element={<ActualizarInventarioSedes />} />
            <Route path="/GenerarNuevoInventario" element={<GenerarNuevoInventario />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
