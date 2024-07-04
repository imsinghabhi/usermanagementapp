import React, { createContext, useState, useEffect } from 'react';
import localforage from 'localforage';

interface User {
  id: number;
  username: string;
  password: string;
  roleType: 'admin' | 'user';
}

interface AuthContextProps {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  user: User | null;
  authenticate: (username: string, password: string, roleType: 'admin' | 'user') => Promise<void>;
  logout: () => Promise<void>;
  setError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const storedUser = await localforage.getItem<User>('currentUser');
        if (storedUser) {
          setIsAuthenticated(true);
          setUser(storedUser);
        }
      } catch (err) {
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const authenticate = (username: string, password: string, roleType: 'admin' | 'user'): Promise<void> => {
    setLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        const users: User[] = (await localforage.getItem('users')) || [];
        const foundUser = users.find(user =>
          user.username === username &&
          user.password === password &&
          user.roleType === roleType
        );

        if (foundUser) {
          setIsAuthenticated(true);
          setUser(foundUser);
          await localforage.setItem('currentUser', foundUser);
          setError(null);
          resolve();
        } else {
          setError('Invalid credentials or role type.');
          reject(new Error('Invalid credentials or role type.'));
        }
      } catch (err) {
        setError('Failed to authenticate.');
        reject(new Error('Failed to authenticate.'));
      } finally {
        setLoading(false);
      }
    });
  };

  const logout = async () => {
    try {
      await localforage.removeItem('currentUser');
      setIsAuthenticated(false);
      setUser(null);
      setError(null);
    } catch (err) {
      setError('Failed to logout.');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, error, user, authenticate, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
