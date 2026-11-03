import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, LocalStore } from '../lib/storage';

interface AuthContextType {
  user: UserAccount | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => Promise<void>;
  signup: (email: string, name: string) => Promise<void>;
  logout: () => void;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = LocalStore.getUser();
    setUser(savedUser);
    setLoading(false);
  }, []);

  const login = async (email: string, name?: string) => {
    // Adapter point: Later replace with Firebase signInWithEmailAndPassword
    const existing = LocalStore.getUser();
    const activeUser: UserAccount = {
      id: existing?.id || 'usr-' + Math.random().toString(36).substring(2, 9),
      email,
      name: name || existing?.name || 'Responsable',
      country: 'México',
      locale: 'es-MX',
      consentAt: existing?.consentAt || new Date().toISOString()
    };
    LocalStore.setUser(activeUser);
    setUser(activeUser);
  };

  const signup = async (email: string, name: string) => {
    // Adapter point: Later replace with Firebase createUserWithEmailAndPassword
    const newUser: UserAccount = {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      email,
      name,
      country: 'México',
      locale: 'es-MX',
      consentAt: new Date().toISOString()
    };
    LocalStore.setUser(newUser);
    LocalStore.setOnboardingCompleted(false);
    setUser(newUser);
  };

  const logout = () => {
    // Adapter point: Later replace with Firebase signOut
    LocalStore.setUser(null);
    setUser(null);
  };

  const deleteAccount = async () => {
    // Adapter point: Later replace with Firebase user deletion and Firestore batch delete
    LocalStore.clearAllData();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
