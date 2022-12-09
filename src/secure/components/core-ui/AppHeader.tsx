import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from '../../../assets/brand/logo'
import { useAppDispatch, useAppSelector } from '../../../features/hooks'
import { sidebarState, show } from '../../../features/slices/sidebar-slice'
import logoIFMS from '../../../assets/img/ifms.png'
import logoSISOC from '../../../assets/img/sisoc.png'
import { useAuth } from '../../../features/auth'
import Style from './Styles.module.scss'

const AppHeader: React.FC<any> = (prop) => {
  const { signOut, user } = useAuth();
  const dispatch = useAppDispatch();
  const sidebar = useAppSelector(sidebarState);

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch(show(!sidebar.sidebarShow))}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className={`mx-auto d-md-none ${Style.divLogo}`}>
          <div  style={{ display: 'flex' }}>
            <img src={logoSISOC} style={{ width: '30px' }}></img>
            &nbsp;
            <h3 className={Style.tituloLogo} style={{ margin: '0px' }}>SISOC</h3>
          </div>
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <AppBreadcrumb />
        </CHeaderNav>

        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      
      {/* <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  )
}

export default AppHeader
