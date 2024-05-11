import React, { useMemo, type FC, useCallback } from 'react'
import { type IBaseIngredient } from '@/features/ingredient/types'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useFormikContext } from 'formik'
import { type IFormCocktail } from '@/features/cocktail/types'

interface IngredientColumnProps {
  ingredients: IBaseIngredient[]
  index: number
}

const IngredientColumn: FC<IngredientColumnProps> = ({
  ingredients,
  index
}) => {
  const formik = useFormikContext<IFormCocktail>()

  const ingredientList = useMemo(() => ingredients.map((ingredient) => ({
    value: ingredient.id,
    label: ingredient.name
  })), [ingredients])

  const handleChangeIngredient = useCallback((value: string, index: number) => {
    const targetIngredient = ingredients.find((ingredient) => ingredient.id === value)
    formik.setFieldValue(`ingredients[${index}]`, {
      ...formik.values.ingredients[index],
      ...targetIngredient
    })
  }, [ingredients, formik.values.ingredients])

  return (
    <FormControl fullWidth sx={{ margin: '5px 10px 5px 0px', minWidth: 150 }} >
      <InputLabel id={`ingredient[${index}].id`}>Ingredient</InputLabel>
      <Select
        labelId={`ingredient[${index}].id`}
        id="select"
        value={formik.values.ingredients[index].id}
        label="Ingredient"
        name={`ingredient[${index}].id`}
        onChange={(e) => handleChangeIngredient(e.target.value, index)}
      >
        {ingredientList.map(({ value, label }) => (
          <MenuItem key={`item_ingredient_${value}`} value={value}>{label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default IngredientColumn
