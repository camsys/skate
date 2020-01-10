import { renderHook } from "@testing-library/react-hooks"
import useSocket, { readUserToken } from "../../src/hooks/useSocket"

// tslint:disable: react-hooks-nesting

const mockSocket = {
  connect: jest.fn(),
  onOpen: jest.fn(),
  onClose: jest.fn(),
}

jest.mock("phoenix", () => ({
  Socket: jest.fn(() => mockSocket),
  __esModule: true,
}))

describe("useVehicles", () => {
  test("vehicles is empty to start with", () => {
    const { result } = renderHook(() => useSocket())

    expect(mockSocket.connect).toHaveBeenCalled()
    expect(result.current.socket).toBe(mockSocket)
  })
})

test("reads the user token from the page", () => {
  const mockElement = {
    dataset: {
      userToken: "mock-token",
    },
  }
  // @ts-ignore
  document.getElementById = () => mockElement

  expect(readUserToken()).toEqual("mock-token")
})
