import React, { Suspense, useEffect } from 'react';
import { Routes, HashRouter, Route, Navigate, BrowserRouter } from 'react-router-dom';
import LoginPage from './public/pages/Login/login-page';
import CadastroPage from './public/pages/Cadastro/cadastro-page';
import Page404 from './secure/pages/Page404/page-404';
import HomePage from './secure/pages/Home/home-page';
import TipoOcorrenciaPage from './secure/pages/TipoOcorrencia/tipo-ocorrencia-page';
import TipoUsuarioPage from './secure/pages/TipoUsuario/tipo-usuario-page';

const RoutesSystem = (props) => {

    const isLoggedInFunc = () => !!localStorage.getItem('usuarioLogado');

    const SecuredRoute = ({ children, redirectTo }) => {
        const isLoggedIn = !!localStorage.getItem('@Sisoc:user');
        return isLoggedIn ? children : <Navigate to={redirectTo} />
    }

    return (
        <HashRouter>
            <Routes>
                <Route index path="/cadastrar" name="Cadastro" element={<CadastroPage />} />
                <Route index path="/login" name="Login" state={null} element={<LoginPage />} />
                
                <Route index path='*' element={
                    <SecuredRoute redirectTo="/login">
                        <HomePage />
                    </SecuredRoute>}
                />

            </Routes>
        </HashRouter>
    );
};

export default RoutesSystem;