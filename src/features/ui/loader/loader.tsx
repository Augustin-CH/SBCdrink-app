import React, { type FC } from 'react'
import { Box, CircularProgress } from '@mui/material'

interface ILoader {
  styles?: React.CSSProperties
}

const Loader: FC<ILoader> = ({
  styles
}) => {
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', ...styles }}>
        <CircularProgress/>
    </Box>
  )
}

export default Loader
