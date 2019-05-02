import { ByRouteId, Route, RouteId, TimepointId } from "./skate.d"

interface RoutesResponse {
  data: Route[]
}

interface TimepointsResponse {
  data: ByRouteId<TimepointId[]>
}

const checkResponseStatus = (response: Response) => {
  if (response.status !== 200) {
    throw new Error(`Response error: ${response.status}`)
  }
  return response
}

const parseJson = (response: Response) => response.json()

export const fetchRoutes = (): Promise<Route[]> =>
  fetch("/api/routes")
    .then(checkResponseStatus)
    .then(parseJson)
    .then(({ data: routes }: RoutesResponse) => routes)
    .catch(error => {
      // tslint:disable-next-line: no-console
      console.error(error)
      throw error
    })

export const fetchTimepointsForRoutes = (
  routeIds: RouteId[]
): Promise<ByRouteId<TimepointId[]>> => {
  const queryParams = routeIds
    .map((routeId: RouteId) => "route_id[]=" + routeId)
    .join("&")
  return fetch(`/api/timepoints?${queryParams}`)
    .then(checkResponseStatus)
    .then(parseJson)
    .then(
      ({ data: timepointsByRouteId }: TimepointsResponse) => timepointsByRouteId
    )
    .catch(error => {
      // tslint:disable-next-line: no-console
      console.error(error)
      throw error
    })
}
