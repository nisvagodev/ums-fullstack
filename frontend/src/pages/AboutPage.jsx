import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-container">
      <h1>Acerca de User Management System</h1>

      <section className="about-section">
        <h2>Nuestra Misión</h2>
        <p>
          Proporcionar herramientas intuitivas y poderosas para la gestión
          eficiente de usuarios, ayudando a organizaciones de todos los tamaños
          a mantener el control total sobre sus datos de usuarios.
        </p>
      </section>

      <section className="features-section">
        <h2>Características Principales</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-users feature-icon"></i>
            <h3>Gestión Centralizada</h3>
            <p>
              Administra todos tus usuarios desde un único panel de control
              intuitivo.
            </p>
          </div>

          <div className="feature-card">
            <i className="fas fa-shield-alt feature-icon"></i>
            <h3>Seguridad Robusta</h3>
            <p>Protección avanzada para los datos sensibles de tus usuarios.</p>
          </div>

          <div className="feature-card">
            <i className="fas fa-chart-line feature-icon"></i>
            <h3>Reportes Detallados</h3>
            <p>
              Genera informes personalizados sobre la actividad de tus usuarios.
            </p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Nuestro Equipo</h2>
        <p>
          Un grupo de desarrolladores apasionados por crear soluciones que
          simplifiquen la gestión de usuarios para empresas y organizaciones.
        </p>
      </section>
    </div>
  );
}

export default AboutPage;
