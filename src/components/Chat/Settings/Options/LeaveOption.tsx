import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks'
import { selectChat } from '../../../../store/chat/chatSlice'
import { useNavigate } from 'react-router-dom'
import SettingsOption from '../SettingsOption'
import LeaveIcon from '#icons/leave.svg'
import { SuccessResponse } from '../../../../types/response.types'
import { toggleSettings } from '../../../../store/settings/settingsSlice'
import axios from 'axios'

const LeaveOption = () => {
  const { chatKey } = useAppSelector(selectChat)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const leave = () => {
    axios.delete<SuccessResponse>(`/chat/leave/${chatKey}`)
      .then(() => {
        dispatch(toggleSettings(false))
        navigate('../')
      })
  }

  return (
    <SettingsOption icon={LeaveIcon}
                    label="Leave room"
                    warning={true}
                    access={'member'}
                    onClick={() => leave()}/>
  )
}

export default LeaveOption
