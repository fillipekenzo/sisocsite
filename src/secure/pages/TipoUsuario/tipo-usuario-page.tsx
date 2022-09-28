import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
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

const TipoUsuarioPage: React.FC<any> = (prop) => {
    const [visibleCadastrar, setVisibleCadastrar] = useState(false);
    const [visibleEditar, setVisibleEditar] = useState(false);
    const [modelEditar, setModelEditar] = useState();
    const [loading, setLoading] = useState(false);
    const [tipos, setTipos] = useState<any[]>([]);
    const { addToast } = useToast();

    useEffect(() => {
        carregarTipos();
    }, [])

    useEffect(() => {
        carregarTipos();
    }, [visibleEditar, visibleCadastrar])

    const carregarTipos = async (): Promise<void> => {
        setLoading(true)
        TipoUsuarioService.get()
            .then((data) => {
                data.data.map((d: any) => {
                    d.Acoes = <>
                        <CButton shape="rounded-pill" variant="ghost" color="info" size="sm" onClick={() => { setModelEditar(d), setVisibleEditar(true) }}>Editar</CButton>
                        <CPopover
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
                        </CPopover>
                    </>;
                })
                setTipos(data.data);
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
                        carregarTipos();
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
        [tipos, addToast]
    );


    const columns = [
        {
            key: 'TipoUsuarioID',
            label: 'ID',
            _props: { className: 'w-25', scope: 'col' },
        },
        {
            key: 'Nome',
            label: 'Nome',
            _props: { className: 'w-25', scope: 'col' },
        },
        {
            key: 'Descricao',
            label: 'Descrição',
            _props: { className: 'w-25', scope: 'col' },
        },
        {
            key: 'Acoes',
            label: 'Ações',
            _props: { className: 'w-25', scope: 'col' },
        },
    ]

    return (
        <>
            <TipoUsuarioCadastroModal setVisivelFalse={() => setVisibleCadastrar(false)} visivel={visibleCadastrar} />
            <TipoUsuarioEdicaoModal model={modelEditar} setVisivelFalse={() => setVisibleEditar(false)} visivel={visibleEditar} />
            <CSpinner hidden={!loading} />
            <h2>Tipo Usuário</h2>
            <div className={Style.divButtonCadastar}>
                <CButton color="primary" variant="outline" onClick={() => { setVisibleCadastrar(true) }}>Cadastrar</CButton>
            </div>
            <CTable caption={`Total de registros ${tipos.length}`} responsive columns={columns} items={tipos} tableHeadProps={{ color: 'primary' }} color='secondary' hover bordered borderColor='dark' />

        </>
    )
}
export default TipoUsuarioPage;