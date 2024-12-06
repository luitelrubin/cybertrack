// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    accessToken: null,
  });

  useEffect(() => {
    // Check if tokens exist in local storage on app load
    const token = localStorage.getItem('access_token');
    if (token) {
      setAuth({
        isAuthenticated: true,
        accessToken: token,
      });
    }
  }, []);

  const login = (accessToken) => {
    localStorage.setItem('access_token', accessToken);
    setAuth({
      isAuthenticated: true,
      accessToken,
    });
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAuth({
      isAuthenticated: false,
      accessToken: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
