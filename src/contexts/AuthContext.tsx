import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@/types';
import { authService } from '@/services/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  selectedProfile: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  selectProfile: (profileId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há token salvo no localStorage
    const token = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('user');
    const savedProfile = localStorage.getItem('selected_profile');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      if (savedProfile) {
        setSelectedProfile(savedProfile);
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user, token } = await authService.login(email, password);
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      // Não definir perfil automaticamente - usuário deve escolher
      setSelectedProfile(null);
      localStorage.removeItem('selected_profile');
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    localStorage.removeItem('selected_profile');
    setUser(null);
    setSelectedProfile(null);
  };

  const selectProfile = (profileId: string) => {
    setSelectedProfile(profileId);
    localStorage.setItem('selected_profile', profileId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        selectedProfile,
        login,
        logout,
        selectProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
