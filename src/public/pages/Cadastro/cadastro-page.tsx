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
import { cilLockLocked, cilLockUnlocked, cilUser } from '@coreui/icons'

import { useEffect } from 'react';
import Style from './cadastro-page.module.scss'
import logoIFMS from '../../../assets/img/ifms-logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useToast } from '../../../features/toast';
import { Formik, Field, Form } from 'formik';
import MaskedInput from "react-text-mask";
import UsuarioService from '../../../services/usuario-service/usuario-service';

const CadastroPage: React.FC<any> = (prop) => {
    const [loading, setLoading] = useState(false);
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState("password");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");
    const [confirmPasswordTypeVisible, setConfirmPasswordTypeVisible] = useState(false);
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    useEffect(() => {

    }, [])

    const initialForm = {
        Nome: '',
        Email: '',
        Ra_siape: '',
        Senha: '',
        SenhaConfirma: '',
    };

    const SchemaValidation = Yup.object().shape({
        Senha: Yup.string()
            .min(6, 'Muito curta')
            .max(12, 'Muito longa')
            .required('Senha obrigatória'),
        SenhaConfirma: Yup.string()
            .min(6, 'Muito curta')
            .max(12, 'Muito longa')
            .required('Confirmar Senha obrigatória')
            .oneOf([Yup.ref('Senha'), null], 'Senhas não conferem'),
        Email: Yup.string().email('Digite um e-mail válido').required('E-mail obrigatório'),
        Nome: Yup.string()
            .max(100, 'Muito longo')
            .required('Nome obrigatório'),
        Ra_siape: Yup.string()
            .max(20, 'Muito longo')
            .required('RA/SIAPE obrigatório'),
    });

    const togglePassword = (value: any) => {
        if (value == "password") {
            if (passwordType === "password") {
                setPasswordType("text")
                setPasswordVisible(true)
                return;
            }
            setPasswordType("password")
            setPasswordVisible(false)
        }
        else {
            if (confirmPasswordType === "password") {
                setConfirmPasswordType("text")
                setConfirmPasswordTypeVisible(true)
                return;
            }
            setConfirmPasswordType("password")
            setConfirmPasswordTypeVisible(false)
        }
    }

    const handleSubmit = (data: any) => {
        try {
            console.log(data);
            UsuarioService.postRegistrar(data)
                .then((res) => {
                    if (res.success) {
                        addToast({
                            title: 'Sucesso!',
                            description: 'Registro cadastrado com sucesso',
                            type: 'success',
                        });
                    }
                })
                .finally(() => {
                    navigate('/login');
                })
                .catch((ex) => {
                    if (ex.response != undefined) {
                        ex.response.data.error.map((a: any) => {
                            addToast({
                                title: 'Erro',
                                description: a,
                                type: 'error',
                            });
                        })
                    }
                    else {
                        addToast({
                            title: 'Erro',
                            description: 'Erro na conexão com servidor',
                            type: 'error',
                        });
                    }
                })

        } catch (ex) {
            addToast({
                title: 'Erro ao fazer Cadastro',
                description: 'Verifique os dados inseridos',
                type: 'error',
            });
        }
    }

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
                                                    <Field type="text" className="form-control" name="Nome" id="Nome" placeholder="Nome" />
                                                    {errors.Nome && touched.Nome ? (
                                                        <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Nome}</div>
                                                    ) : null}
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text" id="basic-addon3"><CIcon icon={cilUser} /></span>
                                                    <Field type="email" className="form-control" name="Email" id="Email" placeholder="E-mail" />
                                                    {errors.Email && touched.Email ? (
                                                        <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Email}</div>
                                                    ) : null}
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text" id="basic-addon3"><CIcon icon={cilUser} /></span>
                                                    <Field type="text" className="form-control" name="Ra_siape" id="Ra_siape" placeholder="RA/SIAPE" />
                                                    {errors.Ra_siape && touched.Ra_siape ? (
                                                        <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Ra_siape}</div>
                                                    ) : null}
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text" id="basic-addon3" onClick={() => { togglePassword("password") }}><CIcon icon={passwordVisible ? cilLockUnlocked : cilLockLocked} /></span>
                                                    <Field type={passwordType} className="form-control" name="Senha" id="Senha" placeholder="Senha" />
                                                    {errors.Senha && touched.Senha ? (
                                                        <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Senha}</div>
                                                    ) : null}
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text" id="basic-addon3" onClick={() => { togglePassword("confirmPassword") }}><CIcon icon={confirmPasswordTypeVisible ? cilLockUnlocked : cilLockLocked} /></span>
                                                    <Field type={confirmPasswordType} className="form-control" name="SenhaConfirma" id="SenhaConfirma" placeholder="Confirmar Senha" />
                                                    {errors.SenhaConfirma && touched.SenhaConfirma ? (
                                                        <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.SenhaConfirma}</div>
                                                    ) : null}
                                                </div>

                                                <CRow>
                                                    <CCol xs={12}>
                                                        <CButton color="primary" type='submit' className={`px-4 ${Style.buttonEntrar}`}>
                                                            Cadastrar
                                                        </CButton>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs={12}>
                                                        <Link to={from}>
                                                            <CButton color="link" className={`px-0 ${Style.link}`}>
                                                               Voltar
                                                            </CButton>
                                                        </Link>
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