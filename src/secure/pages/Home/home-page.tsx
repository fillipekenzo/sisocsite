import React, { Suspense } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/core-ui'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

import { useEffect } from 'react';
import Style from './login-page.module.scss'
import TipoUsuarioPage from '../TipoUsuario/tipo-usuario-page';

const SecuredRoute = ({ children, redirectTo }: any) => {
    const isLoggedIn = !!localStorage.getItem('usuarioLogado');
    return isLoggedIn ? children : <Navigate to={redirectTo} />
}


const HomePage: React.FC<any> = (prop) => {


    return (
        <>
            <div>
                <AppSidebar />
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <AppHeader />
                    <div className="body flex-grow-1 px-3">
                        <CContainer lg>
                            <Suspense fallback={<CSpinner color="primary" />}>
                                <Routes>
                                    {/* <Route path='/a' element={
                                        <SecuredRoute redirectTo="/login">
                                            <TipoUsuarioPage />
                                        </SecuredRoute>}
                                    /> */}
                                    <Route path="/"  element={<TipoUsuarioPage />} />
                                    {/* <Route path="/" element={<Navigate to="" replace />} /> */}
                                </Routes>
                            </Suspense>
                        </CContainer>
                    </div>
                    <AppFooter />
                </div>
            </div>
        </>
    )
}
export default HomePage;