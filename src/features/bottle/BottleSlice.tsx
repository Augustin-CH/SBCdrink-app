import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type FetchStatus } from '@/app/shared/types'
import { ApiClient } from '@/lib/http/api'
import {
  type RootState
} from '@/app/store'
import { env } from '@/env'
import { type IUpdateBottles, type IBaseBottle, type IPopulatedBottle } from '@/features/bottle/types'

const client = ApiClient.Instance()

export interface BottleState {
  listBottles: IPopulatedBottle[]
  listBottlesStatus: FetchStatus
  error: string | null
}

const initialState: BottleState = {
  listBottles: [] as IPopulatedBottle[],
  listBottlesStatus: 'idle',
  error: null
}

export const bottleSlice = createSlice({
  name: 'bottle',
  initialState,
  reducers: {
  },
  extraReducers (builder) {
    builder
      .addCase(fetchBottles.pending, (state) => {
        state.listBottlesStatus = 'loading'
      })
      .addCase(fetchBottles.fulfilled, (state, action) => {
        state.listBottlesStatus = 'succeeded'
        state.listBottles = action.payload
      })
      .addCase(fetchBottles.rejected, (state, action) => {
        state.listBottlesStatus = 'failed'
        state.error = action.error.code ?? null
      })
  }
})

export const fetchBottles = createAsyncThunk<IPopulatedBottle[], undefined, { state: RootState }>('bottle/fetchBottles', async () => {
  const resp = await client.get(`${env.REACT_APP_API_URL}/v1/machine-configurations?withIngredients=true`)
  return resp.data
})

export const updateBottle = createAsyncThunk<IBaseBottle, IUpdateBottles, { state: RootState }>('ingredient/updateIngredients', async (
  bottle,
  { dispatch, rejectWithValue }
) => {
  return await new Promise((resolve, reject) => {
    client.put(`${env.REACT_APP_API_URL}/v1/machine-configuration/${bottle.id}`, bottle)
      .then((resp) => {
        dispatch(fetchBottles())
        resolve(resp.data)
      })
      .catch((e) => {
        reject(rejectWithValue(e))
      })
  })
})

export default bottleSlice.reducer
