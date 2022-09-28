import React, { useCallback, useState } from 'react'
import {
    CButton,
    CCol,
    CContainer,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CRow,
} from '@coreui/react'

import { useEffect } from 'react';
import Style from './setor-edicao-modal.module.scss'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useToast } from '../../../../features/toast';
import SetorService from '../../../../services/setor-service/setor-service';

interface SetorCadastroModalProps {
    visivel: boolean;
    setVisivelFalse?: any;
    model: any;
}

const SetorEdicaoModal: React.FC<SetorCadastroModalProps> = (props) => {

    const { addToast } = useToast();
    const [visible, setVisible] = useState(false);
    const [initialForm, setInitialForm] = useState({
        SetorID: 0,
        Nome: '',
        Sigla: '',
    });

    useEffect(() => {
        setVisible(props.visivel)
        setInitialForm(props.model)
    }, [props.visivel])

    const SchemaValidation = Yup.object().shape({
        Nome: Yup.string()
            .min(2, 'Muito curta')
            .max(100, 'Muito longa')
            .required('Nome obrigatório'),
        Sigla: Yup.string().required('Sigla obrigatória'),
    });

    const handleSubmit = useCallback(
        async (data: any) => {
            try {
                SetorService.put(data)
                    .then((res) => {
                        if (res.success) {
                            addToast({
                                title: 'Sucesso!',
                                description: 'Registro editado com sucesso',
                                type: 'success',
                            });
                        }
                    })
                    .finally(() => {
                        props.setVisivelFalse()
                    })
                    .catch((ex: any) => {
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

            } catch (ex: any) {
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
        <CModal alignment="center" visible={visible} onClose={() => props.setVisivelFalse()}>
            <CModalHeader>
                <CModalTitle>Editar Tipo Ocorrência</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <Formik
                    enableReinitialize
                    initialValues={initialForm}
                    onSubmit={handleSubmit}
                    validationSchema={SchemaValidation}
                >
                    {({ errors, touched }) => {
                        return (
                            <Form>
                                <CContainer >
                                    <Field type="number" className="form-control" name="tipoOcorrenciaID" id="tipoOcorrenciaID" hidden />
                                    <div className="mb-3">
                                        <label htmlFor="Nome" className="form-label">Nome</label>
                                        <Field type="text" className="form-control" name="Nome" id="Nome" placeholder="Nome do Setor" />
                                        {errors.Nome && touched.Nome ? (
                                            <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Nome}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="Sigla" className="form-label">Sigla</label>
                                        <Field type="text" className="form-control" name="Sigla" id="Sigla" placeholder="Descrição do Setor" />
                                        {errors.Sigla && touched.Sigla ? (
                                            <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Sigla}</div>
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
                        )
                    }}
                </Formik>

            </CModalBody>
        </CModal>
    )
}
export default SetorEdicaoModal;