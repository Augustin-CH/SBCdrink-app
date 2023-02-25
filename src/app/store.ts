import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit'
import { env } from '@/env'
import cocktailReducer from '@/features/cocktail/CocktailSlice'
import notificationReducer from '@/features/notification/notificationSlice'

export const store = configureStore({
  reducer: {
    cocktail: cocktailReducer,
    notification: notificationReducer
  },
  devTools: env.REACT_APP_ENVIRONMENT === 'development'
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
RootState,
unknown,
Action<string>>
