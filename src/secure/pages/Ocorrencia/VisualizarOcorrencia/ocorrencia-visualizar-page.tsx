import React, { useCallback, useState } from 'react'
import {
    CButton,
    CCol,
    CContainer,
    CImage,
    CRow,
    CSpinner,
} from '@coreui/react'

import { useEffect } from 'react';
import Style from './ocorrencia-visualizar-page.module.scss'
import { useToast } from '../../../../features/toast';
import OcorrenciaService from '../../../../services/ocorrencia-service/ocorrencia-service';
import TipoOcorrenciaService from '../../../../services/tipo-ocorrencia-service/tipo-ocorrencia-service';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import EnumeradorService from '../../../../services/enumerador-service/enumerador-service';
import SetorService from '../../../../services/setor-service/setor-service';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../../features/auth';
import moment from 'moment';
import CIcon from '@coreui/icons-react';
import { cilVerticalAlignBottom } from '@coreui/icons';

const OcorrenciaVisualizarPage: React.FC<any> = (prop) => {
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
    const { id } = useParams<any>();
    const [ocorrencia, setOcorrencia] = useState<any>(null);

    const [initialForm, setInitialForm] = useState({
        OcorrenciaID: 0,
        Assunto: '',
        Descricao: '',
        UrgenciaENUM: '',
        SituacaoENUM: '',
        SetorID: '',
        TipoOcorrenciaID: '',
    });

    useEffect(() => {
        carregarOcorrencia();
    }, [])

    useEffect(() => {
        setInitialForm(ocorrencia)
    }, [ocorrencia])

    useEffect(() => {
        console.log(initialForm);
        carregarDados();

    }, [initialForm])

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

    const carregarOcorrencia = async (): Promise<void> => {
        setLoading(true)
        OcorrenciaService.getByID(parseInt(id || ''))
            .then((response: any) => {
                console.log(response);
                setOcorrencia(response.data)
                setInitialForm(response.data)
            })
            .finally(() => setLoading(false))
    };

    const SchemaValidation = Yup.object().shape({
    });

    const downloadAnexo = (value: any) => {
        console.log(value);
        let link = document.createElement('a');
        link.href = value.AnexoURL;
        link.download = value.Nome;
        link.click();
        link.remove();
    }


    const handleSubmit = (data: any) => {
        try {

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
            <Formik
                initialValues={initialForm}
                onSubmit={handleSubmit}
                validationSchema={SchemaValidation}
            >
                {({ errors, touched }) => (
                    <Form className={Style.formulario}>
                        <CContainer>
                            <div className="mb-3">
                                <h2 className={Style.tituloOcorrencia}>#{ocorrencia?.OcorrenciaID} - {ocorrencia?.Assunto}</h2>
                                <p className={Style.subTituloOcorrencia}>Por: {ocorrencia?.UsuarioCadastroNavigation?.Nome} - Data Criação: {moment(new Date(ocorrencia?.DataHoraCadastro)).format('DD/MM/YYYY HH:mm:SS')}  </p>
                                <CRow>
                                    <CCol xs={6} >
                                        <label htmlFor="TipoOcorrenciaID" className="form-label" >Tipo Ocorrência</label>
                                        <Field as="select" className='form-select' name="TipoOcorrenciaID" value={ocorrencia?.TipoOcorrenciaID} disabled>
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
                                        <Field as="select" className='form-select' name="SetorID" value={ocorrencia?.SetorID} disabled>
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
                                        <Field as="select" className='form-select' name="UrgenciaENUM" value={ocorrencia?.UrgenciaENUM} disabled>
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
                                        <Field as="select" className='form-select' name="SituacaoENUM" value={ocorrencia?.SituacaoENUM} disabled>
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
                                <Field type="text" className="form-control" name="Assunto" id="Assunto" placeholder="Assunto da Ocorrência" value={ocorrencia?.Assunto} disabled />
                                {errors.Assunto && touched.Assunto ? (
                                    <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Assunto}</div>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="Descricao" className="form-label">Descrição</label>
                                <Field as="textarea" rows='10' maxLength="1000" type="text" className="form-control" name="Descricao" id="Descricao" placeholder="Descrição da Ocorrência" value={ocorrencia?.Descricao} disabled />
                                {errors.Descricao && touched.Descricao ? (
                                    <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Descricao}</div>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="Anexos" className="form-label">Anexos </label>
                                <br></br>
                                {ocorrencia?.Anexos.map((a: any) => {
                                    return (
                                        <>
                                            <div>
                                                <CButton color="Dark" variant="outline" onClick={() => downloadAnexo(a)}>{a.Nome}  <CIcon icon={cilVerticalAlignBottom} className="me-2" /></CButton>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                            <CRow>
                                <CCol xs={12} className={Style.buttonCadastrar}>
                                    <CButton color="dark" type='button' onClick={() => { navigate(from) }} className={`m-3 px-4 ${Style.buttonEntrar}`}>
                                        Voltar
                                    </CButton>
                                    <CButton color="primary" type='button' className={`m-3 px-4 ${Style.buttonEntrar}`}>
                                        Resolver
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
export default OcorrenciaVisualizarPage;