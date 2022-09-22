import React from 'react'
import {
    CButton,
    CCard,
    CCardBody,
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
import Style from './cadastro-page.module.scss'
import logoIFMS from '../../../assets/img/ifms-logo.png'

const CadastroPage: React.FC<any> = (prop) => {

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
                        <CCol md={9} lg={7} xl={6}>
                            <CCard className="mx-4">
                                <CCardBody className="p-4">
                                    <CForm>
                                        <h1>SISOC</h1>
                                        <p className="text-medium-emphasis">Cadastre-se para acessar.</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="Nome Completo" autoComplete="username" />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>@</CInputGroupText>
                                            <CFormInput placeholder="E-mail" autoComplete="email" />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Senha"
                                                autoComplete="new-password"
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Repetir Senha"
                                                autoComplete="new-password"
                                            />
                                        </CInputGroup>
                                        <div className="d-grid">
                                            <CButton color="success">Cadastrar</CButton>
                                        </div>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </>
    )
}
export default CadastroPage;