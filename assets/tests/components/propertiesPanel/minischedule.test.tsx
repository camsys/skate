import React from "react"
import renderer from "react-test-renderer"
import {
  MinischeduleBlock,
  MinischeduleRun,
} from "../../../src/components/propertiesPanel/minischedule"
import {
  useMinischeduleBlock,
  useMinischeduleRun,
} from "../../../src/hooks/useMinischedule"
import { Break, Piece, Trip } from "../../../src/minischedule"

jest.mock("../../../src/hooks/useMinischedule", () => ({
  __esModule: true,
  useMinischeduleRun: jest.fn(),
  useMinischeduleBlock: jest.fn(),
}))

const breakk: Break = {
  breakType: "Break",
  startTime: 10,
  endTime: 11,
}

const piece: Piece = {
  runId: "run",
  blockId: "block",
  start: {
    time: 20,
    place: "start",
    midRoute: false,
  },
  trips: [{ id: "trip" } as Trip],
  end: {
    time: 21,
    place: "end",
    midRoute: false,
  },
}

describe("MinischeduleRun", () => {
  test("renders the loading state", () => {
    ;(useMinischeduleRun as jest.Mock).mockImplementationOnce(() => undefined)
    const tree = renderer
      .create(<MinischeduleRun activeTripId={"trip"} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test("renders a not found state", () => {
    ;(useMinischeduleRun as jest.Mock).mockImplementationOnce(() => null)
    const tree = renderer
      .create(<MinischeduleRun activeTripId={"trip"} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test("renders a run", () => {
    ;(useMinischeduleRun as jest.Mock).mockImplementationOnce(() => ({
      id: "run",
      activities: [breakk, piece],
    }))
    const tree = renderer
      .create(<MinischeduleRun activeTripId={"trip"} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})

describe("MinischeduleBlock", () => {
  test("renders the loading state", () => {
    ;(useMinischeduleBlock as jest.Mock).mockImplementationOnce(() => undefined)
    const tree = renderer
      .create(<MinischeduleBlock activeTripId={"trip"} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test("renders a not found state", () => {
    ;(useMinischeduleBlock as jest.Mock).mockImplementationOnce(() => null)
    const tree = renderer
      .create(<MinischeduleBlock activeTripId={"trip"} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test("renders a block", () => {
    ;(useMinischeduleBlock as jest.Mock).mockImplementationOnce(() => ({
      id: "block",
      pieces: [piece],
    }))
    const tree = renderer
      .create(<MinischeduleBlock activeTripId={"trip"} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})