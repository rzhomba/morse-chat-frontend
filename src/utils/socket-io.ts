import { SIOSocket } from '../types/socket.types'
import { io, ManagerOptions, SocketOptions } from 'socket.io-client'

export class SocketIO {
  // eslint-disable-next-line no-use-before-define
  private static _instance?: SocketIO
  private static client?: SIOSocket

  private constructor () {
    SocketIO._instance = this
  }

  static instance (): SocketIO {
    return this._instance || (this._instance = new this())
  }

  initialize (uri: string, opts?: Partial<ManagerOptions & SocketOptions>): SIOSocket {
    SocketIO.client = io(uri, opts)

    return SocketIO.client
  }

  ready (): boolean {
    return SocketIO.client !== undefined
  }

  client (): SIOSocket {
    if (!SocketIO.client) {
      throw new Error('Socket.IO client requested before initialization')
    }

    return SocketIO.client
  }
}
