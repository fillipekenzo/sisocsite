import React, { useCallback, useState } from 'react'
import {
    CButton,
    CCol,
    CContainer,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CRow,
} from '@coreui/react'

import { useEffect } from 'react';
import Style from './usuario-cadastro-modal.module.scss'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useToast } from '../../../../features/toast';
import UsuarioService from '../../../../services/usuario-service/usuario-service';
import TipoUsuarioService from '../../../../services/tipo-usuario-service/tipo-usuario-service';
import SetorService from '../../../../services/setor-service/setor-service';

interface UsuarioCadastroModalProps {
    visivel: boolean;
    setVisivelFalse?: any;
}

const UsuarioCadastroModal: React.FC<UsuarioCadastroModalProps> = (props) => {

    const { addToast } = useToast();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [setores, setSetores] = useState<any[]>([]);
    const [tipoUsuarios, setTipoUsuarios] = useState<any[]>([]);

    useEffect(() => {
        setVisible(props.visivel)
        carregarDados()
    }, [props.visivel])

    const initialForm = {
        Nome: '',
        Email: '',
        RA_SIAPE: '',
        Senha: '',
        SenhaConfirma: '',
        SetorID: '',
        TipoUsuarioID: '',
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
        RA_SIAPE: Yup.string()
            .max(20, 'Muito longo')
            .required('RA/SIAPE obrigatório'),
        SetorID: Yup.string().required('Setor obrigatorio'),
        TipoUsuarioID: Yup.string().required('Tipo Usuário obrigatorio'),
    });

    const carregarDados = async (): Promise<void> => {
        setLoading(true)

        TipoUsuarioService.get()
            .then((response: any) => { setTipoUsuarios(response.data) })
            .finally(() => setLoading(false))

        SetorService.get()
            .then((response: any) => { setSetores(response.data) })
            .finally(() => setLoading(false))
    };

    const handleSubmit = async (data: any) => {
        try {
            UsuarioService.post(data)
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
                    props.setVisivelFalse()
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
                title: 'Erro',
                description: 'Não foi possível executar esta ação',
                type: 'error',
            });
        }
    }


    return (
        <CModal alignment="center" visible={visible} onClose={() => props.setVisivelFalse()} backdrop='static'>
            <CModalHeader>
                <CModalTitle>Cadastrar Usuário</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <Formik
                    initialValues={initialForm}
                    onSubmit={handleSubmit}
                    validationSchema={SchemaValidation}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <CContainer >
                                <div className="mb-3">
                                    <label htmlFor="Nome" className="form-label">Nome</label>
                                    <Field type="text" className="form-control" name="Nome" id="Nome" placeholder="Nome do Usuario" />
                                    {errors.Nome && touched.Nome ? (
                                        <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Nome}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="Sigla" className="form-label">Email</label>
                                    <Field type="email" className="form-control" name="Email" id="Email" placeholder="E-mail do Usuario" />
                                    {errors.Email && touched.Email ? (
                                        <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Email}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="RA_SIAPE" className="form-label">RA/SIAPE</label>
                                    <Field type="text" className="form-control" name="RA_SIAPE" id="RA_SIAPE" placeholder="RA/SIAPE do Usuario" />
                                    {errors.RA_SIAPE && touched.RA_SIAPE ? (
                                        <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.RA_SIAPE}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="SetorID" className="form-label" >Setor</label>
                                    <Field as="select" className='form-select' name="SetorID">
                                        <option value='' disabled>Selecione</option>
                                        {setores.map(s => {
                                            return (
                                                <option value={s.SetorID}>({s.Sigla}) {s.Nome}</option>
                                            )
                                        })}
                                    </Field>
                                    {errors.SetorID && touched.SetorID ? (
                                        <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.SetorID}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="TipoUsuarioID" className="form-label" >Tipo Usuário</label>
                                    <Field as="select" className='form-select' name="TipoUsuarioID">
                                        <option value='' disabled>Selecione</option>
                                        {tipoUsuarios.map(t => {
                                            return (
                                                <option value={t.TipoUsuarioID}>{t.Nome} - {t.Descricao}</option>
                                            )
                                        })}
                                    </Field>
                                    {errors.TipoUsuarioID && touched.TipoUsuarioID ? (
                                        <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.TipoUsuarioID}</div>
                                    ) : null}
                                </div>

                                <div className=" mb-3">
                                    <label htmlFor="Senha" className="form-label" >Senha</label>
                                    <Field type="password" className="form-control" name="Senha" id="Senha" placeholder="Senha" />
                                    {errors.Senha && touched.Senha ? (
                                        <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Senha}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="Senha" className="form-label" >Confirmar Senha</label>
                                    <Field type="password" className="form-control" name="SenhaConfirma" id="SenhaConfirma" placeholder="Confirmar Senha" />
                                    {errors.SenhaConfirma && touched.SenhaConfirma ? (
                                        <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.SenhaConfirma}</div>
                                    ) : null}
                                </div>
                                <CRow>
                                    <CCol xs={12} className={Style.buttonCadastrar}>
                                        <CButton color="primary" type='submit' className={`px-4 ${Style.buttonEntrar}`}>
                                            Salvar
                                        </CButton>
                                    </CCol>
                                </CRow>
                            </CContainer>
                        </Form>
                    )}
                </Formik>

            </CModalBody>
        </CModal>
    )
}
export default UsuarioCadastroModal;