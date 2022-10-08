import React from 'react'
import MenuPage from './Menu/menu-page'
import OcorrenciaCadastrarPage from './Ocorrencia/CadastrarOcorrencia/ocorrencia-cadastro-page'
import OcorrenciaDashboardPage from './Ocorrencia/DashboardOcorrencia/ocorrencia-dashboard-page'
import SetorPage from './Setor/setor-page'
import TipoOcorrenciaPage from './TipoOcorrencia/tipo-ocorrencia-page'
import TipoUsuarioPage from './TipoUsuario/tipo-usuario-page'

const SecureRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/tipo-usuario', exact: true, name: 'Tipo Usuário', element: TipoUsuarioPage },
  { path: '/tipo-ocorrencia', exact: true, name: 'Tipo Ocorrência', element: TipoOcorrenciaPage },
  { path: '/setor', exact: true, name: 'Setor', element: SetorPage },
  { path: '/menu', exact: true, name: ' Menu', element: MenuPage },
  { path: '/ocorrencia', exact: true, name: 'Ocorrência', element: OcorrenciaCadastrarPage },
  { path: '/ocorrencia/cadastrar', exact: true, name: 'Cadastrar', element: OcorrenciaCadastrarPage },
  { path: '/ocorrencia/dashboard', exact: true, name: 'Dashboard', element: OcorrenciaDashboardPage },

]

export default SecureRoutes
