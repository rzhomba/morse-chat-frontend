import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface SettingsState {
  settingsShown: boolean
  cheatShown: boolean
  decodingEnabled: boolean
  soundEnabled: boolean
}

const initialState: SettingsState = {
  settingsShown: false,
  cheatShown: false,
  decodingEnabled: false,
  soundEnabled: false
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleSettings: (state, action: PayloadAction<boolean>) => {
      state.settingsShown = action.payload
    },
    toggleCheat: (state, action: PayloadAction<boolean>) => {
      state.cheatShown = action.payload
    },
    toggleDecoding: (state, action: PayloadAction<boolean>) => {
      state.decodingEnabled = action.payload
    },
    toggleSound: (state, action: PayloadAction<boolean>) => {
      state.soundEnabled = action.payload
    }
  }
})

export const {
  toggleSettings,
  toggleCheat,
  toggleDecoding,
  toggleSound
} = settingsSlice.actions

export const selectSettings = (state: RootState) => state.settings

export default settingsSlice.reducer
