import React, { useCallback, useState } from 'react'
import {
    CButton,
    CPopover,
    CSpinner,
    CTable,
} from '@coreui/react'

import { useEffect } from 'react';
import Style from './modulo-page.module.scss'
import { useToast } from '../../../features/toast';
import ModuloService from '../../../services/modulo-service/modulo-service';
import ModuloCadastroModal from './ModalCadastroModulo/modulo-cadastro-modal';
import ModuloEdicaoModal from './ModalEdicaoModulo/modulo-edicao-modal';

const ModuloPage: React.FC<any> = (prop) => {
    const [visibleCadastrar, setVisibleCadastrar] = useState(false);
    const [visibleEditar, setVisibleEditar] = useState(false);
    const [modelEditar, setModelEditar] = useState();
    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState<any[]>([]);
    const { addToast } = useToast();

    useEffect(() => {
        carregarDados();
    }, [])

    useEffect(() => {
        carregarDados();
    }, [visibleEditar, visibleCadastrar])

    const carregarDados = async (): Promise<void> => {
        setLoading(true)
        ModuloService.get()
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
                                    <CButton color='dark' size='sm' variant="outline" onClick={() => { fecharPopover(d.ModuloID) }} >Não</CButton> <CButton color='danger' size='sm' onClick={() => excluirRegistro(d.ModuloID)}>Sim</CButton>
                                </div>
                            </>
                            }
                            placement="top"
                        >
                            <CButton shape="rounded-pill" variant="ghost" id={`excluir${d.ModuloID}`} color="danger" size="sm">Excluir</CButton>
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

    const excluirRegistro = useCallback(
        async (id: number) => {
            try {
                setLoading(true)
                ModuloService.delete(id)
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


    const columns = [
        {
            key: 'ModuloID',
            label: 'ID',
            _props: { scope: 'col' },
        },
        {
            key: 'Nome',
            label: 'Nome',
            _props: { scope: 'col' },
        },
        {
            key: 'NavegarURL',
            label: 'NavegarURL',
            _props: { scope: 'col' },
        },
        {
            key: 'AtivoString',
            label: 'Ativo',
            _props: { scope: 'col' },
        },
        {
            key: 'PossuiMenuString',
            label: 'Possui Menu',
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
            <ModuloCadastroModal setVisivelFalse={() => setVisibleCadastrar(false)} visivel={visibleCadastrar} />
            <ModuloEdicaoModal model={modelEditar} setVisivelFalse={() => setVisibleEditar(false)} visivel={visibleEditar} />
            <CSpinner hidden={!loading} />
            <h2>Modulo</h2>
            <div className={Style.divButtonCadastar}>
                <CButton color="primary" variant="outline" onClick={() => { setVisibleCadastrar(true) }}>Cadastrar</CButton>
            </div>
            <CTable caption={`Total de registros ${dados.length}`} responsive columns={columns} items={dados} tableHeadProps={{ color: 'primary' }} color='secondary' hover bordered borderColor='dark' />

        </>
    )
}
export default ModuloPage;