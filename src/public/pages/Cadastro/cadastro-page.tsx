import React, { useCallback, useState } from 'react'
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
import { Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useToast } from '../../../features/toast';

const CadastroPage: React.FC<any> = (prop) => {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState("password");

    const initialForm = {
        Nome: '',
        Email: '',
        Ra_siape: '',
        Senha: '',
        ConfirmaSenha: '',
    };

    useEffect(() => {

    }, [])

    const SchemaValidation = Yup.object().shape({
        Senha: Yup.string()
            .min(4, 'Muito curta')
            .max(12, 'Muito longa')
            .required('Senha obrigatória'),
        ConfirmaSenha: Yup.string()
            .min(4, 'Muito curta')
            .max(12, 'Muito longa')
            .required('Confirmar Senha obrigatória'),
        Email: Yup.string().email('Digite um e-mail válido').required('E-mail obrigatório'),
        Nome: Yup.string()
            .max(100, 'Muito longo')
            .required('Nome obrigatório'),
        Ra_siape: Yup.string()
            .max(20, 'Muito longo')
            .required('RA/SIAPE obrigatório'),
    });

    const handleSubmit = useCallback(
        async (data: FormData) => {
            try {
                navigate('/login');

            } catch (ex) {
                addToast({
                    title: 'Erro ao fazer Cadastro',
                    description: 'Verifique os dados inseridos',
                    type: 'error',
                });
            }
        },
        [addToast]
    );

    return (
        <>
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={9} lg={7} xl={6}>
                            <CCard className="mx-4">
                                <CCardBody className="p-4">
                                    <h1>SISOC</h1>
                                    <p className="text-medium-emphasis">Cadastre-se como estudante para acessar.</p>
                                    <Formik
                                        initialValues={initialForm}
                                        onSubmit={handleSubmit}
                                        validationSchema={SchemaValidation}
                                    >
                                        {({ errors, touched }) => (
                                            <Form>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text" id="basic-addon3"><CIcon icon={cilUser} /></span>
                                                    <Field type="email" className="form-control" name="nome" id="nome" placeholder="E-mail" />
                                                    {errors.Email && touched.email ? (
                                                        <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.email}</div>
                                                    ) : null}
                                                </div>

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
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </>
    )
}
export default CadastroPage;