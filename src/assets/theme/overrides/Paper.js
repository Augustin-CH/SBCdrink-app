// ----------------------------------------------------------------------

export default function Paper () {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)'
        }
      }
    }
  }
}
