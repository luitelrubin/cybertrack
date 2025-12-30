// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    accessToken: null,
    user: null,
  });

  useEffect(() => {
    // Check if tokens exist in local storage on app load
    const token = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");
    if (token) {
      setAuth({
        isAuthenticated: true,
        accessToken: token,
        user: user ? JSON.parse(user) : null,
      });
    }
  }, []);

  const login = (accessToken, user = null) => {
    localStorage.setItem("access_token", accessToken);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    setAuth({
      isAuthenticated: true,
      accessToken,
      user,
    });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setAuth({
      isAuthenticated: false,
      accessToken: null,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
