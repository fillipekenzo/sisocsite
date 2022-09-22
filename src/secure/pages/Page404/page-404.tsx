
import { useEffect } from 'react';
import Style from './login-page.module.scss'
import React from 'react'
import {
    CButton,
    CCol,
    CContainer,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'
import { useLocation } from 'react-router-dom';

const Page404: React.FC<any> = (prop) => {
    let location = useLocation();

    useEffect(() => {
    }, [])

    return (
        <>
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={6}>
                            <div className="clearfix">
                                <h1 className="display-3 me-4">404</h1>
                                <h4 className="pt-3">Página não encontrada.</h4>
                                <p className="text-medium-emphasis">
                                    A página {location.pathname} não existe
                                </p>
                            </div>

                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </>
    )
}
export default Page404;