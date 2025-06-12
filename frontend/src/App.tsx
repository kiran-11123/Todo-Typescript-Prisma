import { useState } from 'react'

import LoginForm from './components/LoginForm'
import Signin from './components/Signin'

import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UploadTodos from './components/UploadTodos';

import Homepage from './components/Homepage';




function App() {
  

  return (

    <BrowserRouter>
   <Routes>
     
     <Route path="/"  element={<LoginForm />} > </Route>
     <Route path="/register"  element={<Signin />} > </Route>
      <Route path="/home"  element={<Homepage />} > </Route>
       <Route path="/upload"  element={<UploadTodos />} > </Route>
   
   
   </Routes>

   </BrowserRouter>
  )
}

export default App
