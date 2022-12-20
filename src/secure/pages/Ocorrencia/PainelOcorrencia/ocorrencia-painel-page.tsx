import React, { useCallback, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CContainer,
    CPopover,
    CRow,
    CSpinner,
    CTable,
    CWidgetStatsA,
    CWidgetStatsB,
    CWidgetStatsD,
    CWidgetStatsF,
} from '@coreui/react'

import { useEffect } from 'react';
import Style from './ocorrencia-painel-page.module.scss'
import moment from 'moment';
import OcorrenciaService from '../../../../services/ocorrencia-service/ocorrencia-service';
import { useToast } from '../../../../features/toast';
import { CChartLine } from '@coreui/react-chartjs';
import { cibFacebook, cilArrowBottom, cilChartPie } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import BarChart from '../../../components/charts/Bar/bar-chart-component';
import PieChart from '../../../components/charts/Pie/pie-chart-component';
import SetorService from '../../../../services/setor-service/setor-service';
import GraficoService from '../../../../services/grafico-service/grafico-service';
import { data, data1 } from './initial-date-chart';
import TipoOcorrenciaService from '../../../../services/tipo-ocorrencia-service/tipo-ocorrencia-service';
import { useNavigate } from 'react-router-dom';

const OcorrenciaPainelPage: React.FC<any> = (prop) => {
    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState<any[]>([]);
    const [setor, setSetor] = useState<any[]>([]);
    const [tipoOcorrencia, setTipoOcorrencia] = useState<any[]>([]);
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [dadosPieSetor, setDadosPieSetor] = useState<any>(data);
    const [dadosPieTipoOcorrencia, setDadosPieSetorTipoOcorrencia] = useState<any>(data);
    const [consultaGraficoBarSituacao, setConsultaGraficoBarSituacao] = useState<any>();
    const [dadosBarSituacao, setDadosBarSituacao] = useState<any>(data1);
    const [carregarDadosPieSetor, setcarregarDadosPieSetor] = useState(false);
    const [carregarDadosBarSituacao, setcarregarDadosBarSituacao] = useState(false);
    const [carregarDadosBarTipoOcorrencia, setcarregarDadosBarTipoOcorrencia] = useState(false);
    const userLogado = JSON.parse(localStorage.getItem('@Sisoc:user') || '');
    const [ocorrenciasAbertas, setOcorrenciasAbertas] = useState(0);
    const [ocorrenciasEmAtendimento, setOcorrenciasEmAtendimento] = useState(0);
    const [ocorrenciasResolvidas, setOcorrenciasResolvidas] = useState(0);

    useEffect(() => {
        carregarDados()
    }, [])

    useEffect(() => {
        if (carregarDadosBarTipoOcorrencia == true) {
            formatarDadosPieTipoOcorrencia()
        }
        if (carregarDadosPieSetor == true) {
            formatarDadosPieSetor()
        }
        if (carregarDadosBarSituacao == true) {
            formatarDadosBar()
            formatarDadosOcorrencias()

        }
    }, [carregarDadosPieSetor, carregarDadosBarSituacao, carregarDadosBarTipoOcorrencia])

    const carregarDados = async (): Promise<void> => {
        setLoading(true)
        OcorrenciaService.get()
            .then((data) => {
                data.data.map((d: any) => {
                    d.UsuarioCadastroNome = d.UsuarioCadastro.Nome
                    d.DataHoraCadastro = moment(new Date(d.DataHoraCadastro)).format('DD/MM/YYYY HH:mm:SS')
                })
                setDados(data.data);
            })
            .finally(() => {
                SetorService.get()
                    .then((data) => {
                        setSetor(data.data)
                    })
                    .finally(() => {
                        setcarregarDadosPieSetor(true)
                    })

                TipoOcorrenciaService.get()
                    .then((data) => {
                        setTipoOcorrencia(data.data)
                    })
                    .finally(() => {
                        setcarregarDadosBarTipoOcorrencia(true);
                    })
                setLoading(false)
            })

        GraficoService.getDadosGraficoVertical()
            .then((res) => {
                setConsultaGraficoBarSituacao(res.data)
            }).finally(() => {
                setcarregarDadosBarSituacao(true);
            })
    };

    const formatarDadosPieSetor = () => {
        let setorString: any[] = [];
        let dataSet: any[] = [];
        let dataformat: any[] = [];

        setor.map(s => {
            setorString.push(s.Sigla + " - " + s.Nome)
            dataformat.push(dados.filter(d => d.SetorID == s.SetorID).length);
        })

        dataSet.push({
            label: 'Quantidade Ocorrências',
            data: dataformat,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        })

        let dataTeste = {
            labels: setorString,
            datasets: dataSet
        }
        setDadosPieSetor(dataTeste);
    }

    const formatarDadosPieTipoOcorrencia = () => {
        let tipoOcorrenciaString: any[] = [];
        let dataSet: any[] = [];
        let dataformat: any[] = [];

        tipoOcorrencia.map(t => {
            tipoOcorrenciaString.push(t.Nome)
            dataformat.push(dados.filter(d => t.TipoOcorrenciaID == d.TipoOcorrenciaID).length);
        })

        dataSet.push({
            label: 'Quantidade Ocorrências',
            data: dataformat,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        })

        let dataTeste = {
            labels: tipoOcorrenciaString,
            datasets: dataSet
        }
        setDadosPieSetorTipoOcorrencia(dataTeste);
    }

    const formatarDadosBar = () => {
        let setorString: any[] = [];
        let dataSet: any[] = [];
        let dataformat: any[] = [];

        dataSet.push(
            {
                label: 'Abertas',
                data: consultaGraficoBarSituacao.QuantidadeAberto,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Resolvidas',
                data: consultaGraficoBarSituacao.QuantidadeResolvido,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        )

        let dataTeste = {
            labels: consultaGraficoBarSituacao.Meses,
            datasets: dataSet
        }

        setDadosBarSituacao(dataTeste);
    }

    const formatarDadosOcorrencias = () => {
        let ocorrencias: any[] = []

        if (userLogado.TipoUsuario?.Nome.toUpperCase() == "ATENDIMENTO") {
            ocorrencias = dados.filter(o => o.UsuarioAtribuidoID == userLogado.UsuarioID)
        }
        else if (userLogado.TipoUsuario?.Nome.toUpperCase() == "ESTUDANTE" || userLogado.TipoUsuario?.Nome.toUpperCase() == "DOCENTE") {
            ocorrencias = dados.filter(o => o.UsuarioCadastroID == userLogado.UsuarioID)
        }
        setOcorrenciasAbertas(ocorrencias.filter(o => o.Situacao.toUpperCase() == "ABERTO").length)
        setOcorrenciasEmAtendimento(ocorrencias.filter(o => o.Situacao.toUpperCase() == "EMATENDIMENTO").length)
        setOcorrenciasResolvidas(ocorrencias.filter(o => o.Situacao.toUpperCase() == "RESOLVIDO").length)
    }

    const validaUsuario = () => {
        return userLogado.TipoUsuario?.Nome.toUpperCase() == "ADMIN" || userLogado.TipoUsuario?.Nome.toUpperCase() == "SUPORTE"
    }

    return (
        <>
            <CSpinner hidden={!loading} />
            <h2>Painel de Ocorrências</h2>
            <div className={Style.divPainel}>
                {validaUsuario() ?
                    <CContainer>
                        <CRow>
                            <CCol sm={4}>
                                <CCard className="text-center">
                                    <CCardHeader>Ocorrências por Setor</CCardHeader>
                                    <CCardBody>
                                        <PieChart data={dadosPieSetor}></PieChart>
                                    </CCardBody>
                                </CCard>
                            </CCol>

                            <CCol sm={4}>
                                <CCard className="text-center">
                                    <CCardHeader>Ocorrências por Situação</CCardHeader>
                                    <CCardBody>
                                        <BarChart data={dadosBarSituacao}></BarChart>
                                    </CCardBody>
                                </CCard>
                            </CCol>

                            <CCol sm={4}>
                                <CCard className="text-center">
                                    <CCardHeader>Ocorrências por Tipo de Ocorrência</CCardHeader>
                                    <CCardBody>
                                        <PieChart data={dadosPieTipoOcorrencia}></PieChart>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </CContainer>
                    :
                    <CContainer>
                        <CRow>
                            <CCol sm={4}>
                                <CWidgetStatsB
                                    className={`mb-3 ${Style.cardOcorrencia}`}
                                    title="Ocorrências Abertas"
                                    value={ocorrenciasAbertas}
                                    onClick={() => { navigate("/ocorrencia/consultar") }}
                                />
                            </CCol>
                            <CCol sm={4}>
                                <CWidgetStatsB
                                    className={`mb-3 ${Style.cardOcorrencia}`}
                                    color="info"
                                    inverse
                                    title="Ocorrências Em Atendimento"
                                    value={ocorrenciasEmAtendimento}
                                    onClick={() => { navigate("/ocorrencia/consultar") }}
                                />
                            </CCol>
                            <CCol sm={4}>
                                <CWidgetStatsB
                                    className={`mb-3 ${Style.cardOcorrencia}`}
                                    color="primary"
                                    inverse
                                    title="Ocorrências Resolvidas"
                                    value={ocorrenciasResolvidas}
                                    onClick={() => { navigate("/ocorrencia/consultar") }}
                                />
                            </CCol>
                        </CRow>
                    </CContainer>
                }

            </div>
        </>
    )
}
export default OcorrenciaPainelPage;