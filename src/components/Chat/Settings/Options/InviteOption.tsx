import React, { useState } from 'react'
import SettingsOption from '../SettingsOption'
import UserAddIcon from '#icons/useradd.svg'
import CopyIcon from '#icons/copy.svg'
import { displayPopup } from '../../../Utils/Popup'
import './InviteOption.css'

const InvitePopup = () => {
  const [copied, setCopied] = useState(false)
  const roomUrl = window.location.href

  const copy = async () => {
    if (window.isSecureContext) {
      await navigator.clipboard.writeText(roomUrl)
    } else {
      console.warn('Page is not served from a secure origin')
    }

    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div>
      <div className="InviteUserOptionLabel">Send to user the room url:</div>
      <div className="InviteUserOptionField">
        <div className="InviteUserOptionUrl">
          {roomUrl}
        </div>
        <button className="InviteUserOptionCopy" onClick={() => copy()}>
          <CopyIcon/>
        </button>
      </div>
      <div className={`InviteUserOptionMessage ${copied ? 'InviteUserOptionCopied' : ''}`}>
        Link copied to clipboard
      </div>
    </div>
  )
}

const InviteOption = () => {
  return (
    <SettingsOption icon={UserAddIcon}
                    label="Invite user"
                    onClick={() => {
                      displayPopup({
                        title: 'Invite User',
                        content: <InvitePopup/>
                      })
                    }}/>
  )
}

export default InviteOption
