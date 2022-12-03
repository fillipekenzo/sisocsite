import React from 'react'
import MenuPage from './Menu/menu-page'
import OcorrenciaCadastrarPage from './Ocorrencia/CadastrarOcorrencia/ocorrencia-cadastro-page'
import OcorrenciaDashboardPage from './Ocorrencia/DashboardOcorrencia/ocorrencia-dashboard-page'
import OcorrenciaEditarPage from './Ocorrencia/EditarOcorrencia/ocorrencia-editar-page'
import OcorrenciaVisualizarPage from './Ocorrencia/VisualizarOcorrencia/ocorrencia-visualizar-page'
import PermissaoPage from './Permissao/permissao-page'
import SetorPage from './Setor/setor-page'
import TipoOcorrenciaPage from './TipoOcorrencia/tipo-ocorrencia-page'
import TipoUsuarioPage from './TipoUsuario/tipo-usuario-page'
import UsuarioPage from './Usuario/usuario-page'

const SecureRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/tipo-usuario', exact: true, name: 'Tipo Usuário', element: TipoUsuarioPage },
  { path: '/tipo-ocorrencia', exact: true, name: 'Tipo Ocorrência', element: TipoOcorrenciaPage },
  { path: '/setor', exact: true, name: 'Setor', element: SetorPage },
  { path: '/menu', exact: true, name: ' Menu', element: MenuPage },
  { path: '/permissao', exact: true, name: 'Permissao', element: PermissaoPage },
  { path: '/usuario', exact: true, name: 'Usuário', element: UsuarioPage },
  { path: '/ocorrencia', exact: true, name: 'Ocorrência', element: OcorrenciaCadastrarPage },
  { path: '/ocorrencia/cadastrar', exact: true, name: 'Cadastrar', element: OcorrenciaCadastrarPage },
  { path: '/ocorrencia/consultar', exact: true, name: 'Consultar', element: OcorrenciaCadastrarPage },
  { path: '/ocorrencia/visualizar', exact: true, name: 'Visualizar', element: OcorrenciaVisualizarPage },
  { path: '/ocorrencia/editar', exact: true, name: 'Editar', element: OcorrenciaEditarPage },
  { path: '/ocorrencia/dashboard', exact: true, name: 'Dashboard', element: OcorrenciaDashboardPage },

]

export default SecureRoutes
