import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {env} from '@/env';
import cocktailSlice from "@/features/cocktail/CocktailSlice";

export const store = configureStore({
    reducer: {
        cocktail: cocktailSlice,
    },
    devTools: env.REACT_APP_ENVIRONMENT === "development"
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
