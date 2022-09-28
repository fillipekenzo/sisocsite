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
import Style from './modulo-edicao-modal.module.scss'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useToast } from '../../../../features/toast';
import ModuloService from '../../../../services/modulo-service/modulo-service';

interface ModuloCadastroModalProps {
    visivel: boolean;
    setVisivelFalse?: any;
    model: any;
}

const ModuloEdicaoModal: React.FC<ModuloCadastroModalProps> = (props) => {

    const { addToast } = useToast();
    const [visible, setVisible] = useState(false);
    const [initialForm, setInitialForm] = useState({
        ModuloID: 0,
        Nome: '',
        NavegarURL: '',
        Ativo: true,
        PossuiMenu: true,
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
        NavegarURL: Yup.string().required('Sigla obrigatória'),
    });

    const handleSubmit = useCallback(
        async (data: any) => {
            try {
                ModuloService.put(data)
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
        <CModal alignment="center" visible={visible} onClose={() => props.setVisivelFalse()} backdrop='static'>
            <CModalHeader>
                <CModalTitle>Editar Módulo</CModalTitle>
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
                                        <Field type="text" className="form-control" name="Nome" id="Nome" placeholder="Nome do Módulo" />
                                        {errors.Nome && touched.Nome ? (
                                            <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Nome}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="NavegarURL" className="form-label">NavegarURL</label>
                                        <Field type="text" className="form-control" name="NavegarURL" id="NavegarURL" placeholder="NavegarURL do Módulo" />
                                        {errors.NavegarURL && touched.NavegarURL ? (
                                            <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.NavegarURL}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-3">
                                        <CRow>
                                            <CCol xs={6} >
                                                <label htmlFor="Ativo" className="form-label" id="NavegarURL">Ativo</label>
                                                <Field as="select" className='form-select' name="Ativo">
                                                    <option value="true">Sim</option>
                                                    <option value="false">Não</option>
                                                </Field>
                                            </CCol>
                                            <CCol xs={6} >
                                                <label htmlFor="PossuiMenu" className="form-label" id="PossuiMenu">Possui Menu</label>
                                                <Field as="select" className='form-select' name="PossuiMenu">
                                                    <option value="true">Sim</option>
                                                    <option value="false">Não</option>
                                                </Field>
                                            </CCol>
                                        </CRow>
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
export default ModuloEdicaoModal;