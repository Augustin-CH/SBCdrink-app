import React, { useState } from 'react'
import PropTypes from 'prop-types'
// @mui
import { CssBaseline } from '@mui/material'
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles'
//
import { paletteLight, paletteDark } from './palette'
import shadows from './shadows'
import typography from './typography'
import GlobalStyles from './globalStyles'
import customShadows from './customShadows'
import componentsOverride from './overrides'

export const ColorModeContext = React.createContext()

ThemeProvider.propTypes = {
  children: PropTypes.node
}

export default function ThemeProvider ({ children }) {
  const [mode, setMode] = useState('dark')

  const getDesignTokens = () => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? paletteLight
        : paletteDark
      )
    },
    shape: { borderRadius: 6 },
    typography,
    shadows: shadows(),
    customShadows: customShadows()
  })

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  theme.components = componentsOverride(theme)

  return (
    <StyledEngineProvider injectFirst>
      <ColorModeContext.Provider value={{
        mode,
        setMode
      }} >
        <MUIThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          {children}
        </MUIThemeProvider>
        </ColorModeContext.Provider>
    </StyledEngineProvider>
  )
}
