import React from 'react'
import { Link } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import { useEffect } from 'react';
import Style from './login-page.module.scss'
import logoIFMS from '../../../assets/img/ifms-logo.png'

const TipoUsuarioPage: React.FC<any> = (prop) => {

    useEffect(() => {
    }, [])

    return (
        <>
            <h1>teste</h1>
        </>
    )
}
export default TipoUsuarioPage;