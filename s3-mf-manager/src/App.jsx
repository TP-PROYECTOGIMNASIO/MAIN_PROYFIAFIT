import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Sedes from './pages/Sedes'
import Navbar from './components/Navbar'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sedes" element={
          <>
            <Navbar/>
            <Sedes />
          </>
          } />
      </Routes>
    </Router>
  )
}

export default App
