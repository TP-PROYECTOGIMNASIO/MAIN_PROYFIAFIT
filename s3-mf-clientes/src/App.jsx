import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/product-list";
import CartDetails from "./components/shopping-cart/cartDetails";
import Inicio from "./context/inicio";
import Footer from "./components/Footer";
import PlanesEntrenamiento from "./components/PlanesEntrenamiento";
import VerPlan from "./components/VerPlan";
import VerEjercicios from "./components/VerEjercicios";
import VerNutricion from "./components/VerNutricion";

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen">
        <Navbar />
        {/* Definir las rutas aquí */}
        <Routes>
        <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/cart" element={<CartDetails />} />
          <Route path="/ver-planes" element={<PlanesEntrenamiento />} />
        <Route path="/ver-plan/:planId" element={<VerPlan />} />
        <Route path="/ver-ejercicios/:diaId" element={<VerEjercicios />} />
        <Route path="/ver-nutricion" element={<VerNutricion />} />
      
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
