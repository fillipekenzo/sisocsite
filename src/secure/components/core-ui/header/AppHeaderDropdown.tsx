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
  CNavLink,
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
  cilCog,
  cilContact,
  cilAddressBook,
  cilGroup,
  cilBriefcase,
  cilEnvelopeClosed
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar from '../../../../assets/avatars/avatar.png'
import { useAuth } from '../../../../features/auth'
import { useNavigate } from 'react-router-dom'
import Style from './Styles.module.scss'

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
      <CDropdownToggle className={`py-1 ${Style.divDropdown}`} caret={false}>
        <CNavLink>
          {user.Nome}
        </CNavLink>
        <CAvatar color="secondary" size="md" >{retornaIniciais(user.Nome)}</CAvatar>
      </CDropdownToggle>

      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Conta</CDropdownHeader>
        <CDropdownItem>
          <CIcon icon={cilUser} className="me-2" />
          {user.Nome}
        </CDropdownItem>
        <CDropdownItem>
          <CIcon icon={cilEnvelopeClosed} className="me-2" />
          {user.Email}
        </CDropdownItem>
        <CDropdownItem >
          <CIcon icon={cilGroup} className="me-2" />
          {user.TipoUsuario.Nome}
        </CDropdownItem>
        {
          user.Setor ?
            <CDropdownItem >
              <CIcon icon={cilBriefcase} className="me-2" />
              {user.Setor?.Sigla}
            </CDropdownItem>
            :
            null
        }
        <CDropdownItem className={Style.linkSair} onClick={() => { signOut(), navigate('/login') }}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Sair
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
