import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from './settings/settingsSlice'
import inputReducer from './input/inputSlice'

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    input: inputReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
