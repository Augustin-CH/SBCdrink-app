import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit'
import { env } from '@/env'
import cocktailReducer from '@/features/cocktail/CocktailSlice'
import notificationReducer from '@/features/notification/notificationSlice'
import bottleReducer from '@/features/bottle/BottleSlice'
import ingredientReducer from '@/features/ingredient/IngredientSlice'
import fileReducer from '@/features/file/FileSlice'
import settingReducer from '@/features/setting/SettingSlice'

export const store = configureStore({
  reducer: {
    bottle: bottleReducer,
    cocktail: cocktailReducer,
    ingredient: ingredientReducer,
    notification: notificationReducer,
    file: fileReducer,
    setting: settingReducer
  },
  devTools: env.REACT_APP_ENVIRONMENT === 'development'
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
RootState,
unknown,
Action<string>>
