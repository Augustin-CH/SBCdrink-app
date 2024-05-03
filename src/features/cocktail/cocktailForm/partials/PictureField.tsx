import React, { type FC } from 'react'
import { Box, CardMedia } from '@mui/material'
import { useFormikContext } from 'formik'
import { type IFormCocktail } from '@/features/cocktail/types'
import { env } from '@/env'
import styled from '@emotion/styled'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import HideImageIcon from '@mui/icons-material/HideImage'

const PictureField: FC = () => {
  const { values } = useFormikContext<IFormCocktail>()

  const BoxButtons = styled(Box)`
    display: flex;
    justify-content: flex-end;
    .edit-ingredient {
      margin-right: 5px;
    }
    .delete-ingredient, .edit-ingredient {
      // color: red;
      :hover {
        cursor: pointer;
      }
    }
    position: relative;
    top: -15px;
    left: 10px;
    float: right;
    height: 0;
  `

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 120, border: '1px solid #637381', borderRadius: 1, padding: 2, marginTop: '-8.5px' }} component="fieldset">
      <legend style={{ fontSize: 12, padding: '0 5px', color: '#637381' }} >Image</legend>
      {values.picture
        ? (
          <CardMedia
            component="img"
            sx={{ height: 200, marginLeft: 'auto', marginRight: 'auto', width: 'auto' }}
            image={`${env.REACT_APP_API_URL}/public/${values.picture}`}
            alt="Live from space album cover"
            style={{ height: 191.5 }}
          />
          )
        : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <HideImageIcon sx={{ fontSize: 60, height: 191.5 }} />
          </div>
          )
      }
      <BoxButtons>
        <EditIcon
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          // onClick={handleEdit}
          className='edit-ingredient'
        />
        <DeleteIcon
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          // onClick={handleDelete}
          className='delete-ingredient'
        />
      </BoxButtons>
    </Box>
  )
}

export default PictureField
