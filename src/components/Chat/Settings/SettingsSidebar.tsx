import React from 'react'
import { selectSettings, toggleSettings, toggleCheat, toggleDecoding } from '../../../store/settings/settingsSlice'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import { useNavigate } from 'react-router-dom'
import SettingsElement from './SettingsElement'
import './SettingsSidebar.css'
import InfoIcon from '#icons/info.svg'
import SheetIcon from '#icons/sheet.svg'
import LetterIcon from '#icons/letter.svg'
import UserListIcon from '#icons/userlist.svg'
import UserAddIcon from '#icons/useradd.svg'
import UserDelIcon from '#icons/userdel.svg'
import DeleteIcon from '#icons/delete.svg'
import LeaveIcon from '#icons/leave.svg'
import axios from 'axios'
import { SuccessResponse } from '../../../types/response.types'
import { selectChat } from '../../../store/chat/chatSlice'

const SettingsSidebar = () => {
  const { settingsShown, cheatShown, decodingEnabled } = useAppSelector(selectSettings)
  const { chatKey } = useAppSelector(selectChat)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const leave = () => {
    axios.delete<SuccessResponse>(`/chat/leave/${chatKey}`)
      .then(() => {
        dispatch(toggleSettings(false))
        navigate('../')
      })
  }

  return (
    <div className={`SettingsSidebar SettingsSidebar${settingsShown ? 'Visible' : 'Hidden'}`}>
      <div className="SettingsHeader">
        Settings and Info
      </div>
      <div className="Settings">
        <SettingsElement icon={InfoIcon} label="Help"
                         onClick={() => {}}/>
        <SettingsElement icon={SheetIcon} label={`${cheatShown ? 'Hide' : 'Show'} cheat sheet`}
                         onClick={() => dispatch(toggleCheat(!cheatShown))}/>
        <SettingsElement icon={LetterIcon} label={`${decodingEnabled ? 'Disable' : 'Enable'} decoding`}
                         onClick={() => dispatch(toggleDecoding(!decodingEnabled))}/>

        <div className="Delimiter"></div>

        <SettingsElement icon={UserListIcon} label="View users"
                         onClick={() => {}}/>
        <SettingsElement icon={UserAddIcon} label="Invite user"
                         onClick={() => {}}/>
        <SettingsElement icon={UserDelIcon} label="Remove user" access={'admin'}
                         onClick={() => {}}/>

        <div className="Delimiter"></div>

        <SettingsElement icon={DeleteIcon} label="Delete room" warning={true} access={'admin'}
                         onClick={() => {}}/>
        <SettingsElement icon={LeaveIcon} label="Leave room" warning={true} access={'member'}
                         onClick={() => leave()}/>
      </div>
    </div>
  )
}

export default SettingsSidebar
