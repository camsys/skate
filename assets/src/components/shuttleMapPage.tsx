import React, { ReactElement, useContext } from "react"
import { ShuttleVehiclesContext } from "../contexts/shuttleVehiclesContext"
import { StateDispatchContext } from "../contexts/stateDispatchContext"
import useRouteShapes from "../hooks/useRouteShapes"
import { FocusedVehicle, isVehicleSelected } from "../models/focusedVehicle"
import { loadedShapes } from "../models/shape"
import { RunId, Vehicle } from "../realtime"
import { Shape } from "../schedule"
import Map from "./map"
import PropertiesPanel from "./propertiesPanel"
import ShuttlePicker from "./shuttlePicker"

const filterShuttles = (
  shuttles: Vehicle[],
  selectedShuttleRunIds: RunId[] | "all"
): Vehicle[] => {
  if (selectedShuttleRunIds === "all") {
    return shuttles
  }

  return shuttles.filter(shuttle =>
    selectedShuttleRunIds.includes(shuttle.runId!)
  )
}

const findSelectedVehicle = (
  vehicles: Vehicle[],
  focusedVehicle: FocusedVehicle | undefined
): Vehicle | undefined =>
  vehicles.find(vehicle => isVehicleSelected(vehicle, focusedVehicle))

const ShuttleMapPage = ({}): ReactElement<HTMLDivElement> => {
  const [state] = useContext(StateDispatchContext)
  const {
    focusedVehicle,
    selectedShuttleRouteIds,
    selectedShuttleRunIds,
  } = state
  const shuttles: Vehicle[] | null = useContext(ShuttleVehiclesContext)
  const shuttleRouteShapesByRouteId = useRouteShapes(selectedShuttleRouteIds)
  const shapes: Shape[] = loadedShapes(
    shuttleRouteShapesByRouteId,
    selectedShuttleRouteIds
  )
  const selectedShuttles: Vehicle[] = filterShuttles(
    shuttles || [],
    selectedShuttleRunIds
  )

  const selectedVehicle = findSelectedVehicle(selectedShuttles, focusedVehicle)

  return (
    <div className="m-shuttle-map">
      <ShuttlePicker />

      <div className="m-shuttle-map__map">
        <Map vehicles={selectedShuttles} shapes={shapes} />
      </div>

      {selectedVehicle && (
        <PropertiesPanel selectedVehicleOrGhost={selectedVehicle} />
      )}
    </div>
  )
}

export default ShuttleMapPage
