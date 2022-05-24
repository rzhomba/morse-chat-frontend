import { Socket } from 'socket.io-client'
import { IMessage } from './message.interface'
import { IUser } from './user.interface'

interface ServerToClientEvents {
  message: (msg: IMessage) => void
}

interface ClientToServerEvents {
  join: (key: string, callback: (response?: IUser) => void) => void
  register: (key: string, callback: (response: IUser) => void) => void
  message: (content: string) => void
  leave: (key: string) => void
}

export class SIOSocket extends Socket<ServerToClientEvents, ClientToServerEvents> {}
