import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import ProductList from "./components/product-list";
import CartDetails from "./components/shopping-cart/cartDetails";
import PlanView from "./components/PlanView";
import DayView from "./components/DayView";
import Footer from "./components/Footer";
function App() {
  return (
    <Router>
      <div className="w-full min-h-screen">
        <Header />
        {/* Definir las rutas aquí */}
        <Routes>
          <Route path="/" element={<ProductList />} />
          {/* Ruta principal que muestra el listado de productos */}
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
