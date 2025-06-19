import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Skills from './skills.jsx'
import Welcome from './Welcome.jsx'

function App() {
  return (
    <>
    <Welcome name="vis"  page="home"/>
    <Skills skill={["fdf","gf","fsf"]}/>
    </>
  )
}

export default App
