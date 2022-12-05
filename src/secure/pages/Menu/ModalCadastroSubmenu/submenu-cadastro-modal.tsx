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
import Style from './submenu-cadastro-modal.module.scss'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useToast } from '../../../../features/toast';
import SubmenuService from '../../../../services/submenu-service/submenu-service';

interface SubmenuCadastroModalProps {
    visivel: boolean;
    setVisivelFalse?: any;
    menuID?: any;
}

const SubmenuCadastroModal: React.FC<SubmenuCadastroModalProps> = (props) => {

    const { addToast } = useToast();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(props.visivel)
        
    }, [props.visivel])

    const initialForm = {
        MenuID: props.menuID,
        Nome: '',
        NavegarURL: '',
        Ativo: true,
        PossuiMenu: true,
        Ordem: '',
    };

    const SchemaValidation = Yup.object().shape({
        Nome: Yup.string()
            .min(2, 'Muito curta')
            .max(100, 'Muito longa')
            .required('Nome obrigatório'),
        NavegarURL: Yup.string().required('NavegarURL obrigatória'),
        Ordem: Yup.string().required('Ordem obrigatória'),
    });

    const handleSubmit = useCallback(
        async (data: any) => {
            try {
                SubmenuService.post(data)
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
                <CModalTitle>Cadastrar Submenu</CModalTitle>
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
                                <Field type="number" className="form-control" name="MenuID" id="MenuID" hidden />
                                <div className="mb-3">
                                    <label htmlFor="Nome" className="form-label">Nome</label>
                                    <Field type="text" className="form-control" name="Nome" id="Nome" placeholder="Nome do Submenu" />
                                    {errors.Nome && touched.Nome ? (
                                        <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Nome}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="NavegarURL" className="form-label">NavegarURL</label>
                                    <Field type="text" className="form-control" name="NavegarURL" id="NavegarURL" placeholder="NavegarURL do Submenu" />
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
                                            <label htmlFor="Ordem" className="form-label" id="Ordem">Ordem</label>
                                            <Field type="number" className="form-control" name="Ordem" id="Ordem" placeholder="Ordem do Submenu" />
                                            {errors.Ordem && touched.Ordem ? (
                                                <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Ordem}</div>
                                            ) : null}
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
export default SubmenuCadastroModal;