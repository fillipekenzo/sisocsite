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
import Style from './interacao-ocorrencia-modal.module.scss'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { cilLockLocked, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useToast } from '../../../../features/toast';
import InteracaoOcorrenciaService from '../../../../services/interacao-ocorrencia-service/interacao-ocorrencia-service';

interface InteracaoOcorrenciaModalProps {
    visivel: boolean;
    setVisivelFalse?: any;
    model: any;
}

const InteracaoOcorrenciaModal: React.FC<InteracaoOcorrenciaModalProps> = (props) => {
    const { addToast } = useToast();
    const [visible, setVisible] = useState(false);
    const [fileAnexo, setFileAnexo] = useState<any>(null);
    const userLogado = JSON.parse(localStorage.getItem('@Sisoc:user') || '');

    const [initialForm, setInitialForm] = useState({
        InteracaoOcorrenciaID: 0,
        Assunto: '',
        Descricao: '',
        OcorrenciaID: '',
    });

    useEffect(() => {
        setVisible(props.visivel)
    }, [props.visivel])

    const SchemaValidation = Yup.object().shape({
        Assunto: Yup.string()
            .min(2, 'Muito curta')
            .max(100, 'Muito longa')
            .required('Assunto obrigatório'),
        Descricao: Yup.string().required('Descrição obrigatória'),
    });

    const changeFile = (value: any) => {
        setFileAnexo(value);
    }

    const handleSubmit = async (data: any) => {
        try {
            data.OcorrenciaID = props.model.OcorrenciaID
            data.UsuarioID = userLogado.UsuarioID
            InteracaoOcorrenciaService.post(data, fileAnexo)
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
    }


    return (
        <CModal alignment="center" visible={visible} onClose={() => props.setVisivelFalse()} backdrop='static'>
            <CModalHeader>
                <CModalTitle>Interagir com a Ocorrência</CModalTitle>
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
                                    <Field type="number" className="form-control" name="OcorrenciaID" id="OcorrenciaID" hidden />
                                    <div className="mb-3">
                                        <label htmlFor="Assunto" className="form-label">Assunto</label>
                                        <Field type="text" className="form-control" name="Assunto" id="Assunto" placeholder="Assunto da Interação" />
                                        {errors.Assunto && touched.Assunto ? (
                                            <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Assunto}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="Descricao" className="form-label">Descrição</label>
                                        <Field as="textarea" rows='5' maxLength="1000" type="text" className="form-control" name="Descricao" id="Descricao" placeholder="Descrição da Interação" />
                                        {errors.Descricao && touched.Descricao ? (
                                            <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Descricao}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-3">
                                        <input onChange={(event: any) => {
                                            changeFile(event.currentTarget.files[0]);
                                        }} className="form-control" type="file" name="File" id="File" placeholder="Anexos" />
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
export default InteracaoOcorrenciaModal;