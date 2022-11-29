import React, { useCallback, useMemo, useState } from 'react'
import {
    CButton,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CPopover,
    CSpinner,
    CTable,
    CTooltip,
} from '@coreui/react'

import { useEffect } from 'react';
import Style from './ocorrencia-page.module.scss'
import { useToast } from '../../../features/toast';
import OcorrenciaService from '../../../services/ocorrencia-service/ocorrencia-service';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';

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
                console.log(data);

                data.data.map((d: any) => {
                    d.AssuntoDescricao = { Assunto: d.Assunto, Descricao: d.Descricao };
                    d.UsuarioCadastroNome = d.UsuarioCadastro.Nome
                    d.SetorNome = d.Setor.Nome
                    d.DataHoraCadastro = moment(new Date(d.DataHoraCadastro)).format('DD/MM/YYYY HH:mm:SS')
                    d.Acoes = <>
                        <CButton shape="rounded-pill" variant="ghost" color="info" size="sm" onClick={() => { }}>Editar</CButton>
                        <CPopover
                            trigger='click'
                            title="Exluir registro"
                            content={<> Tem certeza que deseja excluir esse registro?
                                <div className={Style.buttonConfirm}>
                                    <CButton color='dark' size='sm' variant="outline" onClick={() => { fecharPopover(d.TipoUsuarioID) }} >Não</CButton> <CButton color='danger' size='sm' onClick={() => { }}>Sim</CButton>
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

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'OcorrenciaID',
                header: 'ID',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 40
            },
            {
                accessorKey: 'Assunto',
                header: 'Assunto',

                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 20,
                Cell: ({ cell }) => {
                    return (
                        <>
                            <CTooltip
                                content={'Descrição: ' + cell.row.original.AssuntoDescricao.Descricao}
                                placement="top"
                            >
                                <span>{cell.row.original.AssuntoDescricao.Assunto}</span>
                            </CTooltip>
                        </>
                    )
                }

            },
            {
                accessorKey: 'UsuarioCadastroNome',
                header: 'Nome do Solicitante',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 20
            },
            {
                accessorKey: 'Urgencia',
                header: 'Urgencia',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 20
            },
            {
                accessorKey: 'Situacao',
                header: 'Situacao',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 20
            },
            {
                accessorKey: 'SetorNome',
                header: 'Setor',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 20
            },
            {
                accessorKey: 'DataHoraCadastro',
                header: 'Data Criação',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 20
            },
        ],
        [],);

    return (
        <>
            <CSpinner hidden={!loading} />
            <h2>Ocorrencia</h2>
            <div className={Style.divButtonCadastar}>
                <CButton color="primary" variant="outline" onClick={() => { navigate('/ocorrencia/cadastrar') }}>Nova Ocorrência</CButton>
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
            <MaterialReactTable
                initialState={{
                    density:'compact'
                }}
                autoResetAll={true}
                columns={columns}
                data={dados}
                enableColumnActions={false}
                localization={MRT_Localization_PT_BR}
                muiTableBodyRowProps={({ row }) => ({
                    onClick: (event) => {
                        navigate(`/ocorrencia/visualizar/${row._valuesCache.OcorrenciaID}`)
                        console.log(row._valuesCache.OcorrenciaID);
                    },
                    sx: {
                        cursor: 'pointer',
                    },
                })}
            />
        </>
    )
}
export default OcorrenciaPage;