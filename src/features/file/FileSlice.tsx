import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type FetchStatus } from '@/app/shared/types'
import { ApiClient } from '@/lib/http/api'
import {
  type RootState
} from '@/app/store'
import {
  type IUpdateFile,
  type IBaseFile,
  type ICreateFile
} from './types'
import { env } from '@/env'

const client = ApiClient.Instance()

export interface FileState {
  selectedFile: IBaseFile
  listFiles: IBaseFile[]
  listFilesStatus: FetchStatus
  singleStatus: FetchStatus
  error: string | null
}

const initialState: FileState = {
  selectedFile: {} as IBaseFile,
  listFiles: [] as IBaseFile[],
  listFilesStatus: 'idle',
  singleStatus: 'idle',
  error: null
}

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setSelectedFile (state, action) {
      state.selectedFile = action.payload
    },
    setListFiles (state, action) {
      state.listFiles = action.payload
    },
    setListStatus (state, action) {
      state.listFilesStatus = action.payload
    }
  }
  // extraReducers (builder) {
  //   builder
  //     .addCase(fetchAvailableFiles.pending, (state) => {
  //       state.listFilesStatus = 'loading'
  //     })
  //     .addCase(fetchAvailableFiles.fulfilled, (state, action) => {
  //       state.listFilesStatus = 'succeeded'
  //       state.listFiles = action.payload
  //     })
  //     .addCase(fetchAvailableFiles.rejected, (state, action) => {
  //       state.listFilesStatus = 'failed'
  //       state.error = action.error.code ?? null
  //     })
  //     .addCase(fetchFiles.pending, (state) => {
  //       state.listFilesStatus = 'loading'
  //     })
  //     .addCase(fetchFiles.fulfilled, (state, action) => {
  //       state.listFilesStatus = 'succeeded'
  //       state.listFiles = action.payload
  //     })
  //     .addCase(fetchFiles.rejected, (state, action) => {
  //       state.listFilesStatus = 'failed'
  //       state.error = action.error.code ?? null
  //     })
  // }
})

// export const fetchAvailableFiles = createAsyncThunk<IBaseFile[], undefined, { state: RootState }>('file/fetchAvailableFiles', async () => {
//   const resp = await client.get(`${env.REACT_APP_API_URL}/api/v1/files?isAvailable=true&withIngredients=true&withPictures=true`)
//   return resp.data
// })

// export const fetchFiles = createAsyncThunk<IBaseFile[], undefined, { state: RootState }>('file/fetchFiles', async () => {
//   const resp = await client.get(`${env.REACT_APP_API_URL}/api/v1/files?withIngredients=true&sort=desc&withPictures=true`)
//   return resp.data
// })

const DataURIToBlob = (dataURI: string) => {
  const splitDataURI = dataURI.split(',')
  const byteString = splitDataURI[0].includes('base64') ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) { ia[i] = byteString.charCodeAt(i) }

  return new Blob([ia], { type: mimeString })
}

export const updateFile = createAsyncThunk<IBaseFile, IUpdateFile, { state: RootState }>('file/updateFile', async (
  { id, file },
  { rejectWithValue }
) => {
  return await new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('file', DataURIToBlob(file as unknown as string))

    client.put(`${env.REACT_APP_API_URL}/api/v1/file/${id}`, formData)
      .then((resp) => {
        resolve(resp.data)
      })
      .catch((e) => {
        reject(rejectWithValue(e))
      })
  })
})

export const createFile = createAsyncThunk<IBaseFile, ICreateFile, { state: RootState }>('file/updateFile', async (
  file,
  { rejectWithValue }
) => {
  return await new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('file', DataURIToBlob(file as unknown as string))

    client.post(`${env.REACT_APP_API_URL}/api/v1/file`, formData)
      .then((resp) => {
        resolve(resp.data)
      })
      .catch((e) => {
        reject(rejectWithValue(e))
      })
  })
})

const internalActions = fileSlice.actions

export const {
  setSelectedFile,
  setListFiles,
  setListStatus
} = internalActions

export default fileSlice.reducer
