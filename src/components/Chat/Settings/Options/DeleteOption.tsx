import React from 'react'
import SettingsOption from '../SettingsOption'
import DeleteIcon from '#icons/delete.svg'
import { displayPopup } from '../../../Utils/Popup'
import './DeleteOption.css'

const DeletePopup = () => {
  const deleteRoom = () => {
  }

  return (
    <div>
      <div className="DeleteOptionLabel">Are you sure?</div>
      <div className="DeleteOptionButtons">
        <button className="Button ButtonSecondary" onClick={() => deleteRoom()}>Proceed</button>
        <button className="Button">Cancel</button>
      </div>
    </div>
  )
}

const DeleteOption = () => {
  return (
    <SettingsOption icon={DeleteIcon}
                    label="Delete room"
                    warning={true}
                    access={'admin'}
                    onClick={() => displayPopup({
                      title: 'Delete Room',
                      content: <DeletePopup/>
                    })}/>
  )
}

export default DeleteOption
