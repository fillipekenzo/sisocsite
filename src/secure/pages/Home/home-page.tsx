import React, { Suspense, useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/core-ui'
import { Navigate, Route, Routes, useLocation, useNavigate, useNavigation } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import Style from './login-page.module.scss'
import TipoUsuarioPage from '../TipoUsuario/tipo-usuario-page';
import TipoOcorrenciaPage from '../TipoOcorrencia/tipo-ocorrencia-page';
import Page404 from '../Page404/page-404';
import SetorPage from '../Setor/setor-page';
import MenuPage from '../Menu/menu-page';
import OcorrenciaCadastrarPage from '../Ocorrencia/CadastrarOcorrencia/ocorrencia-cadastro-page';
import OcorrenciaPage from '../Ocorrencia/ocorrencia-page';
import PermissaoPage from '../Permissao/permissao-page';
import OcorrenciaVisualizarPage from '../Ocorrencia/VisualizarOcorrencia/ocorrencia-visualizar-page'
import OcorrenciaEditarPage from '../Ocorrencia/EditarOcorrencia/ocorrencia-editar-page'
import UsuarioPage from '../Usuario/usuario-page'
import ErrorPage from '../Error/error-page'
import OcorrenciaPainelPage from '../Ocorrencia/PainelOcorrencia/ocorrencia-painel-page'

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
                                    <Route path="/" element={<OcorrenciaPainelPage />} />
                                    <Route path="/error" element={<ErrorPage />} />
                                    <Route path="/tipo-ocorrencia" element={<TipoOcorrenciaPage />} />
                                    <Route path="/tipo-usuario" element={<TipoUsuarioPage />} />
                                    <Route path="/setor" element={<SetorPage />} />
                                    <Route path="/menu" element={<MenuPage />} />
                                    <Route path="/permissao" element={<PermissaoPage />} />
                                    <Route path="/usuario" element={<UsuarioPage />} />
                                    <Route path="/ocorrencia" element={<OcorrenciaPage />} />
                                    <Route path="/ocorrencia/cadastrar" element={<OcorrenciaCadastrarPage />} />
                                    <Route path="/ocorrencia/consultar" element={<OcorrenciaPage />} />
                                    <Route path="/ocorrencia/visualizar/:id" element={<OcorrenciaVisualizarPage />} />
                                    <Route path="/ocorrencia/editar/:id" element={<OcorrenciaEditarPage />} />
                                    <Route path="/ocorrencia/painel" element={<OcorrenciaPainelPage />} />
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