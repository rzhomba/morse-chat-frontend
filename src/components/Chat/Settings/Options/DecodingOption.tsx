import React from 'react'
import { selectSettings, toggleDecoding } from '../../../../store/settings/settingsSlice'
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks'
import SettingsOption from '../SettingsOption'
import LetterIcon from '#icons/letter.svg'

const DecodingOption = () => {
  const { decodingEnabled } = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  return (
    <SettingsOption icon={LetterIcon}
                    label={`${decodingEnabled ? 'Disable' : 'Enable'} decoding`}
                    onClick={() => dispatch(toggleDecoding(!decodingEnabled))}/>
  )
}

export default DecodingOption
