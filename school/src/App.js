import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../src/pages/Login";
import Student from "../src/pages/Student";
import Teacher from "../src/pages/Teacher";
import Navbar from "../src/components/Navbar";
import "../src/style.css";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    console.log('nitin',userData)
    setUser(userData); // Store user data (or token)
  };

  return (
    <Router>
      {user && <Navbar />}
      {/* {userData?.role==='STUDENT' ?  } */}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/students" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/students" element={user?.role==='STUDENT' ? <Student userData={user} /> : <Navigate to="/" />} />
        <Route path="/teachers" element={user?.role==='TEACHER' ? <Teacher userData={user} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
