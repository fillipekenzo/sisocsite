import React, { Suspense, useEffect } from 'react';
import { Routes, HashRouter, Route, Navigate, BrowserRouter } from 'react-router-dom';
import LoginPage from './public/pages/Login/login-page';
import CadastroPage from './public/pages/Cadastro/cadastro-page';
import Page404 from './secure/pages/Page404/page-404';

const RoutesSystem = (props) => {

    const isLoggedInFunc = () => !!localStorage.getItem('usuarioLogado');

    const SecuredRoute = ({ children, redirectTo }) => {
        const isLoggedIn = !!localStorage.getItem('usuarioLogado');
        console.log(isLoggedIn);
        return isLoggedIn ? children : <Navigate to={redirectTo} />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/home' element={
                    
                    <SecuredRoute redirectTo="/register">
                        <LoginPage />
                    </SecuredRoute>} 
                    />

                <Route path="/cadastrar" name="Cadastro" element={<CadastroPage />} />
                <Route path="/login" name="Login" element={<LoginPage />} />
                <Route path="*" name="teste" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesSystem;