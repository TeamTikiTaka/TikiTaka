import React from "react";
import { Route, Routes } from 'react-router-dom'
import JobBoard from "../Pages/JobBoard";
import Login from "../Pages/Login";
import Resources from "../Pages/Resources";

const MainContainer = () => {
  return (
    <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/jobboard" element={<JobBoard />} />
      <Route path="/resources" element={<Resources />} />
    </Routes>
    </>
  )
}

export default MainContainer