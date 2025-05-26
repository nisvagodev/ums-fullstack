import { useState, useEffect } from "react";

export const useUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    email: "",
    age: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/users`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Error al cargar usuarios: " + err.message);
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  const addUser = async (user) => {
    try {
      const response = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }
      const newUser = await response.json();
      setUsers((prev) => [...prev, newUser]);
      return newUser;
    } catch (err) {
      setError("Error al agregar usuario: " + err.message);
      console.error("Error adding user:", err);
      throw err;
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const response = await fetch(`/api/users/${updatedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }
      const data = await response.json();
      setUsers((prev) =>
        prev.map((user) => (user.id === data.id ? data : user))
      );
    } catch (err) {
      setError("Error al actualizar usuario: " + err.message);
      console.error("Error updating user:", err);
      throw err;
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      setError("Error al eliminar usuario: " + err.message);
      console.error("Error deleting user:", err);
      throw err;
    }
  };

  const resetCurrentUser = () => {
    setCurrentUser({ id: null, name: "", email: "", age: "" });
  };

  return {
    users,
    currentUser,
    setCurrentUser,
    addUser,
    updateUser,
    deleteUser,
    resetCurrentUser,
    loading,
    error,
  };
};
