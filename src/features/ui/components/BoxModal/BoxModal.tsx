import { styled } from '@mui/material/styles'

const BoxModal = styled('div')(({ theme }) => ({
  maxWidth: 600,
  minWidth: 350,
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  padding: 20,
  borderRadius: 10,
  boxShadow: theme.shadows[5],
  maxHeight: '95vh',
  minHeight: 300,
  overflow: 'auto',
  margin: 20
}))

export { BoxModal }
