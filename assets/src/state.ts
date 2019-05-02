import { Dispatch as ReactDispatch } from "react"
import { RouteId } from "./skate.d"

export interface State {
  selectedRouteIds: RouteId[]
}

export const initialState: State = {
  selectedRouteIds: [],
}

interface SelectRoutesAction {
  type: "SELECT_ROUTES"
  payload: {
    routeIds: RouteId[]
  }
}

export const selectRoute = (routeId: RouteId): SelectRoutesAction => ({
  type: "SELECT_ROUTES",
  payload: { routeIds: [routeId] },
})

export const selectRoutes = (routeIds: RouteId[]): SelectRoutesAction => ({
  type: "SELECT_ROUTES",
  payload: { routeIds },
})

interface DeselectRoutesAction {
  type: "DESELECT_ROUTES"
  payload: {
    routeIds: RouteId[]
  }
}

export const deselectRoute = (routeId: RouteId): DeselectRoutesAction => ({
  type: "DESELECT_ROUTES",
  payload: { routeIds: [routeId] },
})

export const deselectRoutes = (routeIds: RouteId[]): DeselectRoutesAction => ({
  type: "DESELECT_ROUTES",
  payload: { routeIds },
})

type Action = SelectRoutesAction | DeselectRoutesAction

export type Dispatch = ReactDispatch<Action>

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SELECT_ROUTES":
      return {
        ...state,
        selectedRouteIds: state.selectedRouteIds.concat(
          action.payload.routeIds
        ),
      }
    case "DESELECT_ROUTES":
      return {
        ...state,
        selectedRouteIds: state.selectedRouteIds.filter(
          id => !action.payload.routeIds.includes(id)
        ),
      }
    default:
      return state
  }
}
