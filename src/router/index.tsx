import React from 'react'
import Main from '@/layouts/Main'
import Dashboard from '@/layouts/Dashboard'
import { Navigate } from 'react-router-dom'
import paths from './paths'
import LocalBarIcon from '@mui/icons-material/LocalBar'
import LiquorIcon from '@mui/icons-material/Liquor'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import SettingsIcon from '@mui/icons-material/Settings'
import Home from '@/pages/Home'
import Bottle from '@/pages/dashboard/Bottle'
import Cocktail from '@/pages/dashboard/Cocktail'
import Ingredient from '@/pages/dashboard/Ingredient'
import Setting from '@/pages/dashboard/Setting'

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
    element: <Dashboard/>,
    path: paths.dashboard.index,
    children: [
      {
        path: paths.dashboard.bottle,
        element: <Bottle/>,
        sidebar: {
          label: 'Bouteilles',
          icon: <LiquorIcon/>,
          page: 'bottle',
          position: 1
        }
      },
      {
        path: paths.dashboard.cocktail,
        element: <Cocktail/>,
        sidebar: {
          label: 'Cocktails',
          icon: <LocalBarIcon/>,
          page: 'cocktail',
          position: 2
        }
      },
      {
        path: paths.dashboard.ingredient,
        element: <Ingredient/>,
        sidebar: {
          label: 'Ingredients',
          icon: <WaterDropIcon/>,
          page: 'ingredient',
          position: 3
        }
      },
      {
        path: paths.dashboard.setting,
        element: <Setting/>,
        sidebar: {
          label: 'Paramètres',
          icon: <SettingsIcon/>,
          page: 'setting',
          position: 4
        }
      }
    ]
  },
  {
    element: <Main/>,
    children: [
      {
        path: paths.home,
        element: <Home/>
      },
      {
        path: '*',
        element: <Navigate to={paths.home} replace/>
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
