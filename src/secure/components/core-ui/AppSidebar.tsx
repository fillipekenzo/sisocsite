import React from 'react'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import AppSidebarNav from './AppSidebarNav'

import { logoNegative } from '../../../assets/brand/logo-negative'
import logoIFMS from '../../../assets/img/ifms.png'
import { sygnet } from '../../../assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from './_nav'
import { useAppDispatch, useAppSelector } from '../../../features/hooks'
import { sidebarState, show, unfoldable } from '../../../features/slices/sidebar-slice'

const AppSidebar: React.FC<any> = (prop) => {
  const dispatch = useAppDispatch();
  const sidebar = useAppSelector(sidebarState);

  return (
    <CSidebar
      position="fixed"
      unfoldable={sidebar.sidebarUnfoldable}
      visible={sidebar.sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(show(visible))
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" >
        <h3 className="sidebar-brand-full" style={{ margin: '0px' }}>SISOC</h3>
        <img className="sidebar-brand-narrow" src={logoIFMS} style={{ width: '30px' }}></img>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch(unfoldable(!sidebar.sidebarUnfoldable))}
      />
    </CSidebar>
  )
}

export default AppSidebar
