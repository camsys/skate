import React, { useState } from "react"
import useInterval from "../../hooks/useInterval"
import { formattedRunNumber } from "../../models/shuttle"
import { isShuttle, shouldShowHeadwayDiagram } from "../../models/vehicle"
import { Vehicle } from "../../realtime"
import { Route } from "../../schedule"
import Map from "../map"
import CloseButton from "./closeButton"
import Header from "./header"
import HeadwayDiagram from "./headwayDiagram"
import PropertiesList, { Property } from "./propertiesList"

interface Props {
  selectedVehicle: Vehicle
  route?: Route
}

const properties = (vehicle: Vehicle): Property[] => {
  const { runId, label, operatorId, operatorName } = vehicle

  return [
    {
      label: "Run",
      value: isShuttle(vehicle)
        ? formattedRunNumber(vehicle)
        : runId || "Not Available",
    },
    {
      label: "Vehicle",
      value: label,
    },
    {
      label: "Operator",
      value: `${operatorName} #${operatorId}`,
    },
  ]
}

const NotAvailable = () => (
  <span className="m-vehicle-properties-panel__not-available">
    Not available
  </span>
)

const nowInSeconds = (): number => Math.floor(Date.now() / 1000)

const directionsUrl = (
  latitude: number,
  longitude: number
) => `https://www.google.com/maps/dir/?api=1\
&destination=${latitude.toString()},${longitude.toString()}\
&travelmode=driving`

const Location = ({ vehicle }: { vehicle: Vehicle }) => {
  const [epocNowInSeconds, setEpocNowInSeconds] = useState(nowInSeconds())
  useInterval(() => setEpocNowInSeconds(nowInSeconds()), 1000)
  const secondsAgo = (epocTime: number): string =>
    `${epocNowInSeconds - epocTime}s ago`

  const { latitude, longitude, stopStatus, timestamp } = vehicle

  return (
    <div className="m-vehicle-properties-panel__location">
      <div className="m-properties-panel__property-label">Next Stop</div>
      <div className="m-properties-panel__property-value">
        {isShuttle(vehicle) ? <NotAvailable /> : <>{stopStatus.stopName}</>}
      </div>
      <div className="m-properties-panel__property-label">Last GPS Ping</div>
      <div className="m-properties-panel__property-value">
        {secondsAgo(timestamp)}
      </div>
      <a
        className="m-vehicle-properties-panel__link"
        href={directionsUrl(latitude, longitude)}
        target="_blank"
      >
        Directions
      </a>
      {!isShuttle(vehicle) && (
        <div className="m-vehicle-properties-panel__map">
          <Map vehicles={[vehicle]} />
        </div>
      )}
    </div>
  )
}

const VehiclePropertiesPanel = ({ selectedVehicle, route }: Props) => (
  <div className="m-vehicle-properties-panel">
    <Header vehicle={selectedVehicle} route={route} />

    {shouldShowHeadwayDiagram(selectedVehicle) && (
      <HeadwayDiagram vehicle={selectedVehicle} />
    )}

    <PropertiesList properties={properties(selectedVehicle)} />

    <Location vehicle={selectedVehicle} />

    <CloseButton />
  </div>
)

export default VehiclePropertiesPanel
