import React from 'react'
import { Link } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import { useEffect } from 'react';
import Style from './login-page.module.scss'
import logoIFMS from '../../../assets/img/ifms-logo.png'

interface LoginProps {
    location: any;
}
const LoginPage: React.FC<LoginProps> = (prop) => {

    useEffect(() => {
    }, [])

    const onFinish = (values: any) => {

    }

    const onFinishFailed = (errorInfo: any) => {

    };

    return (
        <>
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={8}>
                            <CCardGroup>
                                <CCard className="text-white py-5" style={{ width: '4%' }}>
                                    <CCardBody className="text-center">
                                        <div>
                                            <img src={logoIFMS} className={Style.logoIFMS}></img>
                                        </div>
                                    </CCardBody>
                                </CCard>
                                <CCard className="p-4">
                                    <CCardBody>
                                        <CForm>
                                            <h1>SISOC</h1>
                                            <p className="text-medium-emphasis">Faça seu Login</p>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilUser} />
                                                </CInputGroupText>
                                                <CFormInput placeholder="E-mail" autoComplete="e-mail" />
                                            </CInputGroup>
                                            <CInputGroup className="mb-4">
                                                <CInputGroupText>
                                                    <CIcon icon={cilLockLocked} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    type="password"
                                                    placeholder="Senha"
                                                    autoComplete="senha"
                                                />
                                            </CInputGroup>
                                            <CRow>
                                                <CCol xs={12}>
                                                    <CButton color="primary" className={`px-4 ${Style.buttonEntrar}`}>
                                                        Entrar
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCol xs={6}>
                                                    <Link to="/cadastrar">
                                                        <CButton color="link" className={`px-0 ${Style.link}`}>
                                                            Cadastre-se
                                                        </CButton>
                                                    </Link>
                                                </CCol>
                                                <CCol xs={6} className="text-right">
                                                    <CButton color="link" className={`px-0 ${Style.link}`}>
                                                        Esqueceu sua senha?
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </CCardBody>
                                </CCard>

                            </CCardGroup>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </>
    )
}
export default LoginPage;