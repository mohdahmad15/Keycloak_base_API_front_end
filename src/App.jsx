import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import Login from "./components/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
export default App;
