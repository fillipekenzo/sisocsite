import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter: React.FC<any> = (prop) => {
  return (
    <CFooter>
      <div>
        <a href="https://www.ifms.edu.br/" target="_blank" rel="noopener noreferrer">
          IFMS
        </a>
        <span className="ms-1">&reg; 2022 SISOC</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Desenvolvido por</span>
        <a href="https://github.com/fillipekenzo" target="_blank" rel="noopener noreferrer">
          Fillipe Kenzo Yamasaki Sawamura
        </a>
      </div>
    </CFooter>
  )
}

export default AppFooter
