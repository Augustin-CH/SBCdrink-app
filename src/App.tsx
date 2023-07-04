import React, { type FC } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from '@/router'

// @mui material components
import ThemeProvider from '@/assets/theme'
import CssBaseline from '@mui/material/CssBaseline'

const App: FC = () => {
  const appRoutes = useRoutes(routes)
  return (
      <div style={{
        backgroundImage: 'url("/assets/images/beach_summer_2.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh'
      }}>
          <ThemeProvider>
              <CssBaseline />
              {appRoutes}
          </ThemeProvider>
      </div>
  )
}

export default App
