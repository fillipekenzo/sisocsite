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
import Style from './modulo-cadastro-modal.module.scss'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useToast } from '../../../../features/toast';
import ModuloService from '../../../../services/modulo-service/modulo-service';

interface ModuloCadastroModalProps {
    visivel: boolean;
    setVisivelFalse?: any;
}

const ModuloCadastroModal: React.FC<ModuloCadastroModalProps> = (props) => {

    const { addToast } = useToast();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(props.visivel)
    }, [props.visivel])

    const initialForm = {
        Nome: '',
        NavegarURL: '',
        Ativo: true,
        PossuiMenu: true,
    };

    const SchemaValidation = Yup.object().shape({
        Nome: Yup.string()
            .min(2, 'Muito curta')
            .max(100, 'Muito longa')
            .required('Nome obrigatório'),
        NavegarURL: Yup.string().required('NavegarURL obrigatória'),
    });

    const handleSubmit = useCallback(
        async (data: any) => {
            try {
                console.log(data);
                
                ModuloService.post(data)
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
                        props.setVisivelFalse()
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
        <CModal alignment="center" visible={visible} onClose={() => props.setVisivelFalse()} backdrop='static'>
            <CModalHeader>
                <CModalTitle>Cadastrar Módulo</CModalTitle>
            </CModalHeader>
            <CModalBody>
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
                    )}
                </Formik>

            </CModalBody>
        </CModal>
    )
}
export default ModuloCadastroModal;