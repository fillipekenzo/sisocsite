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
import Style from './resolver-ocorrencia-modal.module.scss'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { cilLockLocked, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useToast } from '../../../../features/toast';
import OcorrenciaService from '../../../../services/ocorrencia-service/ocorrencia-service';

interface ResolverOcorrenciaModalProps {
    visivel: boolean;
    setVisivelFalse?: any;
    model: any;
}

const ResolverOcorrenciaModal: React.FC<ResolverOcorrenciaModalProps> = (props) => {
    const { addToast } = useToast();
    const [visible, setVisible] = useState(false);
    const [ocorrencia, setOcorrencia] = useState<any>(null);
    const userLogado = JSON.parse(localStorage.getItem('@Sisoc:user') || '');

    const [initialForm, setInitialForm] = useState({
        Resolucao: '',
    });

    useEffect(() => {
        setVisible(props.visivel)
        setOcorrencia(props.model)
    }, [props.visivel])

    const SchemaValidation = Yup.object().shape({
        Resolucao: Yup.string().required('Resolução obrigatória'),
    });

    const handleSubmit = async (data: any) => {
        try {
            ocorrencia.Resolucao = data.Resolucao
            ocorrencia.SituacaoENUM = "Resolvido"
            setOcorrencia(ocorrencia)
            OcorrenciaService.put(ocorrencia)
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
                <CModalTitle>Resolver Ocorrência</CModalTitle>
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
                                        <label htmlFor="Resolucao" className="form-label">Resolução</label>
                                        <Field as="textarea" rows='5' maxLength="1000" type="text" className="form-control" name="Resolucao" id="Resolucao" placeholder="Resolução da Ocorrência" />
                                        {errors.Resolucao && touched.Resolucao ? (
                                            <div className="invalid-feedback" style={{ display: 'flex' }}>{errors.Resolucao}</div>
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
export default ResolverOcorrenciaModal;