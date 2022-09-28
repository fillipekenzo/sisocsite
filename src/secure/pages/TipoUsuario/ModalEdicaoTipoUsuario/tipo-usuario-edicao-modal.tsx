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
import Style from './tipo-usuario-edicao-modal.module.scss'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { cilLockLocked, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useToast } from '../../../../features/toast';
import TipoUsuarioService from '../../../../services/tipo-usuario-service.ts/tipo-usuario-service';

interface TipoUsuarioCadastroModalProps {
    visivel: boolean;
    setVisivelFalse?: any;
    model: any;
}

const TipoUsuarioEdicaoModal: React.FC<TipoUsuarioCadastroModalProps> = (props) => {

    const { addToast } = useToast();
    const [visible, setVisible] = useState(false);
    const [initialForm, setInitialForm] = useState({
        TipoUsuarioID: 0,
        Nome: '',
        Descricao: '',
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
        Descricao: Yup.string().required('Descrição obrigatória'),
    });

    const handleSubmit = useCallback(
        async (data: any) => {
            try {
                TipoUsuarioService.put(data)
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
        <CModal alignment="center" visible={visible} onClose={() => props.setVisivelFalse()}>
            <CModalHeader>
                <CModalTitle>Cadastrar Tipo Usuário</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <Formik
                    enableReinitialize
                    initialValues={initialForm}
                    onSubmit={handleSubmit}
                    validationSchema={SchemaValidation}
                >
                    {({ errors, touched, isSubmitting, setValues }) => {
                        // setValues(props.model,true)
                        return (
                            <Form>
                                <CContainer >
                                    <Field type="number" className="form-control" name="tipoUsuarioID" id="tipoUsuarioID" hidden />
                                    <div className="mb-3">
                                        <label htmlFor="Nome" className="form-label">Nome</label>
                                        <Field type="text" className="form-control" name="Nome" id="Nome" placeholder="Nome do Tipo Usuário" />
                                        {errors.Nome && touched.Nome ? (
                                            <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Nome}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="Descricao" className="form-label">Descrição</label>
                                        <Field type="text" className="form-control" name="Descricao" id="Descricao" placeholder="Descrição do Tipo Usuário" />
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
                        )
                    }}
                </Formik>

            </CModalBody>
        </CModal>
    )
}
export default TipoUsuarioEdicaoModal;