import React from "react"
import { ShuttleVehiclesProvider } from "../contexts/shuttleVehiclesContext"
import { SocketProvider } from "../contexts/socketContext"
import { StateDispatchProvider } from "../contexts/stateDispatchContext"
import { VehiclesByRouteIdProvider } from "../contexts/vehiclesByRouteIdContext"
import usePersistedStateReducer from "../hooks/usePersistedStateReducer"
import useShuttleVehicles from "../hooks/useShuttleVehicles"
import useSocket from "../hooks/useSocket"
import useVehicles from "../hooks/useVehicles"
import { initialState, reducer } from "../state"
import App from "./app"

const AppStateWrapper = (): JSX.Element => {
  const [state, dispatch] = usePersistedStateReducer(reducer, initialState)
  const { selectedRouteIds } = state

  const { socket, isSocketConnected } = useSocket()
  const vehiclesByRouteId = useVehicles(socket, selectedRouteIds)
  const shuttles = useShuttleVehicles(socket)

  return (
    <StateDispatchProvider state={state} dispatch={dispatch}>
      <SocketProvider socket={socket}>
        <VehiclesByRouteIdProvider vehiclesByRouteId={vehiclesByRouteId}>
          <ShuttleVehiclesProvider shuttles={shuttles}>
            <App isSocketConnected={isSocketConnected} />
          </ShuttleVehiclesProvider>
        </VehiclesByRouteIdProvider>
      </SocketProvider>
    </StateDispatchProvider>
  )
}

export default AppStateWrapper
