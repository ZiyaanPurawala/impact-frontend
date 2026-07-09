import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { handleMockRequest, getInitialSessions } from './demoMockData';

const AuthContext = createContext(null);

// ✅ Fixed: CRA uses process.env, not import.meta.env
const API_BASE = process.env.REACT_APP_API_URL || 'impact-backend-sigma.vercel.app/api';

axios.defaults.baseURL = API_BASE;

// Inject custom adapter for Guest/Demo Mode
const defaultAdapter = axios.defaults.adapter;
const defaultAdapterFn = typeof axios.getAdapter === 'function' ? axios.getAdapter(defaultAdapter) : null;

axios.defaults.adapter = async function (config) {
  const token = localStorage.getItem('pol_token');
  let isDemoRequest = token === 'demo-token-xyz';
  
  if (!isDemoRequest && config.url && config.url.includes('/auth/login') && config.data) {
    try {
      const parsed = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
      if (parsed.email === 'demo@progressiveoverload.com') {
        isDemoRequest = true;
      }
    } catch (e) {}
  }

  if (isDemoRequest) {
    return handleMockRequest(config);
  }

  if (typeof defaultAdapterFn === 'function') {
    return defaultAdapterFn(config);
  }
  if (typeof defaultAdapter === 'function') {
    return defaultAdapter(config);
  }
  return axios.create().defaults.adapter(config);
};

const isOfflineError = (err) => {
  if (!err.response) return true;
  const status = err.response.status;
  if (status === 404 || status === 502 || status === 503 || status === 504) {
    return true;
  }
  return false;
};

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const id = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('pol_token');
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return () => axios.interceptors.request.eject(id);
  }, []);

  useEffect(() => {
    // Clear any active session on app startup to show the Login/Register pages
    localStorage.removeItem('pol_token');
    localStorage.removeItem('pol_user');
    setUser(null);
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      const { data } = await axios.post('/auth/login', { email, password });
      localStorage.setItem('pol_token', data.token);
      localStorage.setItem('pol_user', JSON.stringify(data));
      setUser(data);
      return { success: true };
    } catch (err) {
      // Fallback to Demo Mode if backend is offline/unreachable
      if (isOfflineError(err)) {
        const isExplicitDemo = email === 'demo@progressiveoverload.com';
        
        let demoUsers = [];
        try {
          demoUsers = JSON.parse(localStorage.getItem('demo_users') || '[]');
        } catch (e) {}
        
        const matchedUser = demoUsers.find(u => u.email === email);
        
        // Verify password matches for registered accounts
        const isValidDemo = isExplicitDemo;
        const isValidRegistered = matchedUser && matchedUser.password === password;
        
        if (!isValidDemo && !isValidRegistered) {
          setError('Invalid email or password');
          return { success: false, error: 'Invalid email or password' };
        }
        
        console.warn("Backend offline. Logging in to Demo/Mock user.");
        const displayName = matchedUser ? matchedUser.name : 'Guest Lifter';
        const mockData = {
          _id: matchedUser ? `demo-user-${email}` : 'demo-user-123',
          name: displayName,
          email: email,
          unitPreference: matchedUser ? matchedUser.unitPreference : 'kg',
          token: 'demo-token-xyz'
        };
        localStorage.setItem('pol_token', mockData.token);
        localStorage.setItem('pol_user', JSON.stringify(mockData));
        setUser(mockData);
        return { success: true };
      }
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
      return { success: false, error: msg };
    }
  }, []);

  const register = useCallback(async (name, email, password, unitPreference = 'kg', phoneNumber = '') => {
    setError(null);
    try {
      const { data } = await axios.post('/auth/register', { name, email, password, unitPreference, phoneNumber });
      localStorage.setItem('pol_token', data.token);
      localStorage.setItem('pol_user', JSON.stringify(data));
      setUser(data);
      return { success: true };
    } catch (err) {
      // Fallback to Demo Mode if backend is offline/unreachable
      if (isOfflineError(err)) {
        console.warn("Backend offline. Registering user in Demo Mode.");
        
        let demoUsers = [];
        try {
          demoUsers = JSON.parse(localStorage.getItem('demo_users') || '[]');
        } catch (e) {}
        
        const exists = demoUsers.find(u => u.email === email);
        if (!exists) {
          demoUsers.push({ name, email, password, unitPreference, phoneNumber });
          localStorage.setItem('demo_users', JSON.stringify(demoUsers));
        }

        const mockData = {
          _id: 'demo-user-' + Date.now(),
          name: name,
          email: email,
          unitPreference: unitPreference,
          phoneNumber: phoneNumber,
          token: 'demo-token-xyz'
        };
        localStorage.setItem('pol_token', mockData.token);
        localStorage.setItem('pol_user', JSON.stringify(mockData));
        setUser(mockData);

        // Initialize an empty database for the newly registered user
        const userSuffix = email.replace(/[^a-zA-Z0-9]/g, '_');
        const sessionKey = `demo_sessions_${userSuffix}`;
        if (!localStorage.getItem(sessionKey)) {
          if (email === 'demo@progressiveoverload.com') {
            localStorage.setItem(sessionKey, JSON.stringify(getInitialSessions()));
          } else {
            localStorage.setItem(sessionKey, JSON.stringify([]));
          }
        }

        return { success: true };
      }
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      return { success: false, error: msg };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('pol_token');
    localStorage.removeItem('pol_user');
    setUser(null);
  }, []);

  const updateUser = useCallback((newFields) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...newFields };
      localStorage.setItem('pol_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

export { axios };