import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface InputState {
  inputContent: string
}

const initialState: InputState = {
  inputContent: ''
}

export const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    stopInput: (state) => {
      state.inputContent = ''
    },
    addContent: (state, action: PayloadAction<string>) => {
      state.inputContent += action.payload
    }
  }
})

export const {
  stopInput,
  addContent
} = inputSlice.actions

export const selectInput = (state: RootState) => state.input

export default inputSlice.reducer
