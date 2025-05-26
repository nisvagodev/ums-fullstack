export const filterUsers = (users, searchTerm) => {
  if (!searchTerm.trim()) return users;

  const term = searchTerm.toLowerCase();
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
  );
};

export const validateUser = (user) => {
  const errors = {};
  if (!user.name.trim()) errors.name = "Nombre es requerido";
  if (!user.email.trim()) errors.email = "Email es requerido";
  if (!user.age || isNaN(user.age) || user.age < 0)
    errors.age = "Edad inválida";
  return errors;
};
