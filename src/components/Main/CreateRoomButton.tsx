import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { IRoom } from '../../types/room.interface'

const CreateRoomButton = () => {
  const navigate = useNavigate()

  const createRoom = async () => {
    const { data } = await axios.post<IRoom>('/chat')
    const { key } = data
    navigate(`/${key}`)
  }

  return (
    <button className="Create Button" onClick={async () => await createRoom()}>
      Create a room
    </button>
  )
}

export default CreateRoomButton
