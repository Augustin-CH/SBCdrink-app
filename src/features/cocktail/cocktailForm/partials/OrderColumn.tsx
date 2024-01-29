import React, { type FC } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { type IFormCocktail } from '@/features/cocktail/types'
import { useFormikContext } from 'formik'

interface OrderColumnProps {
  index: number
}

const OrderColumn: FC<OrderColumnProps> = ({
  index
}) => {
  const formik = useFormikContext<IFormCocktail>()

  const handleChangeOrder = (value: number, index: number) => {
    formik.setFieldValue(`ingredients[${index}].orderIndex`, value)
  }

  return (
    <FormControl fullWidth sx={{ margin: '5px 10px 5px 0px', minWidth: 70, width: 'auto' }} >
      <InputLabel id={`ingredient[${index}].id`}>Ordre</InputLabel>
      <Select
        labelId={`ingredient[${index}].id`}
        id="select"
        value={formik.values.ingredients[index].orderIndex}
        label="Ordre"
        name={`ingredient[${index}].id`}
        onChange={(e) => handleChangeOrder(+e.target.value, index)}
      >
        {formik.values.ingredients.map((_, orderIndex) => {
          orderIndex = orderIndex + 1
          return (
            <MenuItem key={`item_order_${orderIndex}`} value={orderIndex}>{orderIndex}</MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default OrderColumn
