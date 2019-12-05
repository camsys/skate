import {
  FocusedVehicle,
  FocusType,
  isVehicleSelected,
} from "../../src/models/focusedVehicle"
import { Ghost, Vehicle } from "../../src/realtime"

describe("isVehicleSelected", () => {
  test("returns true if the focused vehicle ID matches this vehicle and the focus is of type selected", () => {
    const selectedVehicle: Vehicle = {
      id: "selectedVehicleId",
    } as Vehicle

    expect(isVehicleSelected(selectedVehicle, focusedVehicle)).toBeTruthy()
  })

  test("returns true for a selected ghost", () => {
    const selectedGhost: Ghost = {
      id: "selectedVehicleId",
    } as Ghost

    expect(isVehicleSelected(selectedGhost, focusedVehicle)).toBeTruthy()
  })

  test("returns false if the vehicle ID does not match", () => {
    const unselectedVehicle: Vehicle = {
      id: "unselectedVehicleId",
    } as Vehicle

    expect(isVehicleSelected(unselectedVehicle, focusedVehicle)).toBeFalsy()
  })

  test("returns false if the focused vehile is highlighted", () => {
    const highlightedVehicle: Vehicle = {
      id: "selectedVehicleId",
    } as Vehicle
    const focusedVehicleWithTypeHighlighted = {
      ...focusedVehicle,
      type: FocusType.Highlighted,
    }

    expect(
      isVehicleSelected(highlightedVehicle, focusedVehicleWithTypeHighlighted)
    ).toBeFalsy()
  })

  test("returns false if the focused vehile is undefined", () => {
    const vehicle: Vehicle = {
      id: "v1",
    } as Vehicle

    expect(isVehicleSelected(vehicle, undefined)).toBeFalsy()
  })
})

const focusedVehicle: FocusedVehicle = {
  id: "selectedVehicleId",
  type: FocusType.Selected,
}
