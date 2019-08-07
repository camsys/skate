import React from "react"
import renderer from "react-test-renderer"
import HeadwayLines from "../../src/components/headwayLines"
import { LadderVehicle, VehicleDirection } from "../../src/models/ladderVehicle"
import { HeadwaySpacing } from "../../src/models/vehicleStatus"

describe("HeadwayLines", () => {
  test("renders", () => {
    const vehicles: LadderVehicle[] = [
      {
        vehicleId: "1",
        label: "1",
        viaVariant: null,
        status: "on-time",
        headwaySpacing: HeadwaySpacing.Ok,
        isOffCourse: false,
        x: 1,
        y: 1,
        vehicleDirection: VehicleDirection.Up,
        lane: 0,
      },
      {
        vehicleId: "2",
        label: "2",
        viaVariant: null,
        status: "on-time",
        headwaySpacing: HeadwaySpacing.Bunched,
        isOffCourse: false,
        x: 1,
        y: 100,
        vehicleDirection: VehicleDirection.Up,
        lane: 0,
      },
      {
        vehicleId: "3",
        label: "3",
        viaVariant: null,
        status: "on-time",
        headwaySpacing: HeadwaySpacing.Gapped,
        isOffCourse: false,
        x: 1,
        y: 300,
        vehicleDirection: VehicleDirection.Down,
        lane: 0,
      },
    ]
    const tree = renderer
      .create(<HeadwayLines height={800} ladderVehicles={vehicles} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})