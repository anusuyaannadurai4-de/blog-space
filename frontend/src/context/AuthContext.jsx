import { createContext, useContext, useEffect, useState } from 'react';
import api, { getToken, setToken, clearToken } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(getToken());
  const [loading, setLoading] = useState(true);

  // On startup: if a token exists, load the current user.
  useEffect(() => {
    const loadUser = async () => {
      const existingToken = getToken();

      if (!existingToken) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await api.getMe();
        setUser(currentUser);
        setTokenState(existingToken);
      } catch (error) {
        // Token invalid/expired - clear it.
        clearToken();
        setUser(null);
        setTokenState(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const register = async (payload) => {
    const data = await api.register(payload);
    setToken(data.token);
    setTokenState(data.token);
    setUser(data.user);
    return data.user;
  };

  const login = async (payload) => {
    const data = await api.login(payload);
    setToken(data.token);
    setTokenState(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    clearToken();
    setUser(null);
    setTokenState(null);
  };

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
