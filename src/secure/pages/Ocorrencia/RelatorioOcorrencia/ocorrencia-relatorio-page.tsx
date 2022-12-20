import React, { useCallback, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardText,
    CCol,
    CContainer,
    CPopover,
    CRow,
    CSpinner,
    CTable,
    CWidgetStatsA,
    CWidgetStatsD,
} from '@coreui/react'

import { useEffect } from 'react';
import moment from 'moment';
import OcorrenciaService from '../../../../services/ocorrencia-service/ocorrencia-service';
import { useToast } from '../../../../features/toast';
import { CChartLine } from '@coreui/react-chartjs';
import { cibFacebook, cilArrowBottom, cilCommentSquare } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import Style from './ocorrencia-relatorio-page.module.scss'
import TipoOcorrenciaService from '../../../../services/tipo-ocorrencia-service/tipo-ocorrencia-service';
import SetorService from '../../../../services/setor-service/setor-service';

interface OcorrenciaRelatorioProps {
    ocorrencia: any;
    visibleRelatorio: any;
}
const OcorrenciaRelatorioPage: React.FC<OcorrenciaRelatorioProps> = (prop) => {
    const [ocorrencia, setOcorrencia] = useState<any>(null);
    const [tipoOcorrencias, setTipoOcorrencias] = useState<any[]>([]);
    const [tipoOcorrenciaSelecionado, setTipoOcorrenciaSelecionado] = useState<any>();
    const [setores, setSetores] = useState<any[]>([]);
    const [setorSelecionado, setSetorSelecionado] = useState<any>();

    useEffect(() => {
        setOcorrencia(prop.ocorrencia)
        carregarDados()
    }, [prop.ocorrencia])

    const carregarDados = async (): Promise<void> => {
        TipoOcorrenciaService.get()
            .then((response: any) => { setTipoOcorrencias(response.data) })
            .finally(() => {
                let tipo = tipoOcorrencias.find(t => t.TipoOcorrenciaID == ocorrencia?.TipoOcorrenciaID)
                setTipoOcorrenciaSelecionado(tipo);
            })

        SetorService.get()
            .then((response: any) => { setSetores(response.data) })
            .finally(() => {
                let setor = setores.find(t => t.SetorID == ocorrencia?.SetorID)
                setSetorSelecionado(setor);
            })
    };

    return (
        <>
            <CContainer className={Style.font}>
                <CRow>
                    <h1 className={Style.tituloRelatorio}>Relatório de Ocorrência - Data Impressão: {moment(new Date()).format('DD/MM/YYYY HH:mm:SS')} </h1>
                </CRow>
                <CRow>
                    <div className={Style.header}>
                        <h2 className={Style.titulo} >#<b>{ocorrencia?.OcorrenciaID} - {ocorrencia?.Assunto}</b> </h2>
                        <p className={Style.subtitulo}>Por: {ocorrencia?.UsuarioCadastroNavigation?.Nome} - Data Criação: {moment(new Date(ocorrencia?.DataHoraCadastro)).format('DD/MM/YYYY HH:mm:SS')}  </p>
                    </div>
                </CRow>
                <CRow>
                    <div>
                        <p><b>Tipo Ocorrência:</b> {tipoOcorrenciaSelecionado?.Nome}</p>
                    </div>
                </CRow>
                <CRow>
                    <div>
                        <p><b>Setor:</b> {setorSelecionado?.Nome}</p>
                    </div>
                </CRow>
                <CRow>
                    <div>
                        <p><b>Urgência:</b> {ocorrencia?.UrgenciaENUM}</p>
                    </div>
                </CRow>
                <CRow>
                    <div>
                        <p><b>Situação:</b> {ocorrencia?.SituacaoENUM}</p>
                    </div>
                </CRow>
                <CRow>
                    <div>
                        <p><b>Descrição:</b> {ocorrencia?.Descricao}</p>
                    </div>
                </CRow>
                {ocorrencia?.Anexos.length > 0 ?
                    <CRow>
                        <div>
                            <b>Anexos:</b>
                            <img className={Style.anexo} alt={ocorrencia?.Anexos[0].Nome} src={ocorrencia?.Anexos[0].AnexoURL}></img>
                        </div>
                    </CRow>
                    : null
                }
                <hr></hr>
                <CRow>
                    <h1 className={Style.tituloRelatorio}>Interações</h1>
                </CRow>
                {
                    ocorrencia?.InteracaoOcorrencias?.map((io: any) => {
                        return (
                            <>
                                <CCard className={Style.card}>
                                    <CCardHeader >
                                        <CCardText className={Style.cardHeader}>{io.UsuarioNavigation.Nome} - {moment(new Date(io.DataHoraCadastro)).format('DD/MM/YYYY HH:mm:SS')}  </CCardText>
                                    </CCardHeader>
                                    <CCardBody>
                                        <CCardText>Assunto: {io.Assunto} </CCardText>
                                        <CCardText>Descrição: {io.Descricao}</CCardText>
                                        <div className="mb-1">
                                            <label htmlFor="Anexos" className="form-label">Anexos:</label>
                                            {io?.Anexos?.map((a: any) => {
                                                return (
                                                    <>
                                                        <div>
                                                            <img className={Style.anexo} alt={a.Nome} src={a.AnexoURL}></img>
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
                    })
                }
                {
                    ocorrencia?.SituacaoENUM.toUpperCase() == "RESOLVIDO" ?
                        <>
                            <hr></hr>
                            <CRow>
                                <h1 className={Style.tituloRelatorio}>Resolução</h1>
                            </CRow>
                            <CRow>
                                <div>
                                    <p><b>Usuário Resolução:</b> {ocorrencia?.UsuarioAtribuidoNavigation?.Nome}</p>
                                </div>
                            </CRow>
                            <CRow>
                                <div>
                                    <p><b>Resolução:</b> {ocorrencia?.Resolucao}</p>
                                </div>
                            </CRow>
                            <CRow>
                                <div>
                                    <p><b>Data Resolução:</b> {moment(new Date(ocorrencia?.DataHoraAlteracao)).format('DD/MM/YYYY HH:mm:SS')}</p>
                                </div>
                            </CRow>
                        </>
                        : null
                }
            </CContainer>

        </>
    )
}
export default OcorrenciaRelatorioPage;