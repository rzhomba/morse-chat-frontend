import React from 'react'
import { selectSettings, toggleSettings } from '../../../store/settings/settingsSlice'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import './SettingsButton.css'
import SettingsIcon from '#icons/settings.svg'
import SettingsActiveIcon from '#icons/settingsa.svg'

const SettingsButton = () => {
  const { settingsShown } = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  return (
    <button className={`SettingsButton ${settingsShown ? 'SettingsButtonActivated' : ''}`}
            onClick={() => dispatch(toggleSettings(!settingsShown))}>
      {settingsShown ? <SettingsActiveIcon/> : <SettingsIcon/>}
    </button>
  )
}

export default SettingsButton
