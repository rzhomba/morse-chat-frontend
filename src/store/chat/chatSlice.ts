import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IUser } from '../../types/user.interface'
import { IMessage } from '../../types/message.interface'
import { IRoom } from '../../types/room.interface'

interface ChatState {
  chatKey: string
  chatUsers: IUser[]
  chatMessages: IMessage[]
  chatUser?: IUser
}

const initialState: ChatState = {
  chatKey: '',
  chatUsers: [],
  chatMessages: [],
  chatUser: undefined
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    initializeChat: (state, action: PayloadAction<IRoom>) => ({
      chatKey: action.payload.key,
      chatUsers: action.payload.users,
      chatMessages: action.payload.messages,
      chatUser: undefined
    }),
    cleanChat: () => initialState,
    setUser: (state, action: PayloadAction<IUser>) => {
      state.chatUser = action.payload
    },
    addUser: (state, action: PayloadAction<IUser>) => {
      state.chatUsers.push(action.payload)
    },
    removeUser: (state, action: PayloadAction<IUser>) => {
      state.chatUsers = state.chatUsers.filter(user => user.name !== action.payload.name)
    },
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.chatMessages.push(action.payload)
    }
  }
})

export const {
  initializeChat,
  cleanChat,
  setUser,
  addUser,
  removeUser,
  addMessage
} = chatSlice.actions

export const selectChat = (state: RootState) => state.chat

export default chatSlice.reducer
