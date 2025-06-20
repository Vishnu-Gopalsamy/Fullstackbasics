import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Navbar from './components/Navbar.jsx'
import Forms from './hooks/forms.jsx'
import State from './hooks/State.jsx'
import Effect from './hooks/Effect.jsx'
function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path="/Services" element={<Services/>}/>
      <Route path='/form' element={<Forms/>}/>
      <Route path='/state' element={<State/>}/>
      <Route path='/Effect' element={<Effect/>}/>
    </Routes>
    </>
  )
} 
export default App
