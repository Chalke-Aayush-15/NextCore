import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./Pages/login.jsx";
import Register from "./Pages/register.jsx";
import UserDashboard from "./Pages/UserDashboard.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";

function App() {
  return (
   <>
   <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
