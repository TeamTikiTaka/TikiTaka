import React from "react";
import { Route, Routes } from 'react-router-dom'
import JobBoard from "../Pages/JobBoard";
import Login from "../Pages/Login";
import Resources from "../Pages/Resources";
import Home from "../Pages/Home";

const MainContainer = () => {
  return (
    <>
    <Routes>
      <Route path='/' element ={<Home/>}/>
      <Route path="/jobboard" element={<JobBoard />} />
      <Route path="/resources" element={<Resources />} />
    </Routes>
    <Login/>
    </>
  )
}

export default MainContainer