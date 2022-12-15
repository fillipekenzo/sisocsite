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
    CWidgetStatsD,
} from '@coreui/react'

import { useEffect } from 'react';
import Style from './ocorrencia-painel-page.module.scss'
import moment from 'moment';
import OcorrenciaService from '../../../../services/ocorrencia-service/ocorrencia-service';
import { useToast } from '../../../../features/toast';
import { CChartLine } from '@coreui/react-chartjs';
import { cibFacebook, cilArrowBottom } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import LineChart from '../../../components/charts/Line/line-chart-component';
import PieChart from '../../../components/charts/Pie/pie-chart-component';
import SetorService from '../../../../services/setor-service/setor-service';

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
let i = 0;
let j = 100;
export const data1 = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => i++),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => j--),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
        },
    ],
};

const OcorrenciaPainelPage: React.FC<any> = (prop) => {
    const [loading, setLoading] = useState(false);
    const [carregarDadosPie, setcarregarDadosPie] = useState(false);
    const [dados, setDados] = useState<any[]>([]);
    const [setor, setSetor] = useState<any[]>([]);
    const { addToast } = useToast();
    const [dadosPie, setDadosPie] = useState<any>(data);

    useEffect(() => {
        carregarDados()
    }, [])

    useEffect(() => {
        if (carregarDadosPie == true) {
            console.log(carregarDadosPie);
            formatarDadosPie()
        }
    }, [carregarDadosPie])

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
                        setcarregarDadosPie(true)
                    })
                setLoading(false)
            })

    };

    const formatarDadosPie = () => {
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

        console.log(setor);
        console.log(dados);
        console.log(dataformat);
        console.log(setorString);

        let dataTeste = {
            labels: setorString,
            datasets: dataSet
        }
        setDadosPie(dataTeste);
    }

    return (
        <>
            <CSpinner hidden={!loading} />
            <h2>Painel de Ocorrências</h2>
            <CContainer>
                <CRow>
                    <CCol sm={6}>
                        <CCard className="text-center">
                            <CCardHeader>Ocorrências por Setor</CCardHeader>
                            <CCardBody>
                                <PieChart data={dadosPie}></PieChart>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    {/* <CCol sm={6}>
                        <CCard className="text-center">
                            <CCardHeader>Ocorrências por Situação</CCardHeader>
                            <CCardBody>
                                <LineChart data={data1}></LineChart>
                            </CCardBody>
                        </CCard>
                    </CCol> */}
                </CRow>
            </CContainer>

        </>
    )
}
export default OcorrenciaPainelPage;