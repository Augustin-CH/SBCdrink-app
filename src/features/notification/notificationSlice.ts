import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type INotification } from '@features/notification/types'

export interface NotificationState {
  notification: INotification | null
}

const initialState: NotificationState = {
  notification: null
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<INotification>) => {
      state.notification = action.payload
    }
  }
})

export const { showNotification } = notificationSlice.actions

export default notificationSlice.reducer
