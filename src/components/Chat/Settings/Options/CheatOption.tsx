import React from 'react'
import { selectSettings, toggleCheat } from '../../../../store/settings/settingsSlice'
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks'
import SettingsOption from '../SettingsOption'
import SheetIcon from '#icons/sheet.svg'

const CheatOption = () => {
  const { cheatShown } = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  return (
    <SettingsOption icon={SheetIcon}
                    label={`${cheatShown ? 'Hide' : 'Show'} cheat sheet`}
                    onClick={() => dispatch(toggleCheat(!cheatShown))}/>
  )
}

export default CheatOption
