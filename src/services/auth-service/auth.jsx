import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../api';

interface User {
  UsuarioID: number;
  Email: string;
  Nome: string;
  TipoUsuario: {
    Nome: string;
  };
}

interface AuthState {
  token: string;
  user: User;
}

interface CredentialsData {
  email: string;
  senha: string;
}

interface ContextData {
  user: User;
  signIn(credentials: CredentialsData): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<ContextData>({} as ContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Sisoc:token');
    const user = localStorage.getItem('@Sisoc:user');

    if (token && user) return { token, user: JSON.parse(user) };
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, senha }) => {
    console.log(email)
    console.log(senha)
    const response = await api.post('/Usuario/login', { email, senha });
    console.log(response)
    var token  = response.data.data.AccessToken;
    var user  = response.data.data.UserToken;

    localStorage.setItem('@Sisoc:token', response.data.data.AccessToken);
    localStorage.setItem('@Sisoc:user', JSON.stringify(response.data.data.UserToken));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Sisoc:token');
    localStorage.removeItem('@Sisoc:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): ContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
