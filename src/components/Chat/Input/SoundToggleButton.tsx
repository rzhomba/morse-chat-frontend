import React from 'react'
import { selectSettings, toggleSound } from '../../../store/settings/settingsSlice'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import './SoundToggleButton.css'
import SoundOnIcon from '#icons/soundon.svg'
import SoundOffIcon from '#icons/soundoff.svg'

const SoundToggleButton = () => {
  const { soundEnabled } = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  return (
    <button className="SoundToggle" onClick={() => dispatch(toggleSound(!soundEnabled))}>
      {soundEnabled ? <SoundOnIcon/> : <SoundOffIcon/>}
    </button>
  )
}

export default SoundToggleButton
