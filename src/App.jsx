import { useState } from 'react'
import FormsPage from './components/FormsPage'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Welcome from './components/Welcome'



function App() {
  const [isFormSelected, setIsFormSelected] = useState(false)
  function handleFormSelect(){
    setIsFormSelected(true);
  }
  return (
    <>
      
      {isFormSelected ? <FormsPage /> : <Welcome transferPage={handleFormSelect}/>}
    </>
    
  )
}

export default App
