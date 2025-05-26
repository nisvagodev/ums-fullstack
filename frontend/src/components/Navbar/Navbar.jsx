import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <NavLink to="/" className="logo-link">
          <h1>USER MANAGEMENT SYSTEM</h1>
          <i className="fa-solid fa-circle-user"></i>
        </NavLink>
      </div>

      <button className="hamburger" onClick={toggleMenu}>
        <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={() => setIsOpen(false)}
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={() => setIsOpen(false)}
          >
            Usuarios
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={() => setIsOpen(false)}
          >
            Contacto
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={() => setIsOpen(false)}
          >
            Acerca de
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
