import React from 'react'
import TipoOcorrenciaPage from './TipoOcorrencia/tipo-ocorrencia-page'
import TipoUsuarioPage from './TipoUsuario/tipo-usuario-page'

const SecureRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/tipo-usuario', exact: true, name: 'Tipo Usuário', element: TipoUsuarioPage },
  { path: '/tipo-ocorrencia', exact: true, name: 'Tipo Ocorrência', element: TipoOcorrenciaPage },
  { path: '/setor', exact: true, name: 'Setor', element: TipoOcorrenciaPage },

]

export default SecureRoutes
