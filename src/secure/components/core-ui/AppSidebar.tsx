import React, { useEffect, useState } from 'react'

import { CNavGroup, CNavItem, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
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
import MenuService from '../../../services/menu-service/menu-service'
import { cilCursor, cilPuzzle } from '@coreui/icons'

const AppSidebar: React.FC<any> = (prop) => {
  const dispatch = useAppDispatch();
  const sidebar = useAppSelector(sidebarState);
  const [menus, setMenus] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem('@Sisoc:user') || '');

  useEffect(() => {
    carregarMenus();
  }, [])

  const carregarMenus = () => {
    let menusAux: any[] = [];
    let subMenusAux: any[] = [];

    MenuService.getPorTipoUsuarioID(user.TipoUsuario.TipoUsuarioID).then((res) => {
      res.data.map((m: any) => {
        //Caso tenha Submenu
        if (m.Submenus.length > 0) {
          m.Submenus.map((s: any) => {
            subMenusAux.push({
              component: CNavItem,
              name: s.Nome,
              to: m.NavegarURL + s.NavegarURL,
            })
          })
          menusAux.push({
            component: CNavGroup,
            name: m.Nome,
            to: m.NavegarURL,
            icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
            items: subMenusAux
          })
        }
        //Caso NÃO tenha Submenu
        else {
          menusAux.push({
            component: CNavItem,
            name: m.Nome,
            to: m.NavegarURL,
            icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
          })
        }
        subMenusAux = [];
      })
      setMenus(menusAux)
    })
  }

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
          <AppSidebarNav items={menus} />
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
