import { renderHook } from "react-hooks-testing-library"
import { fetchTimepointsForRoutes } from "../../src/api"
import useTimepoints from "../../src/hooks/useTimepoints"
import { TimepointId, TimepointsByRouteId } from "../../src/skate"
import { instantPromise, mockUseStateOnce } from "../testHelpers/mockHelpers"

// tslint:disable: react-hooks-nesting no-empty

jest.mock("../../src/api", () => ({
  __esModule: true,
  fetchTimepointsForRoutes: jest.fn(() => new Promise<TimepointId[]>(() => {})),
}))

describe("useTimepoints", () => {
  test("fetches timepoints for routes if we don't yet have them", () => {
    const mockFetchTimepoints: jest.Mock = fetchTimepointsForRoutes as jest.Mock

    const { result } = renderHook(() => {
      return useTimepoints(["1", "2"])
    })

    expect(mockFetchTimepoints).toHaveBeenCalledTimes(1)
    expect(mockFetchTimepoints).toHaveBeenCalledWith(["1", "2"])
    expect(result.current).toEqual({ "1": null, "2": null })
  })

  test("returns timepoints when the api call returns", () => {
    const timepointsByRouteId = {
      "1": ["t1", "t2"],
      "2": ["t3", "t4"],
    }
    const mockFetchTimepoints: jest.Mock = fetchTimepointsForRoutes as jest.Mock
    mockFetchTimepoints.mockImplementationOnce(() =>
      instantPromise(timepointsByRouteId)
    )

    const { result } = renderHook(() => {
      return useTimepoints(["1", "2"])
    })

    expect(result.current).toEqual(timepointsByRouteId)
  })

  test("does not refetch timepoints that are loading or loaded", () => {
    const selectedRouteIds = ["2", "3"]
    const timepointsByRouteId: TimepointsByRouteId = {
      2: null,
      3: ["t3"],
    }

    const mockFetchTimepoints: jest.Mock = fetchTimepointsForRoutes as jest.Mock
    mockUseStateOnce<TimepointsByRouteId>(timepointsByRouteId)

    const { result } = renderHook(() => {
      return useTimepoints(selectedRouteIds)
    })

    expect(mockFetchTimepoints).not.toHaveBeenCalled()
    expect(result.current).toEqual(timepointsByRouteId)
  })

  test("merges new loading timepoints into existing data", () => {
    const selectedRouteIds = ["1", "2", "3"]

    mockUseStateOnce<TimepointsByRouteId>({
      "2": null,
      "3": ["t3"],
    })

    const { result } = renderHook(() => {
      return useTimepoints(selectedRouteIds)
    })

    expect(result.current).toEqual({
      "1": null,
      "2": null,
      "3": ["t3"],
    })
  })

  test("merges fetched data into existing data", () => {
    const selectedRouteIds = ["1", "2", "3"]

    mockUseStateOnce<TimepointsByRouteId>({
      "2": null,
      "3": ["t3"],
    })

    const mockFetchTimepoints: jest.Mock = fetchTimepointsForRoutes as jest.Mock
    mockFetchTimepoints.mockImplementationOnce(() =>
      instantPromise({ "1": ["t1"] })
    )

    const { result } = renderHook(() => {
      return useTimepoints(selectedRouteIds)
    })

    expect(mockFetchTimepoints).toHaveBeenCalledTimes(1)
    expect(result.current).toEqual({
      "1": ["t1"],
      "2": null,
      "3": ["t3"],
    })
  })
})
