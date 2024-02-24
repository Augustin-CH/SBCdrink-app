import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type FetchStatus } from '@/app/shared/types'
import { ApiClient } from '@/lib/http/api'
import {
  type RootState
} from '@/app/store'
import {
  type IUpdateCocktail, type IBaseCocktail, type IFormatStepMakeCocktail,
  type IMakeCocktail, type ICreateCocktail, type IPopulateCocktail
} from './types'
import { env } from '@/env'
import { calculeVolumeIngredient } from './utils'
import { useAppSelector } from '@/app/hooks'

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

export const fetchAvailableCocktails = createAsyncThunk<IBaseCocktail[], undefined, { state: RootState }>('cocktail/fetchAvailableCocktails', async () => {
  const resp = await client.get(`${env.REACT_APP_API_URL}/v1/recipes?isAvailable=true`)
  return resp.data
})

export const fetchCocktails = createAsyncThunk<IBaseCocktail[], undefined, { state: RootState }>('cocktail/fetchCocktails', async () => {
  const resp = await client.get(`${env.REACT_APP_API_URL}/api/recipes/find`)
  return resp.data
})

export const populate = (cocktail: IBaseCocktail[]): IPopulateCocktail[] => {
  const { listIngredients } = useAppSelector(state => state.ingredient)
  const { listRecipeIngredients } = useAppSelector(state => state.recipeIngredient)

  return cocktail.map((cocktail) => ({
    ...cocktail,
    recipeIngredients: listRecipeIngredients.filter((recipeIngredient) => recipeIngredient.recipe === cocktail.id).map((recipeIngredient) => {
      const ingredient = listIngredients.find((ingredient) => ingredient.id === recipeIngredient.ingredient)
      return {
        ...recipeIngredient,
        ingredient: ingredient ?? {} as any
      }
    })
  }))
}

export const formatStepMakeCocktail = ({
  rules,
  cocktail
}: IFormatStepMakeCocktail): IMakeCocktail => {
  const { glassVolume, alcoholLevel } = rules
  const { recipeIngredients } = cocktail

  const steps = recipeIngredients?.map(({ ingredient, orderIndex, proportion }) => {
    return {
      order: orderIndex,
      ingredientId: ingredient.id,
      ingredientName: ingredient.name,
      ingredientIsAlcohol: ingredient.isAlcohol,
      ingredientAlcoholDegree: ingredient.alcoholDegree,
      quantity: calculeVolumeIngredient(alcoholLevel, glassVolume, proportion, ingredient.isAlcohol)
    }
  })

  return {
    recipeId: cocktail.id,
    recipeName: cocktail.name,
    alcoholLevel: cocktail.alcoholLevel,
    steps
  }
}

export const makeCocktail = createAsyncThunk<null, IMakeCocktail, { state: RootState }>('cocktail/makeCocktail', async (orderData) => {
  // const { data, error } = await supabase
  //   .rpc('insert_order_and_step', {
  //     p_recipe_name: orderData.recipeName,
  //     p_alcohol_level: orderData.alcoholLevel,
  //     p_steps: orderData.steps?.map((step) => ({
  //       ingredient_name: step.ingredientName,
  //       ingredient_is_alcohol: step.ingredientIsAlcohol,
  //       ingredient_alcohol_degree: step.ingredientAlcoholDegree,
  //       quantity: step.quantity
  //     }))
  //   })
  // console.log(data, error)

  // if (error) {
  //   throw new Error(error.message)
  // }

  // return data as unknown as null
  return null
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
