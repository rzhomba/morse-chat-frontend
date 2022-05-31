import React from 'react'
import SettingsOption from '../SettingsOption'
import DeleteIcon from '#icons/delete.svg'

const DeleteOption = () => {
  return (
    <SettingsOption icon={DeleteIcon}
                    label="Delete room"
                    warning={true}
                    access={'admin'}
                    onClick={() => {}}/>
  )
}

export default DeleteOption
