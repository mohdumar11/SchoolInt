import React from "react";
import { Link } from "react-router-dom";
import "../style.css";


const Navbar = () => {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
      <Link to="/students" style={{ marginRight: "10px" }}>Student</Link>
      <Link to="/teachers">Teacher</Link>
    </nav>
  );
};

export default Navbar;
