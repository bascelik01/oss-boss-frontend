import { useState, useEffect } from 'react'
import { verifyUser } from './services/users.js'
import Nav from './components/Nav'
import Home from './pages/Home'
import Register from './pages/Register'
import SignOut from './pages/SignOut.jsx'
import Techniques from './pages/Techniques'
import TechniqueDetail from './pages/TechniqueDetail'
import CreateTechnique from './pages/CreateTechnique'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser();
      user ? setUser(user) : setUser(null);
    };

    fetchUser();
  }, []);

  return (
    <>
      <Nav user={user} />
      <Routes>
        <Route path="/" element={<Home setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/sign-out" element={<SignOut setUser={setUser} />} />
        <Route path="/techniques" element={<Techniques />} />
        <Route path="/techniques/add" element={<CreateTechnique />} />
        <Route path="/techniques/:techniqueId" element={<TechniqueDetail />} />
      </Routes>
    </>
  )
}

export default App
