import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IUser } from '../../types/user.interface'
import { IMessage } from '../../types/message.interface'
import { IRoom } from '../../types/room.interface'

type ChatState = IRoom

const initialState: ChatState = {
  key: '',
  users: [],
  messages: []
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<IRoom>) => action.payload,
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload)
    },
    removeUser: (state, action: PayloadAction<IUser>) => { // TODO: test this, I'm not sure that it'll work
      state.users = state.users.filter(user => user.name !== action.payload.name)
    },
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload)
    }
  }
})

export const {
  initialize,
  addUser,
  removeUser,
  addMessage
} = chatSlice.actions

export const selectChat = (state: RootState) => state.chat

export default chatSlice.reducer
