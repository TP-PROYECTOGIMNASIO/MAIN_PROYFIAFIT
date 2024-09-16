import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/product-list";
import CartDetails from "./components/shopping-cart/CartDetails";
import PlanView from "./components/PlanView";
import DayView from "./components/DayView";
import Inicio from "./context/inicio";
import Footer from "./components/Footer";
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
          <Route path="/verplan" element={<PlanView />} />
        <Route path="/plan/:dayId" element={<DayView />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
