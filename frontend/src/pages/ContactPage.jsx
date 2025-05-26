import "./ContactPage.css";

function ContactPage() {
  return (
    <div className="contact-container">
      <h1 className="title">Contáctanos</h1>
      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-envelope contact-icon"></i>
            <div>
              <h3>Correo Electrónico</h3>
              <p>soporte@usermanagement.com</p>
            </div>
          </div>

          <div className="contact-item">
            <i className="fas fa-phone contact-icon"></i>
            <div>
              <h3>Teléfono</h3>
              <p>+1 (123) 456-7890</p>
            </div>
          </div>

          <div className="contact-item">
            <i className="fas fa-map-marker-alt contact-icon"></i>
            <div>
              <h3>Oficinas</h3>
              <p>Av. Principal 123, Ciudad, País</p>
            </div>
          </div>
        </div>

        <form className="contact-form">
          <h2>Envíanos un mensaje</h2>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" rows="5" required></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
