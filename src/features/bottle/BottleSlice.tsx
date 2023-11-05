import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type FetchStatus } from '@/app/shared/types'
import { ApiClient } from '@/lib/http/api'
import {
  type RootState
} from '@/app/store'
import { env } from '@/env'
import { type IUpdateBottles, type IBaseBottle } from '@/features/bottle/types'

const client = ApiClient.Instance()

export interface BottleState {
  listBottles: IBaseBottle[]
  listBottlesStatus: FetchStatus
  error: string | null
}

const initialState: BottleState = {
  listBottles: [] as IBaseBottle[],
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

export const fetchBottles = createAsyncThunk<IBaseBottle[], undefined, { state: RootState }>('bottle/fetchBottles', async () => {
  const resp = await client.get(`${env.REACT_APP_API_URL}/api/machine-configurations`)
  return resp.data
})

export const updateBottles = createAsyncThunk<undefined, IUpdateBottles, { state: RootState }>('bottle/updateBottles', async ({
  bottle
}) => {
  const resp = await client.put(`${env.REACT_APP_API_URL}/api/machine-configurations/${bottle?.slot}`, {
    ingredient: bottle?.ingredientId,
    volume: bottle?.measureVolume,
    name: bottle?.ingredientName,
    slot: bottle?.slot
  })
  return resp.data
})

export default bottleSlice.reducer
