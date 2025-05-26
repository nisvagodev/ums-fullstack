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

  // Define your backend API URL. This will change when deployed to EC2.
  // For local development, it would be 'http://localhost:5000'
  // When deployed, it will be the public IP or domain of your EC2 instance.
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/users`);
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
  }, [API_URL]);

  const addUser = async (user) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
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
      throw err; // Re-throw to allow component to handle
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const response = await fetch(`${API_URL}/users/${updatedUser.id}`, {
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
      const response = await fetch(`${API_URL}/users/${id}`, {
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
