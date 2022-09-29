import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilAccountLogout,
  cilCog
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar from '../../../../assets/avatars/avatar.png'
import { useAuth } from '../../../../features/auth'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown: React.FC<any> = (prop) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const retornaIniciais = (nome: string) => {
    var nomes = nome.split(" ");
    var primeiroNome = nomes[0] == undefined ? "" : nomes[0]?.substring(1, 0);
    var segundoNome = nomes[1] == undefined ? "" : nomes[1]?.substring(1, 0);
    var resultado = primeiroNome.toUpperCase() + segundoNome.toUpperCase();
    return resultado;
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle className="py-0" caret={false}>
        <CAvatar color="secondary" size="md" >{retornaIniciais(user.Nome)}</CAvatar>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Conta</CDropdownHeader>
        <CDropdownItem >
          <CIcon icon={cilBell} className="me-2" />
          {user.Nome}
        </CDropdownItem>
        <CDropdownItem>
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          {user.Email}
        </CDropdownItem>
        <CDropdownItem >
          <CIcon icon={cilTask} className="me-2" />
          {user.TipoUsuario.Nome}
        </CDropdownItem>
        <CDropdownItem >
          <CIcon icon={cilCog} className="me-2" />
          Configurações
        </CDropdownItem>
        <CDropdownItem onClick={() => { signOut(), navigate('/login') }}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Sair
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
