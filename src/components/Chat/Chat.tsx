import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { selectSettings } from '../../store/settings/settingsSlice'
import { initializeChat, setUser, cleanChat } from '../../store/chat/chatSlice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import ChatHeader from './ChatHeader'
import SettingsButton from './Settings/SettingsButton'
import SettingsSidebar from './Settings/SettingsSidebar'
import MessagesList from './Messages/MessagesList'
import InputArea from './Input/InputArea'
import './Chat.css'
import axios from 'axios'
import { io } from 'socket.io-client'
import { SIOSocket } from '../../types/socket.types'
import { IRoom } from '../../types/room.interface'
import config from '../../../config.json'

const Chat = () => {
  const { key } = useParams()

  const navigate = useNavigate()

  const { settingsShown } = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  const [socket, setSocket] = useState<SIOSocket | undefined>()

  // Fetch chat room and establish connection to it
  useEffect(() => {
    if (!key || !/^[a-zA-Z\d]{8}$/gm.test(key)) {
      navigate('../')
      return
    }

    axios.get<IRoom>(`/${key}`)
      .then((response) => {
        dispatch(initializeChat(response.data))
      })

    const socketInstance: SIOSocket = io(config.apiURL, {
      withCredentials: true
    })
    setSocket(socketInstance)

    const join = async () => socketInstance.emit('join', key, (user) => {
      if (!user || !user.name) {
        socketInstance.emit('register', key, (user) => {
          dispatch(setUser(user))
        })
      } else {
        dispatch(setUser(user))
      }
    })
    const timerId = setTimeout(join, 100)

    return () => {
      clearTimeout(timerId)
      socketInstance.disconnect()
      dispatch(cleanChat())
      setSocket(undefined)
    }
  }, [])

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
    </div>
  )
}

export default Chat
