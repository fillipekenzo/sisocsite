import React, { useCallback, useState } from 'react'
import {
    CButton,
    CPopover,
    CSpinner,
    CTable,
} from '@coreui/react'

import { useEffect } from 'react';
import Style from './ocorrencia-page.module.scss'
import { useToast } from '../../../features/toast';
import OcorrenciaService from '../../../services/ocorrencia-service/ocorrencia-service';
import moment from 'moment';

const OcorrenciaPage: React.FC<any> = (prop) => {
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
                console.log(data);
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

    const fecharPopover = useCallback(
        async (id: number) => {
            document.getElementById(`excluir${id}`)?.click()
        }, []
    )

    const columns = [
        {
            key: 'OcorrenciaID',
            label: 'ID',
            _props: { scope: 'col' },
        },
        {
            key: 'Assunto',
            label: 'Assunto',
            _props: { scope: 'col' },
        },
        {
            key: 'UsuarioCadastroNome',
            label: 'Nome do Solicitante',
            _props: { scope: 'col' },
        },
        {
            key: 'Urgencia',
            label: 'Urgência',
            _props: { scope: 'col' },
        },
        {
            key: 'Situacao',
            label: 'Situação',
            _props: { scope: 'col' },
        },
        {
            key: 'DataHoraCadastro',
            label: 'Data Criação',
            _props: { scope: 'col' },
        },
    ]

    return (
        <>
            <CSpinner hidden={!loading} />
            <h2>Ocorrencia</h2>
            <div className={Style.divButtonCadastar}>
                <CButton color="primary" variant="outline" onClick={() => {  }}>Nova Ocorrência</CButton>
            </div>
            <CTable caption={`Total de registros ${dados.length}`} responsive columns={columns} items={dados} tableHeadProps={{ color: 'primary' }} color='secondary' hover bordered borderColor='dark' />

        </>
    )
}
export default OcorrenciaPage;