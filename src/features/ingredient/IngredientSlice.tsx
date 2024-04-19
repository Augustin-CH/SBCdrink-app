import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type IBasePagination, type FetchStatus } from '@/app/shared/types'
import {
  type RootState
} from '@/app/store'
import { type IUpdateIngredient, type IBaseIngredient } from '@/features/ingredient/types'
import { env } from '@/env'
import { ApiClient } from '@/lib/http/api'

const client = ApiClient.Instance()

export interface IngredientState {
  selectedIngredient: IBaseIngredient
  listIngredients: IBaseIngredient[]
  pagination: IBasePagination
  listIngredientsStatus: FetchStatus
  error: string | null
}

const initialState: IngredientState = {
  selectedIngredient: {} as IBaseIngredient,
  listIngredients: [] as IBaseIngredient[],
  pagination: {} as IBasePagination,
  listIngredientsStatus: 'idle',
  error: null
}

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    setSelectedIngredient (state, action) {
      state.selectedIngredient = action.payload
    },
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

export const fetchIngredients = createAsyncThunk<IBaseIngredient[], undefined, { state: RootState }>('ingredient/fetchIngredients', async () => {
  const resp = await client.get(`${env.REACT_APP_API_URL}/v1/ingredients`)
  return resp.data
})

export const updateIngredients = createAsyncThunk<IBaseIngredient, IUpdateIngredient, { state: RootState }>('ingredient/updateIngredients', async (
  ingredient,
  { dispatch, getState }
) => {
  const resp = await client.put(`${env.REACT_APP_API_URL}/v1/ingredient/${ingredient?.id}`, ingredient)
  const { listIngredients } = getState().ingredient
  const newListIngredients = [...listIngredients]
  const index = newListIngredients.findIndex((i) => i.id === ingredient.id)
  newListIngredients[index] = resp.data
  dispatch(setListIngredients(newListIngredients))
  return resp.data
})

const internalActions = ingredientSlice.actions

export const {
  setSelectedIngredient,
  setListStatus,
  setListIngredients
} = internalActions

export default ingredientSlice.reducer
