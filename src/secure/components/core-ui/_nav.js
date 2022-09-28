import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilMediaPlay
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Interações',
  },
  {
    component: CNavGroup,
    name: 'Ocorrências',
    to: '/ocorrencia',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/ocorrencia/dashboard',
      },
      {
        component: CNavItem,
        name: 'Cadastrar',
        to: '/ocorrencia/cadastrar',
      },
      {
        component: CNavItem,
        name: 'Consultar',
        to: '/ocorrencia/consultar',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },

  {
    component: CNavTitle,
    name: 'Cadastros',
  },
  {
    component: CNavItem,
    name: 'Tipo Usuário',
    to: '/tipo-usuario',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Tipo Ocorrência',
    to: '/tipo-ocorrencia',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Setor',
    to: '/setor',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Módulo',
    to: '/modulo',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Permissão',
    to: '/permissao',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
]

export default _nav
