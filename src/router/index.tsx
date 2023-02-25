import React from 'react'
import Main from '@/layouts/Main'
import Home from '@/pages/Home'
import { Navigate } from 'react-router-dom'

export interface RouteConstants {
  element: any
  path?: string
  children?: RouteConstants[]
  sidebar?: {
    label: string
    icon: any
    page: string
    // rolesGuard: StaffRole[];
    position: number
  }
}

export const routes: RouteConstants[] = [
  {
    element: <Main/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '*',
        element: <Navigate to="/" replace/>
      }
    ]
  }
]

const flatRoutesArrayOfPaths = (routes: RouteConstants[]): RouteConstants[] => {
  return routes.reduce((acc: RouteConstants[], route: RouteConstants) => {
    if (route.path != null) {
      acc.push(route)
    }
    if (route.children != null) {
      acc = acc.concat(flatRoutesArrayOfPaths(route.children))
    }
    return acc
  }, [])
}

export const sidebarRoutes = flatRoutesArrayOfPaths(routes).filter(r => r.sidebar).sort((a, b) => {
  return a.sidebar?.position && b.sidebar?.position ? a.sidebar.position - b.sidebar.position : 0
})

export const flattenRoutes = () => flatRoutesArrayOfPaths(routes)
