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
import moment from 'moment';
import OcorrenciaService from '../../../../services/ocorrencia-service/ocorrencia-service';
import { useToast } from '../../../../features/toast';
import { CChartLine } from '@coreui/react-chartjs';
import { cibFacebook, cilArrowBottom } from '@coreui/icons';
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
        console.log(prop.ocorrencia);
        setOcorrencia(prop.ocorrencia)
        carregarDados()
    }, [prop.visibleRelatorio])

    const carregarDados = async (): Promise<void> => {
        TipoOcorrenciaService.get()
            .then((response: any) => { setTipoOcorrencias(response.data) })
            .finally(() => {
                let tipo = tipoOcorrencias.find(t=>t.TipoOcorrenciaID == ocorrencia?.TipoOcorrenciaID)
                console.log(tipo);
                
            })

        SetorService.get()
            .then((response: any) => { setSetores(response.data) })
            .finally(() =>{

            })
    };
    return (
        <>
            <div className={Style.header}>
                <h2 className={Style.titulo} >#<b>{ocorrencia?.OcorrenciaID} - {ocorrencia?.Assunto}</b> </h2>
                <p className={Style.subtitulo}>Por: {ocorrencia?.UsuarioCadastroNavigation?.Nome} - Data Criação: {moment(new Date(ocorrencia?.DataHoraCadastro)).format('DD/MM/YYYY HH:mm:SS')}  </p>
            </div>
            <div>
                <b>Tipo Ocorrência:</b><p> {}</p>
            </div>
        </>
    )
}
export default OcorrenciaRelatorioPage;