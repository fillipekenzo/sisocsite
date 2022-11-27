import React, { Suspense } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/core-ui'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import Style from './login-page.module.scss'
import TipoUsuarioPage from '../TipoUsuario/tipo-usuario-page';
import TipoOcorrenciaPage from '../TipoOcorrencia/tipo-ocorrencia-page';
import Page404 from '../Page404/page-404';
import SetorPage from '../Setor/setor-page';
import MenuPage from '../Menu/menu-page';
import OcorrenciaCadastrarPage from '../Ocorrencia/CadastrarOcorrencia/ocorrencia-cadastro-page';
import OcorrenciaPage from '../Ocorrencia/ocorrencia-page';
import OcorrenciaDashboardPage from '../Ocorrencia/DashboardOcorrencia/ocorrencia-dashboard-page';
import PermissaoPage from '../Permissao/permissao-page';

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
                                    <Route path="/" element={<OcorrenciaPage />} />
                                    <Route path="/tipo-ocorrencia" element={<TipoOcorrenciaPage />} />
                                    <Route path="/tipo-usuario" element={<TipoUsuarioPage />} />
                                    <Route path="/setor" element={<SetorPage />} />
                                    <Route path="/menu" element={<MenuPage />} />
                                    <Route path="/permissao" element={<PermissaoPage />} />
                                    <Route path="/ocorrencia" element={<OcorrenciaPage />} />
                                    <Route path="/ocorrencia/cadastrar" element={<OcorrenciaCadastrarPage />} />
                                    <Route path="/ocorrencia/consultar" element={<OcorrenciaPage />} />
                                    <Route path="/ocorrencia/dashboard" element={<OcorrenciaDashboardPage />} />
                                    <Route path="*" element={<Page404 />} />
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