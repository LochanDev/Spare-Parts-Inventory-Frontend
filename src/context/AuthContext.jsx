import React, { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    const token = authService.getAccessToken();
    console.log('[AuthContext] mount check — token:', token, 'user:', currentUser);
    if (currentUser && token) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const result = await authService.login(email, password);
    console.log('[AuthContext] login result:', result);
    if (result.success) {
      setUser(result.user);
      setIsAuthenticated(true);
      console.log('[AuthContext] state set — isAuthenticated: true');
    }
    return result;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const updateUser = useCallback((updatedUser) => setUser(updatedUser), []);

  console.log('[AuthContext] render — isLoading:', isLoading, 'isAuthenticated:', isAuthenticated);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};