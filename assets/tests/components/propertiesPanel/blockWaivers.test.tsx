import { formatTimeOfDay } from "../../../src/components/propertiesPanel/blockWaivers"

// describe("BlockWaiver", () => {})

describe("formatTimeOfDay", () => {
  test("formats a time of day (seconds after midnight) nicely", () => {
    expect(formatTimeOfDay(18300)).toEqual("5:05am")
    expect(formatTimeOfDay(81720)).toEqual("10:42pm")
  })
})
