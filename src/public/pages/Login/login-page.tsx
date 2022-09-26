import React, { useCallback, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormCheck,
    CFormFeedback,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import { useEffect } from 'react';
import Style from './login-page.module.scss'
import logoIFMS from '../../../assets/img/ifms-logo.png'
import { useToast } from '../../../features/toast'
import { useAuth } from '../../../features/auth'

interface LoginProps {
    location: any;
}

interface FormData {
    email: string;
    senha: string;
}

const LoginPage: React.FC<any> = (prop) => {
    const { addToast } = useToast();
    const [validated, setValidated] = useState(false)
    const { signIn, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    useEffect(() => {
    }, [])

    // const handleSubmit = (event: any) => {
    //     console.log(event);

    //     const form = event.currentTarget
    //     if (form.checkValidity() === false) {
    //         event.preventDefault()
    //         event.stopPropagation()
    //     }
    //     setValidated(true)
    //     addToast({
    //         title: 'Erro ao fazer login',
    //         description: 'Verifique suas credenciais',
    //         type: 'error',
    //     });
    // }

    const handleSubmit = useCallback(
        async (event: any) => {
            console.log(event);
            addToast({
                title: 'Erro ao fazer login',
                description: 'Verifique suas credenciais',
                type: 'error',
            });
            const form = event.currentTarget
            if (form.checkValidity() === false) {
                event.preventDefault()
                event.stopPropagation()
            }
            setValidated(true)
           
            // addToast({
            //     title: 'Erro ao fazer login',
            //     description: 'Verifique suas credenciais',
            //     type: 'error',
            // });
            // try {
            //     const form = data
            //     if (form.checkValidity() === false) {
            //         data.preventDefault()
            //         data.stopPropagation()
            //     }
            //     setValidated(true)
            //     await signIn({
            //         email: data.email.toLowerCase(),
            //         senha: data.senha,
            //     });

            //     // navigate(from);
            // } catch (ex) {
            //     // if (ex instanceof Yup.ValidationError) {
            //     //     const errors = getValidationErrors(ex);
            //     //     formRef.current?.setErrors(errors);
            //     //     return;
            //     // }

            //     addToast({
            //         title: 'Erro ao fazer login',
            //         description: 'Verifique suas credenciais',
            //         type: 'error',
            //     });
            // }
        },
        [signIn, addToast, history, from]
    );

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
                                        <CForm
                                            className="row g-3 needs-validation"
                                            noValidate
                                            validated={validated}
                                            onSubmit={handleSubmit}
                                        >
                                            <h1>SISOC</h1>
                                            <p className="text-medium-emphasis">Faça seu Login</p>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilUser} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    type="text"
                                                    placeholder="E-mail"
                                                    feedbackValid="E-mail válido!"
                                                    feedbackInvalid="Insira um e-mail válido!"
                                                    id="email"
                                                    required
                                                />
                                            </CInputGroup>
                                            <CInputGroup className="mb-4">
                                                <CInputGroupText>
                                                    <CIcon icon={cilLockLocked} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    type="password"
                                                    placeholder="Senha"
                                                    id="senha"
                                                    required
                                                />

                                            </CInputGroup>
                                            <CRow>
                                                <CCol xs={12}>
                                                    <CButton color="primary" type='submit' className={`px-4 ${Style.buttonEntrar}`}>
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