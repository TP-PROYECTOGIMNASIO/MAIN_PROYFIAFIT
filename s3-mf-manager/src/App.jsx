import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Sedes from './pages/Sedes'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sedes" element={<Sedes />} />
      </Routes>
    </Router>
  )
}

export default App
