import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '../services/userService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('smartmart_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('smartmart_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('smartmart_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    const res = await userService.login(email, password);
    setLoading(false);
    if (res.success) {
      setUser(res.user);
      localStorage.setItem('smartmart_token', res.token);
    }
    return res;
  };

  const register = async (userData) => {
    setLoading(true);
    const res = await userService.register(userData);
    setLoading(false);
    if (res.success) {
      setUser(res.user);
      localStorage.setItem('smartmart_token', res.token);
    }
    return res;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartmart_token');
    localStorage.removeItem('smartmart_user');
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
