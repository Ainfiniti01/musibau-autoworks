import { createContext, useState, useContext } from "react";

export const AdminAuthContext = createContext();

const dummyCredentials = {
  username: "Admin",
  password: "password123",
};

export const AdminAuthProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    !!localStorage.getItem("adminToken")
  );

  const login = ({ username, password }) => {
    if (
      username === dummyCredentials.username &&
      password === dummyCredentials.password
    ) {
      localStorage.setItem("adminToken", "dummyToken123");
      setIsAdminLoggedIn(true);
      return { success: true };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setIsAdminLoggedIn(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminLoggedIn, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
