import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { selectSettings } from '../../store/settings/settingsSlice'
import { initialize } from '../../store/chat/chatSlice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import ChatHeader from './ChatHeader'
import SettingsButton from './Settings/SettingsButton'
import SettingsSidebar from './Settings/SettingsSidebar'
import MessagesList from './Messages/MessagesList'
import InputArea from './Input/InputArea'
import './Chat.css'
import axios from 'axios'
import { IRoom } from '../../types/room.interface'

const Chat = () => {
  const { key } = useParams()

  const navigate = useNavigate()

  const { settingsShown } = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const keyRegex = /^[a-zA-Z\d]{8}$/gm

    if (key && keyRegex.test(key)) {
      axios.get<IRoom>(`/${key}`)
        .then((response) => {
          dispatch(initialize(response.data))
        })
    } else {
      navigate('../')
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
