import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type FetchStatus } from '@/app/shared/types'
import {
  type RootState
} from '@/app/store'
import { type IUpdateSetting, type IBaseSetting } from '@/features/setting/types'
import { env } from '@/env'
import { ApiClient } from '@/lib/http/api'

const client = ApiClient.Instance()

export interface IngredientState {
  setting: IBaseSetting
  settingStatus: FetchStatus
  error: string | null
}

const initialState: IngredientState = {
  setting: {} as IBaseSetting,
  settingStatus: 'idle',
  error: null
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setSetting (state, action) {
      state.setting = action.payload
    },
    setSettingStatus (state, action) {
      state.settingStatus = action.payload
    }
  },
  extraReducers (builder) {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.settingStatus = 'loading'
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.settingStatus = 'succeeded'
        state.setting = action.payload
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.settingStatus = 'failed'
        state.error = action.error.code ?? null
      })
  }
})

export const fetchSettings = createAsyncThunk<IBaseSetting, undefined, { state: RootState }>('setting/fetchSettings', async () => {
  const resp = await client.get(`${env.REACT_APP_API_URL}/api/v1/setting`)
  return resp.data
})

export const updateSetting = createAsyncThunk<IBaseSetting, IUpdateSetting, { state: RootState }>('setting/updateSetting', async (
  setting,
  { dispatch, getState, rejectWithValue }
) => {
  return await new Promise((resolve, reject) => {
    client.put(`${env.REACT_APP_API_URL}/api/v1/setting`, setting)
      .then((resp) => {
        dispatch(setSetting(resp.data))
        resolve(resp.data)
      })
      .catch((e) => {
        reject(rejectWithValue(e))
      })
  })
})

const internalActions = settingSlice.actions

export const {
  setSettingStatus,
  setSetting
} = internalActions

export default settingSlice.reducer
