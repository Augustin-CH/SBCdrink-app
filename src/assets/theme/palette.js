import { alpha } from '@mui/material/styles'

// ----------------------------------------------------------------------

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24'
}

const PRIMARY_LIGHT = {
  main: '#2065D1',
  color: '#D1E9FC',
  color2: '#76B0F1',
  contrastText: '#000'
}

const PRIMARY_DARK = {
  main: '#2065D1',
  color: '#103996',
  color2: '#061B64',
  contrastText: '#fff'
}

const SECONDARY_LIGHT = {
  main: '#3366FF',
  color: '#D6E4FF',
  color2: '#84A9FF',
  contrastText: '#fff'
}

const SECONDARY_DARK = {
  main: '#3366FF',
  color: '#1939B7',
  color2: '#091A7A',
  contrastText: '#fff'
}

const INFO_LIGHT = {
  main: '#1890FF',
  color: '#D0F2FF',
  color2: '#74CAFF',
  contrastText: '#fff'
}

const INFO_DARK = {
  main: '#1890FF',
  color: '#0C53B7',
  color2: '#04297A',
  contrastText: '#fff'
}

const SUCCESS_LIGHT = {
  main: '#54D62C',
  color: '#E9FCD4',
  color2: '#AAF27F',
  contrastText: GREY[800]
}

const SUCCESS_DARK = {
  main: '#54D62C',
  color: '#229A16',
  color2: '#08660D',
  contrastText: GREY[800]
}

const WARNING_LIGHT = {
  main: '#FFC107',
  color: '#FFF7CD',
  color2: '#FFE16A',
  contrastText: GREY[800]
}

const WARNING_DARK = {
  main: '#FFC107',
  color: '#B78103',
  color2: '#7A4F01',
  contrastText: GREY[800]
}

const ERROR_LIGHT = {
  main: '#FF4842',
  color: '#FFE7D9',
  color2: '#FFA48D',
  contrastText: '#fff'
}

const ERROR_DARK = {
  main: '#FF4842',
  color: '#B72136',
  color2: '#7A0C2E',
  contrastText: '#fff'
}

const paletteLight = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY_LIGHT,
  secondary: SECONDARY_LIGHT,
  info: INFO_LIGHT,
  success: SUCCESS_LIGHT,
  warning: WARNING_LIGHT,
  error: ERROR_LIGHT,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: GREY[800],
    secondary: GREY[600],
    // disabled: GREY[500],
    disabled: '#000'
  },
  background: {
    paper: '#fff',
    default: GREY[100],
    neutral: GREY[200]
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48
  }
}

const paletteDark = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY_DARK,
  secondary: SECONDARY_DARK,
  info: INFO_DARK,
  success: SUCCESS_DARK,
  warning: WARNING_DARK,
  error: ERROR_DARK,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: GREY[200],
    secondary: GREY[600],
    // disabled: GREY[500],
    disabled: '#fff'
  },
  background: {
    paper: GREY[700],
    default: GREY[800],
    neutral: GREY[600]
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48
  }
}

export { paletteLight, paletteDark }
