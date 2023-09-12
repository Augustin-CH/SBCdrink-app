import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type IBasePagination, type FetchStatus } from '@/app/shared/types'
import { ApiClient } from '@/lib/http/api'
import {
  type RootState
} from '@/app/store'
import { env } from '@/env'
import { type IFetchIngredients, type IBaseIngredient } from '@/features/ingredient/types'

const client = ApiClient.Instance()

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
  },
  extraReducers (builder) {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.listIngredientsStatus = 'loading'
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.listIngredientsStatus = 'succeeded'
        state.listIngredients = action.payload.data.map(({ id, attributes }) => ({ id, ...attributes })) as IBaseIngredient[]
        state.pagination = action.payload.meta.pagination
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.listIngredientsStatus = 'failed'
        state.error = action.error.code ?? null
      })
  }
})

export const fetchIngredients = createAsyncThunk<IFetchIngredients, undefined, { state: RootState }>('ingredient/fetchIngredients', async () => {
  const resp = await client.get(`${env.REACT_APP_API_URL}/api/ingredients`)
  return resp.data
})

export default ingredientSlice.reducer
