import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import InformePrincipal from "./components/InformePrincipal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Informe-Compra" element={<InformePrincipal />} />
      </Routes>
    </Router>
  );
}

export default App;
