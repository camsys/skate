import { Channel } from "phoenix"
import React, { useContext, useEffect, useState } from "react"
import { SocketContext } from "../contexts/socketContext"
import CloseButton from "./closeButton"

enum State {
  Dismissed = 1,
  Outage,
  Restored,
}

type DataStatus = "good" | "outage"

const topic = "vehicles:data_status"

const DataStatusBanner = (): JSX.Element | null => {
  const [state, setState] = useState<State>(State.Dismissed)
  const dataStatus = useDataStatus()

  useEffect(() => {
    setState(oldState => updateState(dataStatus, oldState))
  }, [dataStatus])

  switch (state) {
    case State.Dismissed:
      return null
    case State.Outage:
      return <Outage />
    case State.Restored:
      return <Restored close={() => setState(State.Dismissed)} />
  }
}

const Outage = () => (
  <div className="m-data-status-banner m-data-status-banner--outage">
    <div className="m-data-status-banner__heading">
      Ongoing MBTA Data Outage
    </div>
    <div className="m-data-status-banner__content">
      Vehicle information may be missing or inaccurate. Thank you for your
      patience as we work to fix this issue.
    </div>
  </div>
)

const Restored = ({ close }: { close: () => void }) => (
  <div className="m-data-status-banner m-data-status-banner--restored">
    <div className="m-data-status-banner__heading">
      MBTA Data Outage Has Ended
    </div>
    <div className="m-data-status-banner__content">
      Vehicle information has been restored. Send us a chat message or email
      skate@mbta.com if you continue to experience data issues.
    </div>
    <CloseButton onClick={close} />
  </div>
)

const updateState = (dataStatus: DataStatus, oldState: State): State => {
  switch (dataStatus) {
    case "good":
      switch (oldState) {
        case State.Dismissed:
          return State.Dismissed
        case State.Outage:
          return State.Restored
        case State.Restored:
          return State.Restored
      }
    case "outage":
      return State.Outage
  }
}

const useDataStatus = () => {
  const { socket } = useContext(SocketContext)
  const [state, setState] = useState<DataStatus>("good")

  useEffect(() => {
    if (socket !== undefined) {
      const channel: Channel = socket.channel(topic)
      channel.on("dataStatus", ({ data: status }) => {
        setState(status)
      })
      channel
        .join()
        .receive("ok", ({ data: status }) => {
          setState(status)
        })
        // tslint:disable-next-line: no-console
        .receive("error", ({ reason }) => console.error("join failed", reason))
        .receive("timeout", () => {
          window.location.reload(true)
        })
    }
  }, [socket])
  return state
}

export default DataStatusBanner
