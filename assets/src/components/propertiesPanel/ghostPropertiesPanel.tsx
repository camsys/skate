import React from "react"
import { hasBlockWaivers } from "../../models/vehicle"
import { BlockWaiver, Ghost } from "../../realtime"
import { ByTripId, Route } from "../../schedule"
import PropertiesList from "../propertiesList"
import BlockWaivers from "./blockWaivers"
import Header from "./header"

interface Props {
  selectedGhost: Ghost
  route?: Route
}

const GhostPropertiesPanel = ({ selectedGhost, route }: Props) => (
  <div className="m-ghost-properties-panel">
    <Header vehicle={selectedGhost} route={route} />

    {hasBlockWaivers(selectedGhost) && (
      <BlockWaivers
        blockWaivers={selectedGhost.blockWaivers as ByTripId<BlockWaiver>}
      />
    )}

    <PropertiesList vehicleOrGhost={selectedGhost} />
  </div>
)

export default GhostPropertiesPanel
