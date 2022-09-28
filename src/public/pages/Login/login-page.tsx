import React, { useCallback, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilLockUnlocked } from '@coreui/icons'

import { useEffect } from 'react';
import Style from './login-page.module.scss'
import logoIFMS from '../../../assets/img/ifms-logo.png'
import { useToast } from '../../../features/toast'
import { useAuth } from '../../../features/auth'

import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik'

interface LoginProps {
    state: any;
}

interface FormData {
    email: string;
    senha: string;
}

const LoginPage: React.FC<LoginProps> = (prop) => {
    const [validated, setValidated] = useState(false)
    const { signIn, user } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };
    const [passwordType, setPasswordType] = useState("password");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const initialForm = {
        email: '',
        senha: '',
    };

    useEffect(() => {

    }, [])

    const SchemaValidation = Yup.object().shape({
        senha: Yup.string()
            .min(4, 'Muito curta')
            .max(8, 'Muito longa')
            .required('Senha obrigatória'),
        email: Yup.string().email('Digite um e-mail válido').required('E-mail obrigatório'),
    });

    const handleSubmit = useCallback(
        async (data: FormData) => {
            try {
                await signIn({
                    email: data.email.toLowerCase(),
                    senha: data.senha,
                });

                navigate(from);

            } catch (ex) {
                addToast({
                    title: 'Erro ao fazer login',
                    description: 'Verifique suas credenciais',
                    type: 'error',
                });
            }
        },
        [signIn, addToast, from]
    );

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            setPasswordVisible(true)
            return;
        }
        setPasswordVisible(false)
        setPasswordType("password")
    }

    return (
        <>
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={8}>
                            <CCardGroup>
                                <CCard className={`text-white py-5`} >
                                    <CCardBody className="text-center">
                                        <div>
                                            <img src={logoIFMS} className={Style.logoIFMS}></img>
                                        </div>
                                    </CCardBody>
                                </CCard>
                                <CCard className="p-4">
                                    <CCardBody>
                                        <div>
                                            <h1>SISOC</h1>
                                            <p className="text-medium-emphasis">Faça seu Login</p>
                                        </div>
                                        <Formik
                                            initialValues={initialForm}
                                            onSubmit={handleSubmit}
                                            validationSchema={SchemaValidation}
                                        >
                                            {({ errors, touched }) => (
                                                <Form>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text" id="basic-addon3"><CIcon icon={cilUser} /></span>
                                                        <Field type="email" className="form-control" name="email" id="email" placeholder="E-mail" />
                                                        {errors.email && touched.email ? (
                                                            <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.email}</div>
                                                        ) : null}
                                                    </div>

                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text" id="basic-addon3" onClick={() => { togglePassword() }}><CIcon icon={passwordVisible ? cilLockUnlocked : cilLockLocked} /></span>
                                                        <Field type={passwordType} className="form-control" name="senha" id="senha" placeholder="Senha" />
                                                        {errors.senha && touched.senha ? (
                                                            <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.senha}</div>
                                                        ) : null}
                                                    </div>

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
                                                </Form>
                                            )}
                                        </Formik>
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