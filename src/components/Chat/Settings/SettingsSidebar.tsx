import React from 'react'
import { selectSettings } from '../../../store/settings/settingsSlice'
import { useAppSelector } from '../../../utils/hooks'
import './SettingsSidebar.css'
import HelpOption from './Options/HelpOption'
import CheatOption from './Options/CheatOption'
import DecodingOption from './Options/DecodingOption'
import UsersOption from './Options/UsersOption'
import InviteOption from './Options/InviteOption'
import KickOption from './Options/KickOption'
import DeleteOption from './Options/DeleteOption'
import LeaveOption from './Options/LeaveOption'

const SettingsSidebar = () => {
  const { settingsShown } = useAppSelector(selectSettings)

  return (
    <div className={`SettingsSidebar SettingsSidebar${settingsShown ? 'Visible' : 'Hidden'}`}>
      <div className="SettingsHeader">
        Settings and Info
      </div>
      <div className="Settings">
        <HelpOption/>
        <CheatOption/>
        <DecodingOption/>

        <div className="Delimiter"></div>

        <UsersOption/>
        <InviteOption/>
        <KickOption/>

        <div className="Delimiter"></div>

        <DeleteOption/>
        <LeaveOption/>
      </div>
    </div>
  )
}

export default SettingsSidebar
