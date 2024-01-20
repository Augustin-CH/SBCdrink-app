import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type FetchStatus } from '@/app/shared/types'
import { ApiClient } from '@/lib/http/api'
import {
  type RootState
} from '@/app/store'
import {
  type IUpdateCocktail, type IBaseCocktail, type IFormatStepMakeCocktail,
  type IMakeCocktail, type ICreateCocktail
} from './types'
import { env } from '@/env'
import { calculeVolumeIngredient } from './utils'
import supabase, { unsubscribeCocktails } from '@/lib/supabase/supabase'

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

export const listenCocktails = createAsyncThunk<unknown, undefined, { state: RootState }>('cocktail/listenCocktails', async (_, { getState, dispatch }) => {
  dispatch(fetchAvailableCocktails())
  dispatch(internalActions.setListStatus('loading'))
  dispatch(internalActions.setListCocktails([]))
  unsubscribeCocktails()

  supabase
    .channel('table-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'recipe'
      },
      (payload) => {
        dispatch(internalActions.setListStatus('succeeded'))

        const { listCocktails } = getState().cocktail
        const newListCoctails = [...listCocktails]
        // @ts-expect-error bad typing payload
        const index = newListCoctails.findIndex((cocktail) => cocktail.id === payload.old.id)

        switch (payload.eventType) {
          case 'INSERT':
            console.log('INSERT')
            if (payload.new.is_available) newListCoctails.push(payload.new as IBaseCocktail)
            break
          case 'UPDATE':
            console.log('UPDATE', index)
            if (payload.new.is_available) {
              if (index === -1) {
                newListCoctails.push(payload.new as IBaseCocktail)
              } else {
                newListCoctails[index] = payload.new as IBaseCocktail
              }
            } else {
              newListCoctails.splice(index, 1)
            }
            break
          case 'DELETE':
            console.log('DELETE')
            newListCoctails.splice(index, 1)
            break
          default:
            break
        }

        dispatch(internalActions.setListCocktails(newListCoctails))
      }
    )
    .subscribe()
})

export const fetchAvailableCocktails = createAsyncThunk<IBaseCocktail[], undefined, { state: RootState }>('cocktail/fetchAvailableCocktails', async () => {
  const { data, error } = await supabase
    .from('recipe')
    .select('*')
    .eq('is_available', true)

  if (error) {
    throw new Error(error.message)
  }

  return data as unknown as IBaseCocktail[]
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

  return ingredients?.map((ingredient) => {
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

export const updateCocktail = createAsyncThunk<IBaseCocktail, IUpdateCocktail, { state: RootState }>('cocktail/updateCocktail', async (data, { dispatch }) => {
  const resp = await client.put(`${env.REACT_APP_API_URL}/api/recipes/${data.id}`, { data })
  dispatch(fetchCocktails())
  return resp.data
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
