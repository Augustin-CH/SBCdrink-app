import React, { useCallback, useMemo, type FC } from 'react'
import { Box, CardMedia } from '@mui/material'
import { useFormikContext } from 'formik'
import { type IFormCocktail } from '@/features/cocktail/types'
import { env } from '@/env'
import styled from '@emotion/styled'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import HideImageIcon from '@mui/icons-material/HideImage'

const PictureField: FC = () => {
  const { values, setFieldValue } = useFormikContext<IFormCocktail>()

  const InputRef = React.useRef<HTMLInputElement | null>(null)

  const BoxButtons = styled(Box)`
    .edit-ingredient {
      margin-right: 5px;
    }
    .delete-ingredient, .edit-ingredient {
      // color: red;
      :hover {
        cursor: pointer;
      }
    }
    display: flex;
    justify-content: center;
    padding: 4px;
    border-top: 1px solid #637381;
  `

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  })

  const handleEdit = useCallback(() => {
    InputRef.current?.click()
  }, [InputRef])

  const handleChangePicture = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFieldValue('picture', e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }, [values])

  const renderPicture = useMemo(() => {
    if (values?.picture?.includes('base64')) {
      return values.picture
    }
    return `${env.REACT_APP_API_URL}/public/${values.picture}`
  }, [values.picture])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 120, border: '1px solid #5d6975', borderRadius: 1, padding: 0, marginTop: '-8.5px', height: 255 }} component="fieldset">
      <legend style={{ fontSize: 12, padding: '0 5px', marginLeft: 8, color: '#637381' }} >Image</legend>
      {values.picture
        ? (
          <CardMedia
            component="img"
            sx={{ height: 200, width: 120, marginLeft: 'auto', marginRight: 'auto', marginBottom: 1, marginTop: 1, overflow: 'hidden' }}
            image={renderPicture}
            alt="Live from space album cover"
          />
          )
        : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <HideImageIcon sx={{ fontSize: 60, height: 202.5 }} />
          </div>
          )
      }
      <BoxButtons>

        <EditIcon
          className='edit-ingredient'
          onClick={handleEdit}
        />
        <VisuallyHiddenInput
          type="file"
          ref={InputRef}
          name="picture"
          id="picture"
          accept="image/*"
          onChange={handleChangePicture}
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
