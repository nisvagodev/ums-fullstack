import "./UserTable.css";

const UserTable = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) {
    return <p className="no-users">No hay usuarios registrados</p>;
  }

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Correo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.email}</td>
            <td className="actions">
              <button
                onClick={() => onEdit(user)}
                className="edit-btn"
                aria-label={`Editar ${user.name}`}
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="delete-btn"
                aria-label={`Eliminar ${user.name}`}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
