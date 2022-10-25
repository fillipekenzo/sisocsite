import React, { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    CButton,
    CFormCheck,
    CFormSelect,
    CPopover,
    CSpinner,
    CTable,
} from '@coreui/react'

import { useEffect } from 'react';
import Style from './permissao-page.module.scss'
import { useToast } from '../../../features/toast';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import PermissaoService from '../../../services/permissao-service.ts/permissao-service';
import MenuService from '../../../services/menu-service/menu-service';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const PermissaoPage: React.FC<any> = (prop) => {
    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState<any[]>([]);
    const [menus, setMenus] = useState<any[]>([]);
    const [menuID, setMenuID] = useState<number>(0);
    const { addToast } = useToast();

    useEffect(() => {
        carregarDados();
    }, [])

    const initialForm = {
        MenuID: 0
    };

    const carregarDados = async (): Promise<void> => {
        setLoading(true)
        MenuService.get()
            .then((data) => {
                setMenus(data.data);
            })
            .finally(() => {
                setLoading(false)
            })

    };

    const selecionarMenu = async (id: number) => {
        setMenuID(id)
        setLoading(true);
        PermissaoService.getByMenuID(id)
            .then((data) => {
                console.log(data.data);
                
                data.data.map((d: any) => {
                    d.TipoUsuarioString = d.TipoUsuarioNavigation.Nome;
                    d.PossuiMenuString = d.PossuiMenu ? 'Sim' : 'Não';
                    d.ConsultarCheck = <><CFormCheck type="checkbox" id="gridCheck" checked={d.Consultar} onChange={(e: any) => { onNativeChange(e, d.TipoUsuarioID, "Consultar") }}/></>;
                    d.CadastrarCheck = <><CFormCheck type="checkbox" id="gridCheck" checked={d.Cadastrar}/></>;
                    d.EditarCheck = <><CFormCheck type="checkbox" id="gridCheck" checked={d.Editar}/></>;
                    d.ExcluirCheck = <><CFormCheck type="checkbox" id="gridCheck" checked={d.Excluir}/></>;
                    d.TodosCheck = <><CFormCheck type="checkbox" id="gridCheck" checked={d.Consultar}/></>;
                })
                console.log(data.data);
                setDados(data.data);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const onNativeChange = async (e: any, perfilid: number, acao: any) => {
        let permissaoResponse: any = null;
        setLoading(true);
        PermissaoService.getByMenuID(menuID)
            .then(response => {
                console.log(response);
                
                if (response.data)
                    permissaoResponse = response.data;
            })
            .finally(() => {

                if (permissaoResponse != null) {
                    if (e.target.checked) {
                        if (acao == 'Consultar')
                            permissaoResponse.consultar = true;
                        if (acao == 'Cadastrar')
                            permissaoResponse.cadastrar = true;
                        if (acao == 'Editar')
                            permissaoResponse.editar = true;
                        if (acao == 'Excluir')
                            permissaoResponse.excluir = true;
                        if (acao == 'Todos') {
                            permissaoResponse.consultar = true;
                            permissaoResponse.cadastrar = true;
                            permissaoResponse.editar = true;
                            permissaoResponse.excluir = true;
                        }
                    }
                    else {
                        if (acao == 'Consultar')
                            permissaoResponse.consultar = false;
                        if (acao == 'Cadastrar')
                            permissaoResponse.cadastrar = false;
                        if (acao == 'Editar')
                            permissaoResponse.editar = false;
                        if (acao == 'Excluir')
                            permissaoResponse.excluir = false;
                        if (acao == 'Todos') {
                            permissaoResponse.consultar = false;
                            permissaoResponse.cadastrar = false;
                            permissaoResponse.editar = false;
                            permissaoResponse.excluir = false;
                        }
                    }

                    PermissaoService.put(permissaoResponse)
                        .finally(() => {
                            carregarPermissoesMenu();
                            setLoading(false)

                            // MenuService.getPorPerfil(sessionStorage.getItem('grupoID')).then((response) => {
                            //     sessionStorage.setItem('modulos', JSON.stringify(response.data));
                            // })
                        })
                        .then((data) => {

                        });
                }
            })

    }

    const carregarPermissoesMenu = async (): Promise<void> => {
        setLoading(true)
        PermissaoService.getByID(menuID)
            .then((data) => {
                data.data.map((d: any) => {
                    d.TipoUsuarioString = d.TipoUsuarioNavigation.Nome;
                    d.PossuiMenuString = d.PossuiMenu ? 'Sim' : 'Não';
                    d.Acoes = <>
                        <CButton shape="rounded-pill" variant="ghost" color="primary" size="sm"  >Adicionar Submenu</CButton>
                    </>;
                })
                setDados(data.data);
            })
            .finally(() => {
                setLoading(false)
            })

    };

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'TipoUsuarioString',
                header: 'TipoUsuario',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 40
            },
            {
                accessorKey: 'ConsultarCheck',
                header: 'Consultar',

                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 20
            },

            {
                accessorKey: 'CadastrarCheck',
                header: 'Cadastrar',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 20
            },
            {
                accessorKey: 'EditarCheck',
                header: 'Editar',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 20
            },

            {
                accessorKey: 'ExcluirCheck',
                header: 'Excluir',
                muiTableHeadCellProps: {
                    align: 'center',
                },
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 20
            },
            {
                accessorKey: 'TodosCheck',
                header: 'Todos',
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
            <h2>Permissão</h2>
            <div className={Style.container}>
                <fieldset className={Style.fieldsetConsulta}>

                    <label htmlFor="MenuID" className="form-label" >Menu</label>
                    <select className='form-select' name="MenuID" onChange={(event) => { selecionarMenu(parseInt(event.target.value));
                     }}>
                        <option value='' disabled>Selecione</option>
                        {menus.map(s => {
                            return (
                                <option value={s.MenuID}>{s.Nome}</option>
                            )
                        })}
                    </select >
                </fieldset>
            </div>
            <MaterialReactTable
                columns={columns}
                data={dados}
                enableColumnActions={false}
                enableColumnFilters={false}
                enableSorting={false}
                enableBottomToolbar={false}
                enableTopToolbar={false}
                localization={MRT_Localization_PT_BR}
            />
        </>
    )
}
export default PermissaoPage;