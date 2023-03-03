import React, { forwardRef } from 'react'
// @mui
import { Box, type SxProps } from '@mui/material'

interface SvgColorProps {
  src: string
  sx?: SxProps

}

const SvgColor = forwardRef<any, SvgColorProps>(({ src, sx, ...other }, ref) => (
    <Box
        component="span"
        className="svg-color"
        ref={ref}
        sx={{
          width: 24,
          height: 24,
          display: 'inline-block',
          mask: `url(${src}) no-repeat center / contain`,
          WebkitMask: `url(${src}) no-repeat center / contain`,
          ...sx
        }}
        {...other}
    />
))

SvgColor.displayName = 'SvgColor'

export default SvgColor
