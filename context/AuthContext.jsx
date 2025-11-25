import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signup = async (email, password, name) => {
    const userData = { id: '1', email, name };
    setUser(userData);
    return { success: true };
  };

  const signin = async (email, password) => {
    const userData = { id: '1', email, name: email.split('@')[0] };
    setUser(userData);
    return { success: true };
  };

  const signout = () => {
    setUser(null);
  };

  const value = {
    user,
    signup,
    signin,
    signout,
    loading: false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};