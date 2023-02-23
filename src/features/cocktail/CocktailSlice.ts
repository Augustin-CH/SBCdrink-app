import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {FetchStatus} from "@/app/shared/types";
import {ApiClient} from "@/lib/http/api"
import {RootState} from "@/app/store";
import {
    IBaseCocktail, IMakeCocktail
} from './type';
import {env} from "@/env";

const client = ApiClient.Instance();

export interface CocktailState {
    selectedCocktail: IBaseCocktail;
    listCocktails: IBaseCocktail[];

    listStatus: FetchStatus;
    singleStatus: FetchStatus;
    error: string | null;
}

const initialState: CocktailState = {
    selectedCocktail: {} as IBaseCocktail,
    listCocktails: [] as IBaseCocktail[],
    listStatus: 'idle',
    singleStatus: 'idle',
    error: null,
};

export const cocktailSlice = createSlice({
    name: 'cocktail',
    initialState,
    reducers: {
        setSelectedCocktail(state, action) {
            console.log(action.payload)
            state.selectedCocktail = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCocktails.pending, (state, action) => {
                state.listStatus = 'loading'
            })
            .addCase(fetchCocktails.fulfilled, (state, action) => {
                state.listStatus = 'succeeded'
                state.listCocktails = action.payload
            })
            .addCase(fetchCocktails.rejected, (state, action) => {
                state.listStatus = 'failed'
                state.error = action.error.code || null
            })
    },
});

export const fetchCocktails = createAsyncThunk<IBaseCocktail[], void, { state: RootState }>('cocktail/fetchCocktails', async () => {
    const resp = await client.get(`${env.REACT_APP_API_URL}/api/recipes/available`);
    return resp.data;
})

export const makeCocktail = createAsyncThunk<IMakeCocktail, void, { state: RootState }>('cocktail/makeCocktail', async () => {
    const resp = await client.get(`${env.REACT_APP_API_URL}/api/make/cocktail`);
    return resp.data;
})

export const {setSelectedCocktail} = cocktailSlice.actions;

export default cocktailSlice.reducer;
