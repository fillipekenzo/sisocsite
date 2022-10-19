import React, { useCallback, useMemo, useState } from 'react'
import {
    CButton,
    CPopover,
    CSpinner,
} from '@coreui/react'

import { useEffect } from 'react';
import Style from './menu-page.module.scss'
import { useToast } from '../../../features/toast';
import MenuService from '../../../services/menu-service/menu-service';
import MenuCadastroModal from './ModalCadastroMenu/menu-cadastro-modal';
import MenuEdicaoModal from './ModalEdicaoMenu/menu-edicao-modal';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import SubmenuCadastroModal from './ModalCadastroSubmenu/submenu-cadastro-modal';
import SubmenuService from '../../../services/submenu-service/submenu-service';
import SubmenuEdicaoModal from './ModalEdicaoSubmenu/submenu-edicao-modal';

const MenuPage: React.FC<any> = (prop) => {
    
    const [visibleCadastrar, setVisibleCadastrar] = useState(false);
    const [visibleEditar, setVisibleEditar] = useState(false);
    const [modelEditar, setModelEditar] = useState();

    const [visibleCadastrarSubmenu, setVisibleCadastrarSubmenu] = useState(false);
    const [visibleEditarSubmenu, setVisibleEditarSubmenu] = useState(false);
    const [modelEditarSubmenu, setModelEditarSubmenu] = useState();
    const [menuID, setMenuID] = useState(null);

    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState<any[]>([]);
    const { addToast } = useToast();

    useEffect(() => {
        carregarDados();
    }, [])

    useEffect(() => {
        carregarDados();
    }, [visibleEditar, visibleCadastrar])

    useEffect(() => {
        carregarDados();
    }, [visibleEditarSubmenu, visibleCadastrarSubmenu])

    const carregarDados = async (): Promise<void> => {
        setLoading(true)
        MenuService.get()
            .then((data) => {
                console.log(data);
                data.data.map((d: any) => {
                    d.AtivoString = d.Ativo ? 'Sim' : 'Não';
                    d.PossuiMenuString = d.PossuiMenu ? 'Sim' : 'Não';
                    d.Acoes = <>
                        <CButton shape="rounded-pill" variant="ghost" color="info" size="sm" onClick={() => { setModelEditar(d), setVisibleEditar(true) }}>Editar</CButton>
                        <CPopover
                            trigger='click'
                            title="Exluir registro"
                            content={<> Tem certeza que deseja excluir esse registro?
                                <div className={Style.buttonConfirm}>
                                    <CButton color='dark' size='sm' variant="outline" onClick={() => { fecharPopover(d.MenuID) }} >Não</CButton> <CButton color='danger' size='sm' onClick={() => excluirRegistro(d.MenuID)}>Sim</CButton>
                                </div>
                            </>
                            }
                            placement="top"
                        >
                            <CButton shape="rounded-pill" variant="ghost" id={`excluir${d.MenuID}`} color="danger" size="sm">Excluir</CButton>
                        </CPopover>
                        <CButton shape="rounded-pill" variant="ghost" color="primary" size="sm"  onClick={() => { setMenuID(d.MenuID), setVisibleCadastrarSubmenu(true) }}>Adicionar Submenu</CButton>
                    </>;
                    d.Submenus.map((sm: any) => {
                        sm.AtivoString = sm.Ativo ? 'Sim' : 'Não';
                        sm.Acoes = <>
                            <CButton shape="rounded-pill" variant="ghost" color="info" size="sm" onClick={() => { setModelEditarSubmenu(sm), setVisibleEditarSubmenu(true) }}>Editar</CButton>
                            <CPopover
                                trigger='click'
                                title="Exluir registro"
                                content={<> Tem certeza que deseja excluir esse registro?
                                    <div className={Style.buttonConfirm}>
                                        <CButton color='dark' size='sm' variant="outline" onClick={() => { fecharPopover(sm.SubmenuID) }} >Não</CButton> <CButton color='danger' size='sm' onClick={() => excluirRegistroSubmenu(sm.SubmenuID)}>Sim</CButton>
                                    </div>
                                </>
                                }
                                placement="top"
                            >
                                <CButton shape="rounded-pill" variant="ghost" id={`excluir${sm.SubmenuID}`} color="danger" size="sm">Excluir</CButton>
                            </CPopover>
                        </>;
                    })
                    
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

    const excluirRegistroSubmenu = useCallback(
        async (id: number) => {
            try {
                setLoading(true)
                SubmenuService.delete(id)
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

    const excluirRegistro = useCallback(
        async (id: number) => {
            try {
                setLoading(true)
                MenuService.delete(id)
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
        //column definitions...
        () => [
            {
                accessorKey: 'MenuID',
                header: 'ID',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 10
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
                size: 30
            },

            {
                accessorKey: 'AtivoString',
                header: 'Ativo',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 10
            },
            {
                accessorKey: 'Ordem',
                header: 'Ordem',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 10
            },

            {
                accessorKey: 'PossuiMenuString',
                header: 'Possui Menu',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 10
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
                size: 40
            },
        ],
        [],);

    return (
        <>
            <MenuCadastroModal setVisivelFalse={() => setVisibleCadastrar(false)} visivel={visibleCadastrar} />
            <MenuEdicaoModal model={modelEditar} setVisivelFalse={() => setVisibleEditar(false)} visivel={visibleEditar} />
            <SubmenuCadastroModal menuID={menuID} setVisivelFalse={() => setVisibleCadastrarSubmenu(false)} visivel={visibleCadastrarSubmenu} />
            <SubmenuEdicaoModal model={modelEditarSubmenu} setVisivelFalse={() => setVisibleEditarSubmenu(false)} visivel={visibleEditarSubmenu} />
            <CSpinner hidden={!loading} />
            <h2>Menu</h2>
            <div className={Style.divButtonCadastar}>
                <CButton color="primary" variant="outline" onClick={() => { setVisibleCadastrar(true) }}>Cadastrar</CButton>
            </div>
            <MaterialReactTable
                columns={columns}
                data={dados}
                enableColumnActions={false}
                enableColumnFilters={false}
                enableExpanding
                localization={MRT_Localization_PT_BR}
                getSubRows={(originalRow, index) => originalRow.Submenus} //default, can customize
            />

        </>
    )
}
export default MenuPage;