import React, { useCallback, useState } from 'react'
import {
    CButton,
    CCol,
    CContainer,
    CPopover,
    CRow,
    CSpinner,
    CTable,
} from '@coreui/react'

import { useEffect } from 'react';
import Style from './ocorrencia-cadastro-page.module.scss'
import { useToast } from '../../../../features/toast';
import OcorrenciaService from '../../../../services/ocorrencia-service/ocorrencia-service';
import TipoOcorrenciaService from '../../../../services/tipo-ocorrencia-service/tipo-ocorrencia-service';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const OcorrenciaCadastrarPage: React.FC<any> = (prop) => {
    const [visibleCadastrar, setVisibleCadastrar] = useState(false);
    const [visibleEditar, setVisibleEditar] = useState(false);
    const [modelEditar, setModelEditar] = useState();
    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState<any[]>([]);
    const [tipoOcorrencias, setTipoOcorrencias] = useState<any[]>([]);
    const { addToast } = useToast();

    useEffect(() => {
        carregarDados();
    }, [])

    useEffect(() => {
        carregarDados();
    }, [visibleEditar, visibleCadastrar])

    const carregarDados = async (): Promise<void> => {
        setLoading(true)
        TipoOcorrenciaService.get()
            .then((data) => {
                data.data.map((d: any) => {
                   
                })
                setTipoOcorrencias(data.data);
            })
            .finally(() => {
                setLoading(false)
            })
    };

    const initialForm = {
        Nome: '',
        Descricao: '',
    };

    const SchemaValidation = Yup.object().shape({
        Nome: Yup.string()
            .min(2, 'Muito curta')
            .max(100, 'Muito longa')
            .required('Nome obrigatório'),
        Descricao: Yup.string().required('Descrição obrigatória'),
    });

    const handleSubmit = useCallback(
        async (data: any) => {
            try {
                TipoOcorrenciaService.post(data)
                    .then((res) => {
                        if (res.success) {
                            addToast({
                                title: 'Sucesso!',
                                description: 'Registro cadastrado com sucesso',
                                type: 'success',
                            });
                        }
                    })
                    .finally(() => {
                    })
                    .catch((ex) => {
                        if (ex.response != undefined) {
                            ex.response.data.error.map((a: any) => {
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

            } catch (ex) {
                addToast({
                    title: 'Erro',
                    description: 'Não foi possível executar esta ação',
                    type: 'error',
                });
            }
        },
        [addToast, history]
    );


    return (
        <>
            <CSpinner hidden={!loading} />
            <h2>Nova Ocorrência</h2>
            <Formik
                    initialValues={initialForm}
                    onSubmit={handleSubmit}
                    validationSchema={SchemaValidation}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <CContainer >
                                <div className="mb-3">
                                    <label htmlFor="Nome" className="form-label">Nome</label>
                                    <Field type="text" className="form-control" name="Nome" id="Nome" placeholder="Nome do Tipo Ocorrência" />
                                    {errors.Nome && touched.Nome ? (
                                        <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Nome}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="Descricao" className="form-label">Descrição</label>
                                    <Field type="text" className="form-control" name="Descricao" id="Descricao" placeholder="Descrição do Tipo Ocorrência" />
                                    {errors.Descricao && touched.Descricao ? (
                                        <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Descricao}</div>
                                    ) : null}
                                </div>

                                <CRow>
                                    <CCol xs={12} className={Style.buttonCadastrar}>
                                        <CButton color="primary" type='submit' className={`px-4 ${Style.buttonEntrar}`}>
                                            Salvar
                                        </CButton>
                                    </CCol>
                                </CRow>
                            </CContainer>
                        </Form>
                    )}
                </Formik>
        </>
    )
}
export default OcorrenciaCadastrarPage;