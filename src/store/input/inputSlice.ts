import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface InputState {
  // lastPressed: number | undefined,
  inputContent: string
}

const initialState: InputState = {
  // lastPressed: undefined,
  inputContent: ''
}

export const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    stopInput: (state) => {
      // state.lastPressed = undefined
      state.inputContent = ''
    },
    addContent: (state, action: PayloadAction<string>) => {
      state.inputContent += action.payload
      // state.lastPressed = new Date()
    }
  }
})

export const {
  // startInput,
  stopInput,
  addContent
} = inputSlice.actions

export const selectInput = (state: RootState) => state.input

export default inputSlice.reducer
