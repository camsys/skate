import React, { ReactElement, useContext } from "react"
import { StateDispatchContext } from "../contexts/stateDispatchContext"
import { VehiclesByRouteIdContext } from "../contexts/vehiclesByRouteIdContext"
import useRoutes from "../hooks/useRoutes"
import useTimepoints from "../hooks/useTimepoints"
import { FocusedVehicle, isVehicleSelected } from "../models/focusedVehicle"
import { allVehiclesAndGhosts } from "../models/vehiclesByRouteId"
import { VehicleOrGhost } from "../realtime.d"
import { ByRouteId, Route, RouteId, TimepointsByRouteId } from "../schedule.d"
import PropertiesPanel from "./propertiesPanel"
import RouteLadders from "./routeLadders"
import RoutePicker from "./routePicker"

export const findRouteById = (
  routes: Route[] | null,
  routeId: RouteId
): Route | undefined => (routes || []).find(route => route.id === routeId)

export const findSelectedVehicleOrGhost = (
  vehiclesByRouteId: ByRouteId<VehicleOrGhost[]>,
  focusedVehicle: FocusedVehicle | undefined
): VehicleOrGhost | undefined => {
  return allVehiclesAndGhosts(vehiclesByRouteId).find(bus =>
    isVehicleSelected(bus, focusedVehicle)
  )
}

const vehicleRoute = (
  allRoutes: Route[] | null,
  vehicleOrGhost: VehicleOrGhost | undefined
): Route | undefined =>
  (allRoutes || []).find(
    route => route.id === (vehicleOrGhost && vehicleOrGhost.routeId)
  )

const LadderPage = (): ReactElement<HTMLDivElement> => {
  const [state] = useContext(StateDispatchContext)
  const { focusedVehicle, selectedRouteIds } = state

  const routes: Route[] | null = useRoutes()
  const timepointsByRouteId: TimepointsByRouteId = useTimepoints(
    selectedRouteIds
  )

  const vehiclesByRouteId: ByRouteId<VehicleOrGhost[]> = useContext(
    VehiclesByRouteIdContext
  )
  const selectedRoutes: Route[] = selectedRouteIds
    .map(routeId => findRouteById(routes, routeId))
    .filter(route => route) as Route[]

  const selectedVehicleOrGhost = findSelectedVehicleOrGhost(
    vehiclesByRouteId,
    focusedVehicle
  )

  return (
    <div className="m-ladder-page">
      <RoutePicker routes={routes} selectedRouteIds={selectedRouteIds} />

      <RouteLadders
        routes={selectedRoutes}
        timepointsByRouteId={timepointsByRouteId}
        selectedVehicleId={selectedVehicleOrGhost && selectedVehicleOrGhost.id}
      />

      {selectedVehicleOrGhost && (
        <PropertiesPanel
          selectedVehicleOrGhost={selectedVehicleOrGhost}
          route={vehicleRoute(routes, selectedVehicleOrGhost)}
        />
      )}
    </div>
  )
}

export default LadderPage
