import { useEffect, useState } from "react"
import { fetchTimepointsForRoutes } from "../api"
import { ByRouteId, RouteId, TimepointId, TimepointsByRouteId } from "../skate"

const useTimepoints = (selectedRouteIds: RouteId[]): TimepointsByRouteId => {
  const [timepointsByRouteId, setTimepointsByRouteId] = useState<
    TimepointsByRouteId
  >({})

  useEffect(() => {
    const newRouteIds = selectedRouteIds.filter(
      (routeId: RouteId) => !(routeId in timepointsByRouteId)
    )
    if (newRouteIds.length > 0) {
      const loadingTimepointsByRouteId: TimepointsByRouteId = newRouteIds.reduce(
        (acc, routeId) => ({ ...acc, [routeId]: null }),
        {}
      )
      setTimepointsByRouteId((oldTimepointsByRouteId: TimepointsByRouteId) =>
        Object.assign({}, loadingTimepointsByRouteId, oldTimepointsByRouteId)
      )
      fetchTimepointsForRoutes(newRouteIds).then(
        (newTimepointsByRouteId: ByRouteId<TimepointId[]>) => {
          setTimepointsByRouteId(
            (oldTimepointsByRouteId: TimepointsByRouteId) =>
              Object.assign({}, oldTimepointsByRouteId, newTimepointsByRouteId)
          )
        }
      )
    }
  }, [selectedRouteIds, timepointsByRouteId])

  return timepointsByRouteId
}

export default useTimepoints
