import React from 'react'
import { selectSettings } from '../../../store/settings/settingsSlice'
import { useAppSelector } from '../../../utils/hooks'
import CheatOption from './Options/CheatOption'
import DecodingOption from './Options/DecodingOption'
import LeaveOption from './Options/LeaveOption'
import './SettingsSidebar.css'

const SettingsSidebar = () => {
  const { settingsShown } = useAppSelector(selectSettings)

  return (
    <div className={`SettingsSidebar SettingsSidebar${settingsShown ? 'Visible' : 'Hidden'}`}>
      <div className="SettingsHeader">
        Settings and Info
      </div>
      <div className="Settings">
        <CheatOption/>
        <DecodingOption/>

        <div className="Delimiter"></div>

        <LeaveOption/>
      </div>
    </div>
  )
}

export default SettingsSidebar
