import React from 'react'
import SettingsOption from '../SettingsOption'
import UserDelIcon from '#icons/userdel.svg'
import CrossIcon from '#icons/cross.svg'
import { displayPopup } from '../../../Utils/Popup'
import { useAppSelector } from '../../../../utils/hooks'
import { selectChat } from '../../../../store/chat/chatSlice'
import './KickOption.css'

const KickPopup = () => {
  const { chatUsers, chatUser } = useAppSelector(selectChat)

  return (
    <div>
      {chatUsers
        .filter(user => user.name !== chatUser?.name)
        .map(user => (
          <div className="KickOptionRecord" key={'kick-option-' + user.name}>
            <span className="KickOptionName">{user.name}</span>
            <span className="KickOptionRole">({user.role.toUpperCase()})</span>
            <button className="KickOptionButton">
              <CrossIcon/>
            </button>
          </div>
        ))}
    </div>
  )
}

const KickOption = () => {
  return (
    <SettingsOption icon={UserDelIcon}
                    label="Remove user"
                    access={'admin'}
                    warning={true}
                    onClick={() => displayPopup({
                      title: 'Remove User',
                      content: <KickPopup/>
                    })}/>
  )
}

export default KickOption
