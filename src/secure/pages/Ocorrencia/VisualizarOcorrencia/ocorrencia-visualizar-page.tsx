import React, { useCallback, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardText,
    CCardTitle,
    CCol,
    CContainer,
    CImage,
    CNav,
    CNavItem,
    CNavLink,
    CPopover,
    CRow,
    CSpinner,
    CTabContent,
    CTabPane,
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
import { cilCommentBubble, cilCommentSquare, cilVerticalAlignBottom } from '@coreui/icons';
import InteracaoOcorrenciaModal from '../ModalInteracaoOcorrencia/interacao-ocorrencia-modal';
import ResolverOcorrenciaModal from '../ModalResolverOcorrencia/resolver-ocorrencia-modal';

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
    const [activeKey, setActiveKey] = useState(1)
    const userLogado = JSON.parse(localStorage.getItem('@Sisoc:user') || '');
    const [visibleModalInteracao, setVisibleModalInteracao] = useState(false);
    const [visibleModalResolverOcorrencia, setVisibleModalResolverOcorrencia] = useState(false);

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
        carregarDados();
    }, [])

    useEffect(() => {
        setInitialForm(ocorrencia)
    }, [ocorrencia])

    useEffect(() => {
        carregarOcorrencia();
    }, [visibleModalInteracao, visibleModalResolverOcorrencia])

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

    const fecharPopover = useCallback(
        async () => {
            document.getElementById(`buttonAtribuir`)?.click()
        }, []
    )

    const atribuirOcorrencia = async (): Promise<void> => {
        setLoading(true)
        ocorrencia.UsuarioAtribuidoID = userLogado.UsuarioID;
        ocorrencia.SituacaoENUM = "EmAndamento";
        setOcorrencia(ocorrencia);
        OcorrenciaService.put(ocorrencia)
            .then((response: any) => {
                console.log(response);
                carregarOcorrencia();
            })
            .finally(() => setLoading(false))
    };

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
            <InteracaoOcorrenciaModal model={ocorrencia} setVisivelFalse={() => setVisibleModalInteracao(false)} visivel={visibleModalInteracao}></InteracaoOcorrenciaModal>
            <ResolverOcorrenciaModal model={ocorrencia} setVisivelFalse={() => setVisibleModalResolverOcorrencia(false)} visivel={visibleModalResolverOcorrencia}></ResolverOcorrenciaModal>
            <CSpinner hidden={!loading} />
            <h2 className={Style.tituloOcorrencia}>#{ocorrencia?.OcorrenciaID} - {ocorrencia?.Assunto}</h2>
            <p className={Style.subTituloOcorrencia}>Por: {ocorrencia?.UsuarioCadastroNavigation?.Nome} - Data Criação: {moment(new Date(ocorrencia?.DataHoraCadastro)).format('DD/MM/YYYY HH:mm:SS')}  </p>
            <CNav variant="tabs" role="tablist">
                <CNavItem>
                    <CNavLink
                        href="javascript:void(0);"
                        active={activeKey === 1}
                        onClick={() => setActiveKey(1)}
                    >
                        Detalhes
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink
                        href="javascript:void(0);"
                        active={activeKey === 2}
                        onClick={() => setActiveKey(2)}
                    >
                        Interações
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink
                        href="javascript:void(0);"
                        active={activeKey === 3}
                        onClick={() => setActiveKey(3)}
                    >
                        Resolução
                    </CNavLink>
                </CNavItem>
            </CNav>
            <CTabContent>
                <CTabPane className={Style.tab} role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                    <Formik
                        enableReinitialize={true}
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

                                </CContainer>
                            </Form>
                        )}
                    </Formik>
                </CTabPane>
                <CTabPane className={Style.tab} role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
                    {ocorrencia?.InteracaoOcorrencias?.length > 0 ? ocorrencia?.InteracaoOcorrencias?.map((io: any) => {
                        return (
                            <>
                                <CCard className={Style.card}>
                                    <CCardHeader><CIcon icon={cilCommentSquare} className="me-2" /><b>{io.UsuarioNavigation.Nome} </b>- {moment(new Date(io.DataHoraCadastro)).format('DD/MM/YYYY HH:mm:SS')} </CCardHeader>
                                    <CCardBody>
                                        <CCardText><b>Assunto:</b> {io.Assunto} </CCardText>
                                        <CCardText><b>Descrição:</b> {io.Descricao}</CCardText>
                                        <div className="mb-3">
                                            <label htmlFor="Anexos" className="form-label">Anexos </label>
                                            <br></br>
                                            {io?.Anexos?.map((a: any) => {
                                                return (
                                                    <>
                                                        <div>
                                                            <CButton color="Dark" variant="outline" onClick={() => downloadAnexo(a)}>{a.Nome}  <CIcon icon={cilVerticalAlignBottom} className="me-2" /></CButton>
                                                        </div>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </CCardBody>
                                </CCard>
                                <br></br>
                            </>
                        )
                    }) :
                        <h4> Nenhuma interação registrada.</h4>
                    }

                </CTabPane>
                <CTabPane className={Style.tab} role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 3}>
                    <Formik
                        initialValues={initialForm}
                        onSubmit={handleSubmit}
                        validationSchema={SchemaValidation}
                    >
                        {({ errors, touched }) => (
                            <Form className={Style.formulario}>
                                <CContainer>
                                    <div className="mb-3">
                                        <label htmlFor="Resolucao" className="form-label">Resolução</label>
                                        <Field as="textarea" rows='10' maxLength="1000" type="text" className="form-control" name="Resolucao" id="Resolucao" placeholder="Resolução da Ocorrência" value={ocorrencia?.Resolucao} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="UsuarioAtribuido" className="form-label">Usuário Resolução</label>
                                        <Field type="text" className="form-control" name="UsuarioAtribuido" id="UsuarioAtribuido" placeholder="Usuário Resolução" value={ocorrencia?.UsuarioAtribuidoNavigation?.Nome} disabled />
                                    </div>

                                </CContainer>
                            </Form>
                        )}
                    </Formik>
                </CTabPane>
            </CTabContent>
            <CRow>
                <CCol xs={12} className={Style.buttonCadastrar}>
                    <CButton color="dark" type='button' onClick={() => { navigate(from) }} className={`m-3 px-4 ${Style.buttonEntrar}`}>
                        Voltar
                    </CButton>
                    <CButton color="info" type='button' className={`m-3 px-4 ${Style.buttonEntrar}`} onClick={() => setVisibleModalInteracao(true)}>
                        Interagir
                    </CButton>
                    {userLogado?.UsuarioID == ocorrencia?.UsuarioCadastroID ?
                        <CButton color="info" type='button' className={`m-3 px-4 ${Style.buttonEntrar}`} onClick={() => {
                            navigate(`/ocorrencia/editar/${initialForm?.OcorrenciaID}`)
                        }}>
                            Editar
                        </CButton> :
                        <>
                            <CButton color="primary" type='button' className={`m-3 px-4 ${Style.buttonEntrar}`} onClick={() => setVisibleModalResolverOcorrencia(true)}>
                                Resolver
                            </CButton>
                        </>
                    }
                    {userLogado?.UsuarioID != ocorrencia?.UsuarioCadastroID && ocorrencia?.SituacaoENUM.toUpperCase() == 'ABERTO' ?
                        <>
                            <CPopover
                                trigger='click'
                                title="Atribuir Ocorrência"
                                content={<> Tem certeza que deseja atribuir essa Ocorrência a você?
                                    <div className={Style.buttonConfirm}>
                                        <CButton color='dark' size='sm' variant="outline" onClick={() => { fecharPopover() }} >Não</CButton> <CButton color='success' size='sm' onClick={() => atribuirOcorrencia()}>Sim</CButton>
                                    </div>
                                </>
                                }
                                placement="top"
                            >
                                <CButton color="primary" type='button' id="buttonAtribuir" className={`m-3 px-4 ${Style.buttonEntrar}`}>
                                    Atribuir Ocorrência a mim
                                </CButton>
                            </CPopover>
                        </>

                        : null
                    }
                </CCol>
            </CRow>
        </>
    )
}
export default OcorrenciaVisualizarPage;