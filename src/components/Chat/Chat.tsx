import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { selectSettings } from '../../store/settings/settingsSlice'
import { initializeChat, cleanChat, addMessage, addUser, removeUser, selectChat } from '../../store/chat/chatSlice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import ChatHeader from './ChatHeader'
import SettingsButton from './Settings/SettingsButton'
import SettingsSidebar from './Settings/SettingsSidebar'
import MessagesList from './Messages/MessagesList'
import InputArea from './Input/InputArea'
import Cheatsheet from './Cheatsheet/Cheatsheet'
import Popup from '../Utils/Popup'
import './Chat.css'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ChatResponse, SuccessResponse } from '../../types/response.types'
import { SocketIO } from '../../utils/socket-io'
import { SIOSocket } from '../../types/socket.types'
import { IMessage } from '../../types/message.interface'
import { clearSound, initializeSound, playbackMessage } from '../../utils/sound'
import config from '../../../config.json'

const Chat = () => {
  const { key } = useParams()
  const navigate = useNavigate()
  const [socket, setSocket] = useState<SIOSocket | undefined>()
  const soundReady = useRef(false)
  const { settingsShown, soundEnabled } = useAppSelector(selectSettings)
  const { chatUser } = useAppSelector(selectChat)
  const dispatch = useAppDispatch()

  // Fetch chat room and authorize in it
  useEffect(() => {
    if (!key || !/^[a-zA-Z\d]{8}$/gm.test(key)) {
      navigate('../')
      return
    }

    const fetchData = (response: AxiosResponse<ChatResponse>) => {
      dispatch(initializeChat(response.data))
      setSocket(SocketIO.instance().initialize(config.apiURL, {
        withCredentials: true
      }))
    }

    const join = () => {
      axios.get<ChatResponse>(`/chat/${key}`)
        .then(fetchData)
        .catch((error: AxiosError) => {
          if (error.response?.status === 401) {
            axios.post<SuccessResponse>(`/chat/join/${key}`).then(response => {
              if (!response.data.success) {
                return
              }
              axios.get<ChatResponse>(`/chat/${key}`)
                .then(fetchData)
            })
          }
        })
    }
    // Ensure that client will have time to receive auth cookie
    const timerId = setTimeout(join, 100)

    return () => {
      clearTimeout(timerId)
      dispatch(cleanChat())
      setSocket(undefined)
    }
  }, [])

  // Establish socket connection to chat room
  useEffect(() => {
    if (!socket || !key) {
      return
    }

    socket.emit('join', key)

    socket.on('message', (message: IMessage) => {
      dispatch(addMessage(message))

      if (soundReady.current && chatUser?.name !== message.user && message.content) {
        playbackMessage(message.content)
      }

      if (message.type === 'join') {
        dispatch(addUser({ name: message.user, role: 'member' }))
      } else if (message.type === 'leave') {
        dispatch(removeUser(message.user))
      }
    })

    return () => {
      socket.disconnect()
      setSocket(undefined)
    }
  }, [socket])

  // Initialize audio context and set up sound
  useEffect(() => {
    if (!soundEnabled) {
      return
    }

    initializeSound(750, 0.2)
      .then(() => {
        soundReady.current = true
      })
    return () => {
      clearSound()
        .then(() => {
          soundReady.current = false
        })
    }
  }, [soundEnabled])

  return (
    <div className={`Chat Screen ${settingsShown ? 'ChatDarken' : ''}`}>
      <div className="HeaderWrapper">
        <ChatHeader/>
      </div>
      <div className="MessagesWrapper">
        <MessagesList/>
      </div>
      <div className="InputAreaWrapper">
        <InputArea/>
      </div>

      <SettingsSidebar/>
      <SettingsButton/>

      <Cheatsheet/>

      <Popup/>
    </div>
  )
}

export default Chat
