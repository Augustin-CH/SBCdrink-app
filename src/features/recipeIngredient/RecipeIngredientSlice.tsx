import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type IBasePagination, type FetchStatus } from '@/app/shared/types'
import {
  type RootState
} from '@/app/store'
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

export const fetchRecipeIngredients = createAsyncThunk<IBaseRecipeIngredient[], IFetchRecipeIngredients, { state: RootState }>('recipeIngredient/fetchRecipeIngredients', async (recipeIds) => {
  // const { data, error } = await supabase
  //   .from('recipe_ingredient')
  //   .select('*')
  //   .in('recipe', recipeIds)

  // if (error) {
  //   throw new Error(error.message)
  // }

  // return data.map(serializeRecipeIngredient)
  return []
})

const internalActions = ingredientSlice.actions

export const {
  setListStatus,
  setListRecipeIngredients
} = internalActions

export default ingredientSlice.reducer
