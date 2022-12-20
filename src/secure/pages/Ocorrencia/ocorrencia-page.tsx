import React, { useCallback, useMemo, useState } from 'react'
import {
    CButton,
    CCol,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CPopover,
    CRow,
    CSpinner,
    CTable,
    CTooltip,
} from '@coreui/react'

import { useEffect } from 'react';
import Style from './ocorrencia-page.module.scss'
import { useToast } from '../../../features/toast';
import OcorrenciaService from '../../../services/ocorrencia-service/ocorrencia-service';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import EnumeradorService from '../../../services/enumerador-service/enumerador-service';

const OcorrenciaPage: React.FC<any> = (prop) => {
    const [loading, setLoading] = useState(false);
    const [urgenciaENUM, setUrgenciaENUM] = useState<any[]>([]);
    const [situacaoENUM, setSituacaoENUM] = useState<any[]>([]);
    const [dados, setDados] = useState<any[]>([]);
    const [filtroOcorrencia, setFiltroOcorrencia] = useState<any[]>();
    const { addToast } = useToast();
    const userLogado = JSON.parse(localStorage.getItem('@Sisoc:user') || '');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let string = location.pathname.substring(1);
        let finalDaPalavra = string.search('/') != -1 ? string.search('/') : string.length;

        verificarPermissao(string.substring(0, finalDaPalavra).toUpperCase());
    }, [])

    const verificarPermissao = (route: any) => {
        if (route.length != 0) {
            let menus: any[] = JSON.parse(localStorage.getItem('@Sisoc:menus') || '[]');
            if (menus.length > 0) {
                let menu: any = menus.find(m => m.NavegarURL.trim().toLowerCase().replace(' ', '').includes(route.trim().replace(' ', '').toLowerCase()));

                if (menu == null) {
                    navigate('/error', { state: { mensagem: `Usuário não possui permissão ao módulo - ${route}.` } })
                }
            }
            else if (location.pathname !== '/error') {
                navigate('/error', { state: { mensagem: `Usuário não possui permissão ao módulo - ${route}.` } })
            }
        }

    };
    useEffect(() => {
        carregarDados();
        carregarFiltros();
    }, [])

    const carregarFiltros = () => {
        var filtroAux;
        if (userLogado.TipoUsuario?.Nome.toUpperCase() == "ADMIN" || userLogado.TipoUsuario?.Nome.toUpperCase() == "SUPORTE") {
            filtroAux = [
                { Value: 1, Texto: "Todas as Ocorrências" },
                { Value: 2, Texto: "Ocorrências atribuidas" },
                { Value: 3, Texto: "Ocorrências criadas" },
                { Value: 4, Texto: "Ocorrências atribuidas abertas" },
                { Value: 5, Texto: "Ocorrências criadas abertas" },
                { Value: 6, Texto: "Ocorrências do Setor" },
            ]
        }
        else if (userLogado.TipoUsuario?.Nome.toUpperCase() == "ATENDIMENTO") {
            filtroAux = [
                { Value: 2, Texto: "Ocorrências atribuidas" },
                { Value: 3, Texto: "Ocorrências criadas" },
                { Value: 4, Texto: "Ocorrências atribuidas abertas" },
                { Value: 5, Texto: "Ocorrências criadas abertas" },
                { Value: 6, Texto: "Ocorrências do Setor" },
            ]
        }
        else {
            filtroAux = [
                { Value: 3, Texto: "Ocorrências criadas" },
                { Value: 5, Texto: "Ocorrências criadas abertas" },
            ]
        }
        setFiltroOcorrencia(filtroAux)
    }

    const carregarDados = () => {
        if (userLogado.TipoUsuario?.Nome.toUpperCase() == "ADMIN" || userLogado.TipoUsuario?.Nome.toUpperCase() == "SUPORTE") {
            filtrarOcorrencias(1)
        }
        else if (userLogado.TipoUsuario?.Nome.toUpperCase() == "ATENDIMENTO") {
            filtrarOcorrencias(6)
        }
        else {
            filtrarOcorrencias(3)
        }
    };

    const fecharPopover = useCallback(
        async (id: number) => {
            document.getElementById(`excluir${id}`)?.click()
        }, []
    )

    const retornaCorLinha = (value: any) => {
        if (value == "EmAtendimento")
            return "#39f"
        else if (value == "Resolvido")
            return "#2b9f3f"
    }

    const filtrarOcorrencias = (value: any) => {
        var filtroOcorrencia: any = {
            SituacaoENUM: "",
            SetorID: 0,
            UsuarioAtribuidoID: 0,
            UsuarioCadastroID: 0
        };
        if (value == 2) {
            filtroOcorrencia.UsuarioAtribuidoID = userLogado.UsuarioID
        }
        else if (value == 3) {
            filtroOcorrencia.UsuarioCadastroID = userLogado.UsuarioID
        }
        else if (value == 4) {
            filtroOcorrencia.UsuarioAtribuidoID = userLogado.UsuarioID
            filtroOcorrencia.SituacaoENUM = "Aberto"
        }
        else if (value == 5) {
            filtroOcorrencia.UsuarioCadastroID = userLogado.UsuarioID
            filtroOcorrencia.SituacaoENUM = "Aberto"
        }
        else if (value == 6) {
            filtroOcorrencia.SetorID = userLogado.Setor.SetorID
        }
        setLoading(true)
        OcorrenciaService.postComFiltro(filtroOcorrencia)
            .then((res) => {
                res.data.map((d: any) => {
                    d.AssuntoDescricao = { Assunto: d.Assunto, Descricao: d.Descricao };
                    d.UsuarioAtribuidoNome = d.UsuarioAtribuido == null ? "" : d.UsuarioAtribuido.Nome
                    d.UsuarioCadastroNome = d.UsuarioCadastro == null ? "" : d.UsuarioCadastro.Nome
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
                setDados(res.data);
            })
            .finally(() => {
                setLoading(false)
            })
    }

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
                                content={<><span className={Style.tooltipText}>Descrição: {cell.row.original.AssuntoDescricao.Descricao}</span></>}
                                placement="top"
                            >
                                <span>{cell.row.original.AssuntoDescricao.Assunto}</span>
                            </CTooltip>
                        </>
                    )
                }
            },
            {
                accessorKey: 'UsuarioAtribuidoNome',
                header: 'Atribuido a',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 20
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
                header: 'Urgência',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 20
            },
            {
                accessorKey: 'SituacaoTexto',
                header: 'Situação',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 20,
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
            <h2>Listagem de Ocorrências</h2>
            <div className={Style.divButtonCadastar}>
                <CRow className={Style.rowOcorrencia}>
                    <CCol sm="auto">
                        <CButton color="primary" variant="outline" onClick={() => { navigate('/ocorrencia/cadastrar') }}>Nova Ocorrência</CButton>
                    </CCol>
                    <CCol sm="auto">
                        <CDropdown className={Style.legendaDropDown}>
                            <CDropdownToggle color="secondary">Legenda</CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem disabled><div className={Style.legendaDiv}><span>Aberto</span> <div className={Style.legendaAberto}></div></div></CDropdownItem>
                                <CDropdownItem disabled><div className={Style.legendaDiv}><span>Em Atendimento</span> <div className={Style.legendaEmAtendimento}></div></div></CDropdownItem>
                                <CDropdownItem disabled><div className={Style.legendaDiv}><span>Resolvido</span> <div className={Style.legendaResolvido}></div></div></CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </CCol>
                </CRow>
                <CInputGroup className={Style.filtroTabela}>
                    <CInputGroupText>Filtrar por:</CInputGroupText>
                    <CFormSelect className={Style.filtroDropdown} color="primary" onChange={(e) => {
                        filtrarOcorrencias(e.target.value)
                    }}>
                        {filtroOcorrencia?.map(f => {
                            return (
                                <>
                                    <option value={f.Value}>{f.Texto}</option>
                                </>
                            )
                        })}
                    </CFormSelect>
                </CInputGroup>
            </div>
            <MaterialReactTable
                initialState={{
                    density: 'compact'
                }}
                autoResetAll={true}
                columns={columns}
                data={dados}
                enableColumnActions={false}
                localization={MRT_Localization_PT_BR}
                muiTableBodyRowProps={({ row }) => ({
                    style: { backgroundColor: retornaCorLinha(row.original.Situacao) },
                    onClick: (event) => {
                        navigate(`/ocorrencia/visualizar/${row._valuesCache.OcorrenciaID}`,{state:"/ocorrencia/consultar"})
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