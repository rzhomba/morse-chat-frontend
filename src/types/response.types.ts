import { IRoom } from './room.interface'

export interface ChatResponse extends IRoom {
  user: string
}

export interface SuccessResponse {
  success: boolean
}
