import React, { createContext, useCallback, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import MenuService from '../services/menu-service/menu-service';

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

const AuthContext = createContext<ContextData>({} as ContextData)

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Sisoc:token');
    const user = localStorage.getItem('@Sisoc:user');

    if (token && user) return { token, user: JSON.parse(user) };
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, senha }: any) => {
    const response = await api.post('/Usuario/login', { email, senha });
    var token = response.data.data.AccessToken;
    var user = response.data.data.UserToken;

    localStorage.setItem('@Sisoc:token', response.data.data.AccessToken);
    localStorage.setItem('@Sisoc:user', JSON.stringify(response.data.data.UserToken));

    setData({ token, user });
    MenuService.getPorTipoUsuarioID(response.data.data.UserToken.TipoUsuario.TipoUsuarioID).then((res) => {
      localStorage.setItem('@Sisoc:menus', JSON.stringify(res.data));
    })

  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Sisoc:token');
    localStorage.removeItem('@Sisoc:user');
    localStorage.removeItem('@Sisoc:menus');

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
