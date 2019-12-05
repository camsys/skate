import { VehicleId, VehicleOrGhost } from "../realtime"

export interface FocusedVehicle {
  id: VehicleId
  type: FocusType
}

export enum FocusType {
  Selected = 1,
  Highlighted,
}

export const isVehicleSelected = (
  vehicle: VehicleOrGhost,
  focusedVehicle: FocusedVehicle | undefined
): boolean =>
  focusedVehicle !== undefined &&
  focusedVehicle.type === FocusType.Selected &&
  vehicle.id === focusedVehicle.id
