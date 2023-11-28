import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

import { registerRequest, loginRequest, logoutRequest, verifyToken } from "../api/auth.js";

export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const login = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const logout = async () => {
    await logoutRequest();
    setUser(null);
    setIsAuthenticated(false);
  }
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await verifyToken();
        if (!res) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setUser(res.data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    const cookie = Cookies.get();
    if (cookie.token) {
      verify();
      return;
    }
    setLoading(false);
    setIsAuthenticated(false);
    setUser(null);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        signup,
        login,
        logout,
        loading,
        user,
        errors,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
