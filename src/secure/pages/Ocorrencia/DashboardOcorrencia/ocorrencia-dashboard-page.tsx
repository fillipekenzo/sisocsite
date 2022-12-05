import React, { useCallback, useState } from 'react'
import {
    CButton,
    CCol,
    CPopover,
    CRow,
    CSpinner,
    CTable,
    CWidgetStatsA,
    CWidgetStatsD,
} from '@coreui/react'

import { useEffect } from 'react';
import Style from './ocorrencia-dashboard-page.module.scss'
import moment from 'moment';
import OcorrenciaService from '../../../../services/ocorrencia-service/ocorrencia-service';
import { useToast } from '../../../../features/toast';
import { CChartLine } from '@coreui/react-chartjs';
import { cibFacebook, cilArrowBottom } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const OcorrenciaDashboardPage: React.FC<any> = (prop) => {
    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState<any[]>([]);
    const { addToast } = useToast();

    useEffect(() => {
        carregarDados();
    }, [])

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
                setLoading(false)
            })
    };

    return (
        <>
            <CSpinner hidden={!loading} />
            <h2>Ocorrencia</h2>
            <CRow>
                <CCol sm={6}>
                    <CWidgetStatsA
                        id='1'
                        className="mb-4"
                        color="primary"
                        value={
                            <>
                                $9.000{' '}
                                <span className="fs-6 fw-normal">
                                    (40.9%)
                                </span>
                            </>
                        }
                        title="Widget title"
                        chart={
                            <CChartLine
                                id='char'
                                type='line'
                                className="mt-3 mx-3"
                                style={{ height: '70px' }}
                                data={{
                                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                    datasets: [
                                        {
                                            label: 'My First dataset',
                                            backgroundColor: 'transparent',
                                            borderColor: 'rgba(255,255,255,.55)',
                                            pointBackgroundColor: '#321fdb',
                                            data: [65, 59, 84, 84, 51, 55, 40],
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                    maintainAspectRatio: false,
                                    scales: {
                                        x: {
                                            grid: {
                                                display: false,
                                                drawBorder: false,
                                            },
                                            ticks: {
                                                display: false,
                                            },
                                        },
                                        y: {
                                            min: 30,
                                            max: 89,
                                            display: false,
                                            grid: {
                                                display: false,
                                            },
                                            ticks: {
                                                display: false,
                                            },
                                        },
                                    },
                                    elements: {
                                        line: {
                                            borderWidth: 1,
                                            tension: 0.4,
                                        },
                                        point: {
                                            radius: 4,
                                            hitRadius: 10,
                                            hoverRadius: 4,
                                        },
                                    },
                                }}
                            />
                        }
                    />
                </CCol>
            </CRow>
        </>
    )
}
export default OcorrenciaDashboardPage;