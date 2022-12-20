import React, { useCallback, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
    CButton,
    CPopover,
    CSpinner,
    CTable,
} from '@coreui/react'

import { useEffect } from 'react';
import Style from './tipo-usuario-page.module.scss'
import TipoUsuarioService from '../../../services/tipo-usuario-service/tipo-usuario-service';
import { useToast } from '../../../features/toast';
import TipoUsuarioCadastroModal from './ModalCadastroTipoUsuario/tipo-usuario-cadastro-modal';
import TipoUsuarioEdicaoModal from './ModalEdicaoTipoUsuario/tipo-usuario-edicao-modal';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';

const TipoUsuarioPage: React.FC<any> = (prop) => {
    const [visibleCadastrar, setVisibleCadastrar] = useState(false);
    const [visibleEditar, setVisibleEditar] = useState(false);
    const [modelEditar, setModelEditar] = useState();
    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState<any[]>([]);
    const { addToast } = useToast();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let string = location.pathname.substring(1);
        let finalDaPalavra = string.search('/') != -1 ? string.search('/') : string.length;
        verificarPermissao(string.substring(0, finalDaPalavra).toUpperCase());
    }, [])

    const verificarPermissao = (route: any) => {
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
    };

    useEffect(() => {
        carregarDados();
    }, [])

    useEffect(() => {
        carregarDados();
    }, [visibleEditar, visibleCadastrar])

    const carregarDados = async (): Promise<void> => {
        setLoading(true)
        TipoUsuarioService.get()
            .then((data) => {
                data.data.map((d: any) => {
                    d.Acoes = <>
                        <CButton shape="rounded-pill" variant="ghost" color="info" size="sm" onClick={() => { setModelEditar(d), setVisibleEditar(true) }}>Editar</CButton>
                        {/* <CPopover
                            trigger='click'
                            title="Exluir registro"
                            content={<> Tem certeza que deseja excluir esse registro?
                                <div className={Style.buttonConfirm}>
                                    <CButton color='dark' size='sm' variant="outline" onClick={() => { fecharPopover(d.TipoUsuarioID) }} >Não</CButton> <CButton color='danger' size='sm' onClick={() => excluirRegistro(d.TipoUsuarioID)}>Sim</CButton>
                                </div>
                            </>
                            }
                            placement="top"
                        >
                            <CButton shape="rounded-pill" variant="ghost" id={`excluir${d.TipoUsuarioID}`} color="danger" size="sm">Excluir</CButton>
                        </CPopover> */}
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

    const excluirRegistro = useCallback(
        async (id: number) => {
            try {
                setLoading(true)
                TipoUsuarioService.delete(id)
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
                    .catch((ex) => {
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
        () => [
            {
                accessorKey: 'TipoUsuarioID',
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
                accessorKey: 'Descricao',
                header: 'Descrição',
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
            <TipoUsuarioCadastroModal setVisivelFalse={() => setVisibleCadastrar(false)} visivel={visibleCadastrar} />
            <TipoUsuarioEdicaoModal model={modelEditar} setVisivelFalse={() => setVisibleEditar(false)} visivel={visibleEditar} />
            <CSpinner hidden={!loading} />
            <h2>Tipo Usuário</h2>
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
export default TipoUsuarioPage;