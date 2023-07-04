import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type FetchStatus } from '@/app/shared/types'
import { ApiClient } from '@/lib/http/api'
import {
  type RootState
} from '@/app/store'
import {
  type IBaseCocktail, type IFormatStepMakeCocktail, type IMakeCocktail
} from './type'
import { env } from '@/env'

const client = ApiClient.Instance()

export interface CocktailState {
  selectedCocktail: IBaseCocktail
  listCocktails: IBaseCocktail[]

  listStatus: FetchStatus
  singleStatus: FetchStatus
  error: string | null
}

const initialState: CocktailState = {
  selectedCocktail: {} as IBaseCocktail,
  listCocktails: [] as IBaseCocktail[],
  listStatus: 'idle',
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

      .addCase(fetchCocktails.pending, (state) => {
        state.listStatus = 'loading'
      })
      .addCase(fetchCocktails.fulfilled, (state, action) => {
        state.listStatus = 'succeeded'
        state.listCocktails = action.payload
      })
      .addCase(fetchCocktails.rejected, (state, action) => {
        state.listStatus = 'failed'
        state.error = action.error.code ?? null
      })
  }
})

export const fetchCocktails = createAsyncThunk<IBaseCocktail[], undefined, { state: RootState }>('cocktail/fetchCocktails', async () => {
  const resp = await client.get(`${env.REACT_APP_API_URL}/api/recipes/available`)
  return resp.data
})

export const formatStepMakeCocktail = ({
  rules,
  cocktail
}: IFormatStepMakeCocktail): IMakeCocktail => {
  const { glassVolume, alcoholLevel } = rules
  const { ingredients } = cocktail

  const alcoholVolume = glassVolume * (alcoholLevel / 100)
  const noAlcoholVolume = glassVolume - alcoholVolume

  return ingredients.map((ingredient) => {
    return {
      order: ingredient.order,
      ingredient: ingredient.id,
      quantity: Math.round((ingredient.isAlcohol ? alcoholVolume : noAlcoholVolume) * (ingredient.proportion / 100) * 10) / 10
    }
  })
}

export const makeCocktail = createAsyncThunk<null, IMakeCocktail, { state: RootState }>('cocktail/makeCocktail', async (data) => {
  const resp = await client.post(`${env.REACT_APP_API_URL}/api/cocktail/make`, data)
  return resp.data
})

export const { setSelectedCocktail } = cocktailSlice.actions

export default cocktailSlice.reducer
