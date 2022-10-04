import React, { useCallback, useState } from 'react'
import {
    CButton,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CPopover,
    CSpinner,
    CTable,
} from '@coreui/react'

import { useEffect } from 'react';
import Style from './ocorrencia-page.module.scss'
import { useToast } from '../../../features/toast';
import OcorrenciaService from '../../../services/ocorrencia-service/ocorrencia-service';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const OcorrenciaPage: React.FC<any> = (prop) => {
    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState<any[]>([]);
    const { addToast } = useToast();
    const navigate = useNavigate();

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
                    d.Acoes = <>
                    <CButton shape="rounded-pill" variant="ghost" color="info" size="sm" onClick={() => { }}>Editar</CButton>
                    <CPopover
                        trigger='click'
                        title="Exluir registro"
                        content={<> Tem certeza que deseja excluir esse registro?
                            <div className={Style.buttonConfirm}>
                                <CButton color='dark' size='sm' variant="outline" onClick={() => { fecharPopover(d.TipoUsuarioID) }} >Não</CButton> <CButton color='danger' size='sm' onClick={() =>{}}>Sim</CButton>
                            </div>
                        </>
                        }
                        placement="top"
                    >
                        <CButton shape="rounded-pill" variant="ghost" id={`excluir${d.TipoUsuarioID}`} color="danger" size="sm">Excluir</CButton>
                    </CPopover>
                </>;
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
        {
            key: 'Acoes',
            label: 'Ações',
            _props: { scope: 'col' },
        },
    ]

    return (
        <>
            <CSpinner hidden={!loading} />
            <h2>Ocorrencia</h2>
            <div className={Style.divButtonCadastar}>
                <CButton color="primary" variant="outline" onClick={() => { navigate('/ocorrencia/cadastrar')}}>Nova Ocorrência</CButton>
                <CInputGroup className={Style.filtroTabela}>
                    <CInputGroupText>Filtrar por:</CInputGroupText>
                    <CFormSelect color="primary" onClick={() => { }}>
                        <option value={1}>Todos os chamados</option>
                        <option value={1}>Meus chamados atribuidos</option>
                        <option value={2}>Meus chamados criados</option>
                        <option value={3}>Meu Setor</option>
                    </CFormSelect>
                </CInputGroup>
            </div>
            <CTable caption={`Total de registros ${dados.length}`} responsive columns={columns} items={dados} tableHeadProps={{ color: 'primary' }} color='secondary' hover bordered borderColor='dark' />

        </>
    )
}
export default OcorrenciaPage;