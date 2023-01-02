import React from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import { Crud } from "./componets/Crud";
import { Login } from "./componets/Login";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/User">Home</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/User" element={<Crud />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
