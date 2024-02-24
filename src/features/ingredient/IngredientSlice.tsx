import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type IBasePagination, type FetchStatus } from '@/app/shared/types'
import {
  type RootState
} from '@/app/store'
import { type IFetchIngredients, type IBaseIngredient } from '@/features/ingredient/types'

export interface IngredientState {
  listIngredients: IBaseIngredient[]
  pagination: IBasePagination
  listIngredientsStatus: FetchStatus
  error: string | null
}

const initialState: IngredientState = {
  listIngredients: [] as IBaseIngredient[],
  pagination: {} as IBasePagination,
  listIngredientsStatus: 'idle',
  error: null
}

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    setListIngredients (state, action) {
      state.listIngredients = action.payload
    },
    setListStatus (state, action) {
      state.listIngredientsStatus = action.payload
    }
  },
  extraReducers (builder) {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.listIngredientsStatus = 'loading'
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.listIngredientsStatus = 'succeeded'
        state.listIngredients = action.payload
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.listIngredientsStatus = 'failed'
        state.error = action.error.code ?? null
      })
  }
})

export const serializeIngredient = (ingredient: any): IBaseIngredient => {
  return {
    id: ingredient.id,
    name: ingredient.name,
    isAlcohol: ingredient.is_alcohol,
    alcoholDegree: ingredient.alcohol_degree,
    updatedAt: ingredient.updated_at,
    createdAt: ingredient.created_at
  }
}

export const fetchIngredients = createAsyncThunk<IBaseIngredient[], IFetchIngredients, { state: RootState }>('ingredient/fetchIngredients', async (ingredientIds) => {
  // const { data, error } = await supabase
  //   .from('ingredient')
  //   .select('*')
  //   .in('id', ingredientIds)

  // if (error) {
  //   throw new Error(error.message)
  // }

  // return data.map(serializeIngredient)
  return []
})

const internalActions = ingredientSlice.actions

export const {
  setListStatus,
  setListIngredients
} = internalActions

export default ingredientSlice.reducer
