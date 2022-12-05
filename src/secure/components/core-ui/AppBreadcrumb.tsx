import React from 'react'
import { useLocation } from 'react-router-dom'

import SecureRoutes from '../../pages/secure-routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb: React.FC<any> = (prop) => {

  const currentLocation = useLocation().pathname

  const getRouteName = (pathname: any, routes: any) => {
    const currentRoute = routes.find((route: any) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location: any) => {
    const breadcrumbs: any[] = []
    location.split('/').reduce((prev: any, curr: any, index: any, array: any) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, SecureRoutes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="m-0 ms-2">
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default AppBreadcrumb
