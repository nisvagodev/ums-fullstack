import { useState } from "react";
import { useUserManagement } from "../hooks/useUserManagement";
import { filterUsers } from "../utils/userHelpers";
import UserForm from "../components/UserForm/UserForm";
import UserTable from "../components/UserTable/UserTable";
import SearchBar from "../components/SearchBar/SearchBar";
import "./UserListPage.css";

const UserListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    users,
    currentUser,
    setCurrentUser,
    addUser,
    updateUser,
    deleteUser,
    resetCurrentUser,
    loading, // Add loading state
    error, // Add error state
  } = useUserManagement(); // Remove initialUsers, now fetched from API

  const filteredUsers = filterUsers(users, searchTerm);

  const handleSubmit = async (e) => {
    // Make handleSubmit async
    e.preventDefault();
    try {
      if (currentUser.id) {
        await updateUser(currentUser);
      } else {
        await addUser(currentUser);
      }
      resetCurrentUser();
    } catch (err) {
      // Error handling is already in useUserManagement, but you can add
      // specific UI feedback here if needed (e.g., a toast notification)
      console.error("Submission failed:", err);
    }
  };

  if (loading) return <p className="loading-message">Cargando usuarios...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="user-list-container">
      <div className="form-section">
        <UserForm
          user={currentUser}
          onChange={setCurrentUser}
          onSubmit={handleSubmit}
          isEditing={!!currentUser.id}
        />
      </div>

      <div className="content-section">
        <div className="search-section">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <p className="user-count">
            Mostrando {filteredUsers.length} de {users.length} usuarios
          </p>
        </div>

        <div className="table-container">
          <UserTable
            users={filteredUsers}
            onEdit={setCurrentUser}
            onDelete={deleteUser}
          />
        </div>
      </div>
    </div>
  );
};

export default UserListPage;
