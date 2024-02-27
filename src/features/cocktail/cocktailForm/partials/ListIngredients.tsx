import React, { useCallback, type FC } from 'react'
import { type IBaseIngredient } from '@/features/ingredient/types'
import { List, ListItem, Button, Grid } from '@mui/material'
import OrderColumn from './OrderColumn'
import IngredientColumn from './IngredientColumn'
import { useFormikContext } from 'formik'
import { type IFormCocktail } from '@/features/cocktail/types'
import ProportionColumn from './ProportionColumn'
import IsAlcoolColumn from './IsAlcoolColumn'
import { Add, Delete } from '@mui/icons-material'

interface ListIngredientsProps {
  ingredients: IBaseIngredient[]
}

const ListIngredients: FC<ListIngredientsProps> = ({
  ingredients
}) => {
  const { values, setFieldValue } = useFormikContext<IFormCocktail>()

  const handleAddIngredient = useCallback(() => {
    setFieldValue('ingredients', [
      ...values.ingredients,
      {
        id: '',
        isAlcohol: false,
        name: '',
        proportion: 0,
        order: values.ingredients.length + 1 || 1,
        volume: 0
      }
    ])
  }, [setFieldValue, values.ingredients])

  const handleRemoveIngredient = useCallback((event: any) => {
    const { id } = event.currentTarget.dataset
    const newIngredients = values.ingredients.filter((ingredient) => ingredient.id !== +id)
    setFieldValue('ingredients', newIngredients)
  }, [setFieldValue, values.ingredients])

  return (
    <>
      <List sx={{ width: '100%', overflowX: 'auto' }}>
        {values.ingredients?.map((ingredient, index) => (
          <ListItem
            key={`list_bottle_${ingredient.id}_${index}`}
            data-id={ingredient.id}
          >
            <IsAlcoolColumn index={index} />
            <OrderColumn index={index} />
            <IngredientColumn ingredients={ingredients} index={index} />
            <ProportionColumn index={index} />
            <Button
              color="inherit"
              variant="outlined"
              fullWidth
              sx={{ ml: 2, minWidth: 20, width: 20 }}
              data-id={ingredient.id}
              onClick={handleRemoveIngredient}
            >
              <Delete />
            </Button>
          </ListItem>
        ))}
      </List>
      <Grid item sx={{ mb: 2, ml: 2, mr: 2 }}>
        <Button color="inherit" variant="outlined" fullWidth onClick={handleAddIngredient}>
          <Add />
        </Button>
      </Grid>
    </>
  )
}

export default ListIngredients
