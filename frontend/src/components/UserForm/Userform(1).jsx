import "./UserForm.css";

const UserForm = ({ user, onChange, onSubmit, isEditing }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <div className="input-with-icon">
            <i className="fa-solid fa-user form-icon"></i>
            <input
              id="name"
              name="name"
              type="text"
              value={user.name}
              onChange={handleChange}
              required
              className="user-form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="age">Edad</label>
          <div className="input-with-icon">
            <i className="fa-solid fa-calendar-days form-icon"></i>
            <input
              id="age"
              name="age"
              type="number"
              min="0"
              value={user.age}
              onChange={handleChange}
              required
              className="user-form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="input-with-icon">
            <i className="fa-solid fa-envelope form-icon"></i>
            <input
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              required
              className="user-form-input"
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          {isEditing ? "Actualizar Usuario" : "Crear Usuario"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
