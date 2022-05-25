import { Socket } from 'socket.io-client'
import { IMessage } from './message.interface'

interface ServerToClientEvents {
  message: (msg: IMessage) => void
}

interface ClientToServerEvents {
  join: (key: string) => void
  message: (content: string) => void
}

export class SIOSocket extends Socket<ServerToClientEvents, ClientToServerEvents> {}
