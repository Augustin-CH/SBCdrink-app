import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Slug, type FetchStatus } from '@/app/shared/types'
import { ApiClient } from '@/lib/http/api'
import {
  type RootState
} from '@/app/store'
import {
  type IUpdateCocktail, type IBaseCocktail, type IFormatStepMakeCocktail,
  type IMakeCocktail, type ICreateCocktail,
  type IPopulatedCocktail
} from './types'
import { env } from '@/env'
import { calculeVolumeIngredient } from './utils'

const client = ApiClient.Instance()

export interface CocktailState {
  selectedCocktail: IPopulatedCocktail
  listCocktails: IPopulatedCocktail[]
  listCocktailsStatus: FetchStatus
  singleStatus: FetchStatus
  error: string | null
}

const initialState: CocktailState = {
  selectedCocktail: {} as IPopulatedCocktail,
  listCocktails: [] as IPopulatedCocktail[],
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
    },
    setListCocktails (state, action) {
      state.listCocktails = action.payload
    },
    setListStatus (state, action) {
      state.listCocktailsStatus = action.payload
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

export const fetchAvailableCocktails = createAsyncThunk<IPopulatedCocktail[], undefined, { state: RootState }>('cocktail/fetchAvailableCocktails', async () => {
  const resp = await client.get(`${env.REACT_APP_API_URL}/v1/recipes?isAvailable=true&withIngredients=true`)
  return resp.data
})

export const fetchCocktails = createAsyncThunk<IPopulatedCocktail[], undefined, { state: RootState }>('cocktail/fetchCocktails', async () => {
  const resp = await client.get(`${env.REACT_APP_API_URL}/v1/recipes?withIngredients=true&sort=desc`)
  return resp.data
})

export const formatStepMakeCocktail = ({
  rules,
  cocktail
}: IFormatStepMakeCocktail): IMakeCocktail => {
  const { glassVolume, alcoholLevel } = rules
  const { steps } = cocktail

  const stepsMake = steps?.map(({ ingredient, orderIndex, proportion }) => {
    return {
      orderIndex,
      ingredient: ingredient.id,
      quantity: calculeVolumeIngredient(alcoholLevel, glassVolume, proportion, ingredient.isAlcohol)
    }
  })

  return {
    recipe: cocktail.id,
    steps: stepsMake
  }
}

export const makeCocktail = createAsyncThunk<null, IMakeCocktail, { state: RootState }>('cocktail/makeCocktail', async (orderData) => {
  const resp = await client.post(`${env.REACT_APP_API_URL}/v1/order`, orderData)
    .catch((error) => {
      const slug = error.response?.data?.slug

      if (slug === Slug.ErrOrderAlreadyInStatusCreated) {
        throw new Error('Il y a des commandes en cours. Impossible de procéder.')
      }

      throw new Error("Une erreur est survenue lors de l'envoi de la demande de cocktail")
    })
  return resp.data
})

export const updateCocktail = createAsyncThunk<IBaseCocktail, IUpdateCocktail, { state: RootState }>('cocktail/updateCocktail', async (
  cocktail,
  { dispatch, getState, rejectWithValue }
) => {
  return await new Promise((resolve, reject) => {
    client.put(`${env.REACT_APP_API_URL}/v1/recipe/${cocktail.id}`, cocktail)
      .then((resp) => {
        dispatch(fetchCocktails())
        resolve(resp.data)
      })
      .catch((e) => {
        reject(rejectWithValue(e))
      })
  })
})

export const createCocktail = createAsyncThunk<IBaseCocktail, ICreateCocktail, { state: RootState }>('cocktail/updateCocktail', async (data, { dispatch }) => {
  const resp = await client.post(`${env.REACT_APP_API_URL}/api/recipes`, { data })
  dispatch(fetchCocktails())
  return resp.data
})

const internalActions = cocktailSlice.actions

export const {
  setSelectedCocktail,
  setListCocktails,
  setListStatus
} = internalActions

export default cocktailSlice.reducer
