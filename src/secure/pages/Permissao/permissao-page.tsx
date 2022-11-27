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
        setLoading(true);
        PermissaoService.getByMenuID(id)
            .then((data) => {
                console.log(data.data);
                data.data.map((d: any) => {
                    d.TipoUsuarioString = d.TipoUsuarioNavigation.Nome;
                    d.PossuiMenuString = d.PossuiMenu ? 'Sim' : 'Não';
                    d.ConsultarCheck = <><CFormCheck type="checkbox" id="gridCheck" defaultChecked={d.Consultar} onChange={(e: any) => { onNativeChange(e, d, "Consultar") }} /></>;
                    d.CadastrarCheck = <><CFormCheck type="checkbox" id="gridCheck" defaultChecked={d.Cadastrar} onChange={(e: any) => { onNativeChange(e, d, "Cadastrar") }} /></>;
                    d.EditarCheck = <><CFormCheck type="checkbox" id="gridCheck" defaultChecked={d.Editar} onChange={(e: any) => { onNativeChange(e, d, "Editar") }}  /></>;
                    d.ExcluirCheck = <><CFormCheck type="checkbox" id="gridCheck" defaultChecked={d.Excluir} onChange={(e: any) => { onNativeChange(e, d, "Excluir") }}  /></>;
                    d.TodosCheck = <><CFormCheck type="checkbox" id="gridCheck" defaultChecked={d.Consultar && d.Cadastrar && d.Editar && d.Excluir} onChange={(e: any) => { onNativeChange(e, d, "Todos") }}  /></>;
                })

                setDados(data.data);
            })
            .finally(() => {
                setMenuID(id)
                setLoading(false)
            })
    }

    const onNativeChange = async (e: any, permissao: any, acao: any) => {
        let permissaoResponse: any = null;
        console.log(e);
        console.log(acao);
        console.log(permissao);

        setLoading(true);
        PermissaoService.getByMenuIDTipoUsuarioID(permissao.MenuID, permissao.TipoUsuarioID)
            .then(response => {
                console.log(response);

                if (response.data)
                    permissaoResponse = response.data;
            })
            .finally(() => {

                if (permissaoResponse != null) {
                    if (e.target.checked) {
                        if (acao == 'Consultar')
                            permissaoResponse.Consultar = true;
                        if (acao == 'Cadastrar')
                            permissaoResponse.Cadastrar = true;
                        if (acao == 'Editar')
                            permissaoResponse.Editar = true;
                        if (acao == 'Excluir')
                            permissaoResponse.Excluir = true;
                        if (acao == 'Todos') {
                            permissaoResponse.Consultar = true;
                            permissaoResponse.Cadastrar = true;
                            permissaoResponse.Editar = true;
                            permissaoResponse.Excluir = true;
                        }
                    }
                    else {
                        if (acao == 'Consultar')
                            permissaoResponse.Consultar = false;
                        if (acao == 'Cadastrar')
                            permissaoResponse.Cadastrar = false;
                        if (acao == 'Editar')
                            permissaoResponse.Editar = false;
                        if (acao == 'Excluir')
                            permissaoResponse.Excluir = false;
                        if (acao == 'Todos') {
                            permissaoResponse.Consultar = false;
                            permissaoResponse.Cadastrar = false;
                            permissaoResponse.Editar = false;
                            permissaoResponse.Excluir = false;
                        }
                    }
                    console.log(permissaoResponse);

                    PermissaoService.put(permissaoResponse)
                        .finally(() => {
                            selecionarMenu(permissaoResponse.MenuID);
                            setLoading(false)
                            addToast({
                                title: 'Sucesso!',
                                description: 'Registro alterado com sucesso',
                                type: 'success',
                            });
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
        PermissaoService.getByMenuID(menuID)
            .then((data) => {
                console.log(data.data);

                data.data.map((d: any) => {
                    d.TipoUsuarioString = d.TipoUsuarioNavigation.Nome;
                    d.PossuiMenuString = d.PossuiMenu ? 'Sim' : 'Não';
                    d.ConsultarCheck = <><input className="form-check-input" type="checkbox" value={d.Consultar} id="flexCheckChecked" checked={d.Consultar} onChange={(e: any) => { onNativeChange(e, d, "Consultar") }} /></>;

                    {/* <CFormCheck type="checkbox" id="gridCheck" defaultChecked={d.Consultar} onChange={(e: any) => { onNativeChange(e, d, "Consultar") }} /></>; */}
                    d.CadastrarCheck = <><CFormCheck type="checkbox" id="gridCheck" defaultChecked={d.Cadastrar} onChange={(e: any) => { onNativeChange(e, d, "Cadastrar") }} /></>;
                    d.EditarCheck = <><CFormCheck type="checkbox" id="gridCheck" defaultChecked={d.Editar} onChange={(e: any) => { onNativeChange(e, d, "Editar") }}  /></>;
                    d.ExcluirCheck = <><CFormCheck type="checkbox" id="gridCheck" defaultChecked={d.Excluir} onChange={(e: any) => { onNativeChange(e, d, "Excluir") }}  /></>;
                    d.TodosCheck = <><CFormCheck type="checkbox" id="gridCheck" defaultChecked={d.Consultar && d.Cadastrar && d.Editar && d.Excluir} onChange={(e: any) => { onNativeChange(e, d, "Todos") }}  /></>;
                })
                console.log(data.data);
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
                    <select defaultValue={''} className='form-select' name="MenuID" onChange={(event) => {
                        selecionarMenu(parseInt(event.target.value));
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
                autoResetAll={true}
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