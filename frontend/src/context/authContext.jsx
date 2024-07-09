import React, { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
export const AuthContext = createContext();

// Custom hook for consuming AuthContext s
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
  // Initialize authUser state with data from localStorage
  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem('chat-user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Update localStorage whenever authUser changes
  useEffect(() => {
    if (authUser) {
      localStorage.setItem('chat-user', JSON.stringify(authUser));
    } else {
      localStorage.removeItem('chat-user');
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
