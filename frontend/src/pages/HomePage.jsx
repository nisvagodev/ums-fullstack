import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <h1 className="welcome-title">Bienvenido a User Management System</h1>
      <div className="button-container">
        <Link to="/users" className="create-button">
          Crear Usuario
        </Link>
        <Link to="/users" className="create-button">
          Editar Usuario
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
