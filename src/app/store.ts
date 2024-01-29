import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit'
import { env } from '@/env'
import cocktailReducer from '@/features/cocktail/CocktailSlice'
import notificationReducer from '@/features/notification/notificationSlice'
import bottleReducer from '@/features/bottle/BottleSlice'
import ingredientReducer from '@/features/ingredient/IngredientSlice'
import recipeIngredientReducer from '@/features/recipeIngredient/RecipeIngredientSlice'

export const store = configureStore({
  reducer: {
    bottle: bottleReducer,
    cocktail: cocktailReducer,
    ingredient: ingredientReducer,
    notification: notificationReducer,
    recipeIngredient: recipeIngredientReducer
  },
  devTools: env.REACT_APP_ENVIRONMENT === 'development'
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
RootState,
unknown,
Action<string>>
