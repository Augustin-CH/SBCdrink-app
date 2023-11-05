import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type FetchStatus } from '@/app/shared/types'
import { ApiClient } from '@/lib/http/api'
import {
  type RootState
} from '@/app/store'
import {
  type IBaseCocktail, type IFormatStepMakeCocktail, type IMakeCocktail
} from './types'
import { env } from '@/env'
import { calculeVolumeIngredient } from './utils'

const client = ApiClient.Instance()

export interface CocktailState {
  selectedCocktail: IBaseCocktail
  listCocktails: IBaseCocktail[]
  listCocktailsStatus: FetchStatus
  singleStatus: FetchStatus
  error: string | null
}

const initialState: CocktailState = {
  selectedCocktail: {} as IBaseCocktail,
  listCocktails: [] as IBaseCocktail[],
  listCocktailsStatus: 'idle',
  singleStatus: 'idle',
  error: null
}

export const cocktailSlice = createSlice({
  name: 'cocktail',
  initialState,
  reducers: {
    setSelectedCocktail (state, action) {
      state.selectedCocktail = action.payload
    }
  },
  extraReducers (builder) {
    builder
      .addCase(fetchAvailableCocktails.pending, (state) => {
        state.listCocktailsStatus = 'loading'
      })
      .addCase(fetchAvailableCocktails.fulfilled, (state, action) => {
        state.listCocktailsStatus = 'succeeded'
        state.listCocktails = action.payload
      })
      .addCase(fetchAvailableCocktails.rejected, (state, action) => {
        state.listCocktailsStatus = 'failed'
        state.error = action.error.code ?? null
      })
      .addCase(fetchCocktails.pending, (state) => {
        state.listCocktailsStatus = 'loading'
      })
      .addCase(fetchCocktails.fulfilled, (state, action) => {
        state.listCocktailsStatus = 'succeeded'
        state.listCocktails = action.payload
      })
      .addCase(fetchCocktails.rejected, (state, action) => {
        state.listCocktailsStatus = 'failed'
        state.error = action.error.code ?? null
      })
  }
})

export const fetchAvailableCocktails = createAsyncThunk<IBaseCocktail[], undefined, { state: RootState }>('cocktail/fetchAvailableCocktails', async () => {
  const resp = await client.get(`${env.REACT_APP_API_URL}/api/recipes/available`)
  return resp.data
})

export const fetchCocktails = createAsyncThunk<IBaseCocktail[], undefined, { state: RootState }>('cocktail/fetchCocktails', async () => {
  const resp = await client.get(`${env.REACT_APP_API_URL}/api/recipes/find`)
  return resp.data
})

export const formatStepMakeCocktail = ({
  rules,
  cocktail
}: IFormatStepMakeCocktail): IMakeCocktail => {
  const { glassVolume, alcoholLevel } = rules
  const { ingredients } = cocktail

  return ingredients.map((ingredient) => {
    return {
      order: ingredient.order,
      ingredient: ingredient.id,
      quantity: calculeVolumeIngredient(alcoholLevel, glassVolume, ingredient)
    }
  })
}

export const makeCocktail = createAsyncThunk<null, IMakeCocktail, { state: RootState }>('cocktail/makeCocktail', async (data) => {
  const resp = await client.post(`${env.REACT_APP_API_URL}/api/cocktail/make`, data)
  return resp.data
})

export const { setSelectedCocktail } = cocktailSlice.actions

export default cocktailSlice.reducer
