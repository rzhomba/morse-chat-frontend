import { IRoom } from './room.interface'
import { IUser } from './user.interface'

export interface ChatResponse extends IRoom {
  user: IUser
}

export interface SuccessResponse {
  success: boolean
}
