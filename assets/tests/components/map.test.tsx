//import { mount } from "enzyme"
import React/*, { MutableRefObject }*/ from "react"
//import { act } from "react-dom/test-utils"
import renderer from "react-test-renderer"
import Map, {
  autoCenter,
  defaultCenter,
  strokeOptions,
} from "../../src/components/map"
import { HeadwaySpacing } from "../../src/models/vehicleStatus"
import { Vehicle } from "../../src/realtime"
import { Shape/*, Stop*/ } from "../../src/schedule"
//import { defaultSettings } from "../../src/settings"
import { State as AppState } from "../../src/state"

// tslint:disable-next-line: no-empty
//const noop = (): void => {}

const vehicle: Vehicle = {
  id: "y1818",
  label: "1818",
  runId: "run-1",
  timestamp: 123,
  latitude: 42.0,
  longitude: -71.0,
  directionId: 0,
  routeId: "39",
  tripId: "t1",
  headsign: "Forest Hills",
  viaVariant: "X",
  operatorId: "op1",
  operatorName: "SMITH",
  bearing: 33,
  blockId: "block-1",
  headwaySecs: 859.1,
  headwaySpacing: HeadwaySpacing.Ok,
  previousVehicleId: "v2",
  scheduleAdherenceSecs: 0,
  scheduledHeadwaySecs: 120,
  isOffCourse: false,
  layoverDepartureTime: null,
  blockIsActive: false,
  dataDiscrepancies: [
    {
      attribute: "trip_id",
      sources: [
        {
          id: "swiftly",
          value: "swiftly-trip-id",
        },
        {
          id: "busloc",
          value: "busloc-trip-id",
        },
      ],
    },
  ],
  stopStatus: {
    stopId: "s1",
    stopName: "Stop Name",
  },
  timepointStatus: {
    fractionUntilTimepoint: 0.5,
    timepointId: "tp1",
  },
  scheduledLocation: null,
  routeStatus: "on_route",
}

