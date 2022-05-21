import React from 'react'
import { selectSettings } from '../../store/settings/settingsSlice'
import { useAppSelector } from '../../utils/hooks'
import ChatHeader from './ChatHeader'
import SettingsButton from './Settings/SettingsButton'
import SettingsSidebar from './Settings/SettingsSidebar'
import MessagesList from './Messages/MessagesList'
import InputArea from './Input/InputArea'
import './Chat.css'

const Chat = () => {
  const { settingsShown } = useAppSelector(selectSettings)

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
