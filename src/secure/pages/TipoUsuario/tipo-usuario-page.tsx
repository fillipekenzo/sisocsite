import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    CButton,
    CTable,
} from '@coreui/react'

import { useEffect } from 'react';
import Style from './tipo-usuario-page.module.scss'
import TipoUsuarioService from '../../../services/tipo-usuario-service.ts/tipo-usuario-service';
import { useToast } from '../../../features/toast';

const TipoUsuarioPage: React.FC<any> = (prop) => {

    const [tipos, setTipos] = useState<any[]>([]);
    const { addToast } = useToast();

    useEffect(() => {
        carregarTipos();
    }, [])

    const carregarTipos = async (): Promise<void> => {
        TipoUsuarioService.get()
            .then((data) => {
                data.data.map((d: any) => {
                    d.Acoes = <>
                        <CButton shape="rounded-pill" variant="ghost" color="info" size="sm">Editar</CButton>
                        <CButton shape="rounded-pill" variant="ghost" color="danger" size="sm" onClick={() => { console.log(d.TipoUsuarioID) }}>Excluir</CButton>
                    </>

                })
                setTipos(data.data);
            })
            .finally(() => {
            })
    };

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
            <h2>Tipo Usuário</h2>
            <div className={Style.divButtonCadastar}>
                <CButton color="primary" variant="outline">Cadastrar</CButton>
            </div>
            <CTable caption={`Total de registros ${tipos.length}`} responsive columns={columns} items={tipos} tableHeadProps={{ color: 'primary' }} color='secondary' hover bordered borderColor='dark' />
        </>
    )
}
export default TipoUsuarioPage;