describe("map", () => {
  test("renders", () => {
    const tree = renderer.create(<Map vehicles={[vehicle]} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  /*
  test("draws vehicles", () => {
    /* TODO
       we need to use the real leaflet to be sure that the markers make it on the map
       but 2 problems
       1. using the real leaflet leads to the same "Map container not found"
          that required mocking leaflet for everything else
          (where there is no dom node to attach to)
          even though this test uses enzyme mount (which makes dom nodes)
          rather than react-test-renderer like the other tests (which makes js instead of dom nodes)
       2. how do you unmock just for this test?
          jest.unmock("leaflet") works if you put it at top level,
          but then you need to remock for just the snapshot test and i don't know how to do that either.
    jest.unmock("leaflet")

    const vehicles = [vehicle]
    const wrapper = mount(<Map vehicles={vehicles}/>)

    expect(wrapper.find(".m-vehicle-map__icon")).toHaveLength(1)
    expect(wrapper.find(".m-vehicle-map__label")).toHaveLength(1)
  })

  test("draws shapes", () => {
    // TODO mocking problems, see above
    jest.unmock("leaflet")

    const shape = {
      id: "shape",
      points: [
        {lat: 0, lon: 0},
        {lat: 0, lon: 0},
      ],
      stops: [
        id: "stop",
        name: "stop",
        lat: 0,
        lon: 0,
      ],
    }
    const vehicles = [vehicle]
    const wrapper = mount(<Map vehicles={vehicles}/>)

    expect(wrapper.find(".m-vehicle-map__route-shape")).toHaveLength(1)
    expect(wrapper.find(".m-vehicle-map__stop")).toHaveLength(1)
  })
  */
})

describe("autoCenter", () => {
  const Leaflet = jest.requireActual("leaflet")
  const isAutoCentering = { current: false }
  const appState: AppState = { pickerContainerIsVisible: false } as AppState

  test("centers the map on a single vehicle", () => {
    document.body.innerHTML = "<div id='map'></div>"
    const map = Leaflet.map("map")
    autoCenter(map, [vehicle], isAutoCentering, appState)
    expect(map.getCenter()).toEqual({ lat: 42, lng: -71 })
  })

  test("fits around multiple vehicles", () => {
    const vehicle1 = { ...vehicle, latitude: 42.0 }
    const vehicle2 = { ...vehicle, latitude: 42.5 }
    document.body.innerHTML = "<div id='map'></div>"
    const map = Leaflet.map("map")
    autoCenter(map, [vehicle1, vehicle2], isAutoCentering, appState)
    expect(map.getCenter().lat).toBeCloseTo(42.25, 3)
  })

  test("does not center the map if there are no vehicles", () => {
    document.body.innerHTML = "<div id='map'></div>"
    const map = Leaflet.map("map")
    autoCenter(map, [], isAutoCentering, appState)
    expect(map.getCenter()).toEqual(defaultCenter)
  })
})

/*
const spyMapResult = (): MutableRefObject<LeafletMap | null> => {
  const result: MutableRefObject<LeafletMap | null> = { current: null }
  const actualMap = Leaflet.map
  const spyMap = jest.spyOn(Leaflet, "map") as jest.Mock

  spyMap.mockImplementationOnce((container, options) => {
    const map: LeafletMap = actualMap(container, options)
    result.current = map
    return map
  })
  return result
}

const animationFramePromise = (): Promise<null> => {
  return new Promise(resolve => {
    window.requestAnimationFrame(() => resolve(null))
  })
}

describe("auto centering", () => {
  // This will need to run on a real leaflet instance
  // But that'll require figuring out how mocking works. See the TODO above

  test("auto centers on a vehicle", async () => {
    const mapResult: MutableRefObject<LeafletMap | null> = spyMapResult()
    mount(<Map vehicles={[vehicle]} />)
    await animationFramePromise()
    expect(mapResult.current!.getCenter()).toEqual({ lat: 42, lng: -71 })
  })

  test("tracks a vehicle when it moves", async () => {
    const mapResult: MutableRefObject<LeafletMap | null> = spyMapResult()
    const oldLatLng = { lat: 42, lng: -71 }
    const oldVehicle = {
      ...vehicle,
      latitude: oldLatLng.lat,
      longitude: oldLatLng.lng,
    }
    const wrapper = mount(<Map vehicles={[oldVehicle]} />)
    await animationFramePromise()
    const newLatLng = { lat: 42.1, lng: -71.1 }
    const newVehicle = {
      ...vehicle,
      latitude: newLatLng.lat,
      longitude: newLatLng.lng,
    }
    wrapper.setProps({ vehicles: [newVehicle] })
    await animationFramePromise()
    expect(mapResult.current!.getCenter()).toEqual(newLatLng)
  })

  test("manual moves disable auto centering", async () => {
    const mapResult: MutableRefObject<LeafletMap | null> = spyMapResult()
    const wrapper = mount(<Map vehicles={[vehicle]} />)
    await animationFramePromise()
    const manualLatLng = { lat: 41.9, lng: -70.9 }
    act(() => {
      mapResult.current!.panTo(manualLatLng)
    })
    await animationFramePromise()
    const newLatLng = { lat: 42.1, lng: -71.1 }
    const newVehicle = {
      ...vehicle,
      latitude: newLatLng.lat,
      longitude: newLatLng.lng,
    }
    wrapper!.setProps({ vehicles: [newVehicle] })
    await animationFramePromise()
    expect(mapResult.current!.getCenter()).toEqual(manualLatLng)
  })

  test("auto recentering does not disable auto centering", async () => {
    const mapResult: MutableRefObject<LeafletMap | null> = spyMapResult()
    const latLng1 = { lat: 42, lng: -71 }
    const latLng2 = { lat: 42.1, lng: -71.1 }
    const latLng3 = { lat: 42.2, lng: -71.2 }
    const vehicle1 = {
      ...vehicle,
      latitude: latLng1.lat,
      longitude: latLng1.lng,
    }
    const vehicle2 = {
      ...vehicle,
      latitude: latLng2.lat,
      longitude: latLng2.lng,
    }
    const vehicle3 = {
      ...vehicle,
      latitude: latLng3.lat,
      longitude: latLng3.lng,
    }
    const wrapper = mount(<Map vehicles={[vehicle1]} />)
    await animationFramePromise()
    wrapper.setProps({ vehicles: [vehicle2] })
    await animationFramePromise()
    wrapper.setProps({ vehicles: [vehicle3] })
    await animationFramePromise()
    expect(mapResult.current!.getCenter()).toEqual(latLng3)
  })
})
*/

describe("strokeOptions", () => {
  test("uses the color for a subway line, defaults to a thinner, opaque line", () => {
    const subwayShape = {
      color: "#DA291C",
    } as Shape

    const expected = {
      color: "#DA291C",
      opacity: 1.0,
      weight: 3,
    }

    expect(strokeOptions(subwayShape)).toEqual(expected)
  })

  test("sets default color, width, and opacity settincgs for shuttle route lines", () => {
    const shuttleShape = {
      color: undefined,
    } as Shape

    const expected = {
      color: "#4db6ac",
      opacity: 0.6,
      weight: 6,
    }

    expect(strokeOptions(shuttleShape)).toEqual(expected)
  })
})
