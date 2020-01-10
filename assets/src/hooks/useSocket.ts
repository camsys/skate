import { Socket } from "phoenix"
import { useEffect, useState } from "react"
import appData from "../appData"
import { UserToken } from "../skate.d"

export const readUserToken = (): UserToken | undefined => {
  const data = appData()
  if (!data) {
    return undefined
  }

  const token = data.userToken as UserToken
  return token
}

const useSocket = (): {
  socket: Socket | undefined
  isSocketConnected: boolean
} => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined)
  const [isSocketConnected, setIsSocketConnected] = useState(false)

  const userToken: UserToken | undefined = readUserToken()

  useEffect(() => {
    const initialSocket = new Socket("/socket", {
      params: { token: userToken },
      // timeout: 5000,
      // heartbeatIntervalMs: 10,
    })
    initialSocket.onOpen(() => setIsSocketConnected(true))
    initialSocket.onClose(() => setIsSocketConnected(false))
    initialSocket.connect()
    setSocket(initialSocket)
  }, [])

  return { socket, isSocketConnected }
}

export default useSocket
