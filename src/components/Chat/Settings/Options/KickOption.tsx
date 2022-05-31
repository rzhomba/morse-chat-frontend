import React from 'react'
import SettingsOption from '../SettingsOption'
import UserDelIcon from '#icons/userdel.svg'

const KickOption = () => {
  return (
    <SettingsOption icon={UserDelIcon}
                    label="Remove user"
                    access={'admin'}
                    onClick={() => {}}/>
  )
}

export default KickOption
