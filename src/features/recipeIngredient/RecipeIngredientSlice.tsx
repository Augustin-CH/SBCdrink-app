import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type IBasePagination, type FetchStatus } from '@/app/shared/types'
import {
  type RootState
} from '@/app/store'
import supabase, { setUnsubscribeRecipeIngredients, unsubscribeRecipeIngredients } from '@/lib/supabase/supabase'
import { type IBaseRecipeIngredient, type IFetchRecipeIngredients } from './types'

export interface IngredientState {
  listRecipeIngredients: IBaseRecipeIngredient[]
  pagination: IBasePagination
  listRecipeIngredientsStatus: FetchStatus
  error: string | null
}

const initialState: IngredientState = {
  listRecipeIngredients: [] as IBaseRecipeIngredient[],
  pagination: {} as IBasePagination,
  listRecipeIngredientsStatus: 'idle',
  error: null
}

export const ingredientSlice = createSlice({
  name: 'recipeIngredient',
  initialState,
  reducers: {
    setListRecipeIngredients (state, action) {
      state.listRecipeIngredients = action.payload
    },
    setListStatus (state, action) {
      state.listRecipeIngredientsStatus = action.payload
    }
  },
  extraReducers (builder) {
    builder
      .addCase(fetchRecipeIngredients.pending, (state) => {
        state.listRecipeIngredientsStatus = 'loading'
      })
      .addCase(fetchRecipeIngredients.fulfilled, (state, action) => {
        state.listRecipeIngredientsStatus = 'succeeded'
        state.listRecipeIngredients = action.payload
      })
      .addCase(fetchRecipeIngredients.rejected, (state, action) => {
        state.listRecipeIngredientsStatus = 'failed'
        state.error = action.error.code ?? null
      })
  }
})

export const serializeRecipeIngredient = (recipeIngredient: any): IBaseRecipeIngredient => {
  return {
    id: recipeIngredient.id,
    recipe: recipeIngredient.recipe,
    ingredient: recipeIngredient.ingredient,
    orderIndex: recipeIngredient.order_index,
    proportion: recipeIngredient.proportion
  }
}

export const listenRecipeIngredients = createAsyncThunk<unknown, IFetchRecipeIngredients, { state: RootState }>('recipeIngredient/listenRecipeIngredients', async (recipeIds, { getState, dispatch }) => {
  dispatch(internalActions.setListRecipeIngredients([]))
  dispatch(fetchRecipeIngredients(recipeIds))
  dispatch(internalActions.setListStatus('loading'))
  unsubscribeRecipeIngredients()

  const channel = supabase
    .channel('reicpe-ingredient-table-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'recipe_ingredient',
        filter: `recipe.in.${recipeIds.join(',')}`
      },
      (payload) => {
        console.log('recipe_ingredient', payload)
        dispatch(internalActions.setListStatus('succeeded'))

        const { listRecipeIngredients } = getState().recipeIngredient
        const newListRecipeIngredients = [...listRecipeIngredients]
        // @ts-expect-error bad typing payload
        const index = newListRecipeIngredients.findIndex((recipe) => recipe.id === payload.old.id)
        const ingredient = serializeRecipeIngredient(payload.new)

        switch (payload.eventType) {
          case 'INSERT':
            if (payload.new.is_available) newListRecipeIngredients.push(ingredient)
            break
          case 'UPDATE':
            if (index === -1) {
              newListRecipeIngredients.push(ingredient)
            } else {
              newListRecipeIngredients[index] = ingredient
            }
            break
          case 'DELETE':
            newListRecipeIngredients.splice(index, 1)
            break
          default:
            break
        }

        dispatch(internalActions.setListRecipeIngredients(newListRecipeIngredients))
      }
    )
    .subscribe()

  setUnsubscribeRecipeIngredients(channel)
})

export const fetchRecipeIngredients = createAsyncThunk<IBaseRecipeIngredient[], IFetchRecipeIngredients, { state: RootState }>('recipeIngredient/fetchRecipeIngredients', async (recipeIds) => {
  const { data, error } = await supabase
    .from('recipe_ingredient')
    .select('*')
    .in('recipe', recipeIds)

  if (error) {
    throw new Error(error.message)
  }

  return data.map(serializeRecipeIngredient)
})

const internalActions = ingredientSlice.actions

export const {
  setListStatus,
  setListRecipeIngredients
} = internalActions

export default ingredientSlice.reducer
