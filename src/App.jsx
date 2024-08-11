import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/Form'
import Table from './components/Table'

function App() {

  return (
   <div style={{width:'100%',height:'100vh',display:'flex',flexDirection:'column',alignItems:'center',padding:'10px'}}>
      <Form/>
      <Table/>
   </div>
  )
}

export default App
