import React, { useCallback, useState } from 'react'
import {
    CButton,
    CCol,
    CContainer,
    CRow,
    CSpinner,
} from '@coreui/react'

import { useEffect } from 'react';
import Style from './ocorrencia-cadastro-page.module.scss'
import { useToast } from '../../../../features/toast';
import OcorrenciaService from '../../../../services/ocorrencia-service/ocorrencia-service';
import TipoOcorrenciaService from '../../../../services/tipo-ocorrencia-service/tipo-ocorrencia-service';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import EnumeradorService from '../../../../services/enumerador-service/enumerador-service';
import SetorService from '../../../../services/setor-service/setor-service';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../features/auth';

const OcorrenciaCadastrarPage: React.FC<any> = (prop) => {
    const [loading, setLoading] = useState(false);
    const [tipoOcorrencias, setTipoOcorrencias] = useState<any[]>([]);
    const [setores, setSetores] = useState<any[]>([]);
    const [urgenciaENUM, setUrgenciaENUM] = useState<any[]>([]);
    const [situacaoENUM, setSituacaoENUM] = useState<any[]>([]);
    const { addToast } = useToast();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };
    const navigate = useNavigate();
    const { user } = useAuth();
    const [fileAnexo, setFileAnexo] = useState<any>(null);

    useEffect(() => {
        carregarDados();
    }, [])

    const carregarDados = async (): Promise<void> => {
        setLoading(true)
        EnumeradorService.get('ESituacaoOcorrencia')
            .then((response: any) => { setSituacaoENUM(response.data) })
            .finally(() => setLoading(false))

        EnumeradorService.get('EUrgenciaOcorrencia')
            .then((response: any) => { setUrgenciaENUM(response.data) })
            .finally(() => setLoading(false))

        TipoOcorrenciaService.get()
            .then((response: any) => { setTipoOcorrencias(response.data) })
            .finally(() => setLoading(false))

        SetorService.get()
            .then((response: any) => { setSetores(response.data) })
            .finally(() => setLoading(false))
    };

    const initialForm = {
        Assunto: '',
        Descricao: '',
        UrgenciaENUM: '',
        SituacaoENUM: '',
        SetorID: '',
        TipoOcorrenciaID: '',
    };

    const SchemaValidation = Yup.object().shape({
        TipoOcorrenciaID: Yup.string().required('Tipo Ocorrência obrigatoria'),
        SetorID: Yup.string().required('Setor obrigatorio'),
        SituacaoENUM: Yup.string().required('Situação obrigatoria'),
        UrgenciaENUM: Yup.string().required('Urgência obrigatoria'),
        Assunto: Yup.string()
            .min(2, 'Muito curto')
            .max(200, 'Muito longa')
            .required('Assunto obrigatório'),
        Descricao: Yup.string().required('Descrição obrigatória'),
    });

    const changeFile = (value: any) => {
        setFileAnexo(value);
    }

    const handleSubmit = (data: any) => {
        try {
            data.UsuarioCadastroID = user.UsuarioID;
            OcorrenciaService.post(data, fileAnexo)
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
                    navigate('/ocorrencia')
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
        <>
            <CSpinner hidden={!loading} />
            <h2>Nova Ocorrência</h2>
            <Formik
                initialValues={initialForm}
                onSubmit={handleSubmit}
                validationSchema={SchemaValidation}
            >
                {({ errors, touched }) => (
                    <Form className={Style.formulario}>
                        <CContainer>
                            <div className="mb-3">
                                <CRow>
                                    <CCol xs={6} >
                                        <label htmlFor="TipoOcorrenciaID" className="form-label" >Tipo Ocorrência</label>
                                        <Field as="select" className='form-select' name="TipoOcorrenciaID">
                                            <option value='' disabled>Selecione</option>
                                            {tipoOcorrencias.map(t => {
                                                return (
                                                    <option value={t.TipoOcorrenciaID}>{t.Nome}</option>
                                                )
                                            })}
                                        </Field>
                                        {errors.TipoOcorrenciaID && touched.TipoOcorrenciaID ? (
                                            <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.TipoOcorrenciaID}</div>
                                        ) : null}
                                    </CCol>
                                    <CCol xs={6} >
                                        <label htmlFor="SetorID" className="form-label" >Setor</label>
                                        <Field as="select" className='form-select' name="SetorID">
                                            <option value='' disabled>Selecione</option>
                                            {setores.map(s => {
                                                return (
                                                    <option value={s.SetorID}>{s.Nome}</option>
                                                )
                                            })}
                                        </Field>
                                        {errors.SetorID && touched.SetorID ? (
                                            <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.SetorID}</div>
                                        ) : null}
                                    </CCol>
                                </CRow>
                            </div>

                            <div className="mb-3">
                                <CRow>
                                    <CCol xs={6} >
                                        <label htmlFor="UrgenciaENUM" className="form-label" >Urgência</label>
                                        <Field as="select" className='form-select' name="UrgenciaENUM">
                                            <option value='' disabled>Selecione</option>
                                            {urgenciaENUM.map(u => {
                                                return (
                                                    <option value={u.Enum}>{u.Texto}</option>
                                                )
                                            })}
                                        </Field>
                                        {errors.UrgenciaENUM && touched.UrgenciaENUM ? (
                                            <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.UrgenciaENUM}</div>
                                        ) : null}
                                    </CCol>
                                    <CCol xs={6} >
                                        <label htmlFor="SituacaoENUM" className="form-label" >Situação</label>
                                        <Field as="select" className='form-select' name="SituacaoENUM">
                                            <option value='' disabled>Selecione</option>
                                            {situacaoENUM.map(u => {
                                                return (
                                                    <option value={u.Enum}>{u.Texto}</option>
                                                )
                                            })}
                                        </Field>
                                        {errors.SituacaoENUM && touched.SituacaoENUM ? (
                                            <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.SituacaoENUM}</div>
                                        ) : null}
                                    </CCol>
                                </CRow>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Assunto" className="form-label">Assunto</label>
                                <Field type="text" className="form-control" name="Assunto" id="Assunto" placeholder="Assunto da Ocorrência" />
                                {errors.Assunto && touched.Assunto ? (
                                    <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Assunto}</div>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="Descricao" className="form-label">Descrição</label>
                                <Field as="textarea" rows='10' maxLength="1000" type="text" className="form-control" name="Descricao" id="Descricao" placeholder="Descrição da Ocorrência" />
                                {errors.Descricao && touched.Descricao ? (
                                    <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Descricao}</div>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <input onChange={(event: any) => {
                                    changeFile(event.currentTarget.files[0]);
                                }} className="form-control" type="file" name="File" id="File" placeholder="Anexos" />
                            </div>

                            <CRow>
                                <CCol xs={12} className={Style.buttonCadastrar}>
                                    <CButton color="dark" type='button' onClick={() => { navigate(from) }} className={`m-3 px-4 ${Style.buttonEntrar}`}>
                                        Voltar
                                    </CButton>
                                    <CButton color="primary" type='submit' className={`m-3 px-4 ${Style.buttonEntrar}`}>
                                        Salvar
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
}
export default OcorrenciaCadastrarPage;