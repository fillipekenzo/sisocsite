import React, { useCallback, useMemo, useState } from 'react'
import {
    CButton,
    CPopover,
    CSpinner,
    CTable,
} from '@coreui/react'

import { useEffect } from 'react';
import Style from './usuario-page.module.scss'
import { useToast } from '../../../features/toast';
import UsuarioCadastroModal from './ModalCadastroUsuario/usuario-cadastro-modal';
import UsuarioEdicaoModal from './ModalEdicaoUsuario/usuario-edicao-modal';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import UsuarioService from '../../../services/usuario-service/usuario-service';

const UsuarioPage: React.FC<any> = (prop) => {
    const [visibleCadastrar, setVisibleCadastrar] = useState(false);
    const [visibleEditar, setVisibleEditar] = useState(false);
    const [modelEditar, setModelEditar] = useState();
    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState<any[]>([]);
    const { addToast } = useToast();
    const userLogado = JSON.parse(localStorage.getItem('@Sisoc:user') || '');

    useEffect(() => {
        carregarDados();
    }, [])

    useEffect(() => {
        carregarDados();
    }, [visibleEditar, visibleCadastrar])

    const carregarDados = async (): Promise<void> => {
        setLoading(true)
        UsuarioService.get()
            .then((data) => {
                data.data.map((d: any) => {
                    d.Setor = d.SetorNavigation?.Sigla
                    d.TipoUsuario = d.TipoUsuarioNavigation?.Nome
                    d.Acoes = <>
                        <CButton shape="rounded-pill" variant="ghost" color="info" size="sm" onClick={() => { setModelEditar(d), setVisibleEditar(true) }}>Editar</CButton>
                        <CPopover
                            trigger='click'
                            title="Exluir registro"
                            content={<> Tem certeza que deseja excluir esse registro?
                                <div className={Style.buttonConfirm}>
                                    <CButton color='dark' size='sm' variant="outline" onClick={() => { fecharPopover(d.UsuarioID) }} >Não</CButton> <CButton color='danger' size='sm' onClick={() => excluirRegistro(d.UsuarioID)}>Sim</CButton>
                                </div>
                            </>
                            }
                            placement="top"
                        >
                            <CButton hidden={!ehUsuarioADM()} shape="rounded-pill" variant="ghost" id={`excluir${d.UsuarioID}`} color="danger" size="sm">Excluir</CButton>
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

    const ehUsuarioADM = () => {
        return userLogado.TipoUsuario?.Nome.toUpperCase() == "ADMIN"
    }

    const excluirRegistro = useCallback(
        async (id: number) => {
            try {
                if (ehUsuarioADM()) {
                    setLoading(true)
                    UsuarioService.delete(id)
                        .then((data) => {
                            if (data.success) {
                                addToast({
                                    title: 'Sucesso',
                                    description: 'Registro excluído com sucesso!',
                                    type: 'success',
                                });
                            }
                        }).finally(() => {
                            carregarDados();
                            fecharPopover(id)
                            setLoading(false)
                        })
                        .catch((ex: any) => {
                            if (ex.response != undefined && ex.response.data.error?.length > 0) {
                                ex.response.data.error?.map((a: any) => {
                                    addToast({
                                        title: 'Erro',
                                        description: a,
                                        type: 'error',
                                    });
                                })
                            }
                            else {
                                addToast({
                                    title: 'Erro',
                                    description: 'Erro na conexão com servidor',
                                    type: 'error',
                                });
                            }
                        })
                }
                else {
                    addToast({
                        title: 'Erro',
                        description: "Você não tem permissão para realizar a exclusão",
                        type: 'error',
                    });
                }
            } catch (ex: any) {
                addToast({
                    title: 'Erro',
                    description: ex.response.data.error,
                    type: 'error',
                });
            }
        },
        [dados, addToast]
    );

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'UsuarioID',
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
                accessorKey: 'Nome',
                header: 'Nome',

                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 20
            },
            {
                accessorKey: 'Email',
                header: 'E-mail',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 20
            },
            {
                accessorKey: 'RA_SIAPE',
                header: 'RA/SIAPE',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 20
            },
            {
                accessorKey: 'TipoUsuario',
                header: 'Tipo Usuário',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 20
            },
            {
                accessorKey: 'Setor',
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
                accessorKey: 'Acoes',
                header: 'Ações',
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
            <UsuarioCadastroModal setVisivelFalse={() => setVisibleCadastrar(false)} visivel={visibleCadastrar} />
            <UsuarioEdicaoModal model={modelEditar} setVisivelFalse={() => setVisibleEditar(false)} visivel={visibleEditar} />
            <CSpinner hidden={!loading} />
            <h2>Usuário</h2>
            <div className={Style.divButtonCadastar}>
                <CButton color="primary" variant="outline" onClick={() => { setVisibleCadastrar(true) }}>Cadastrar</CButton>
            </div>
            <MaterialReactTable
                autoResetAll={true}
                columns={columns}
                data={dados}
                enableColumnActions={false}
                localization={MRT_Localization_PT_BR}
            />
        </>
    )
}
export default UsuarioPage;