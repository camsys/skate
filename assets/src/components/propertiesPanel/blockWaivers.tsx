import React from "react"
import { BlockWaiver } from "../../realtime"
import { ByTripId, TripId } from "../../schedule"

interface Props {
  blockWaivers: ByTripId<BlockWaiver>
}

const byStartTime = (blockWaivers: ByTripId<BlockWaiver>) => (
  aTripId: TripId,
  bTripId: TripId
): number => {
  const aStartTime = blockWaivers[aTripId].startTime
  const bStartTime = blockWaivers[bTripId].startTime

  if (aStartTime < bStartTime) {
    return -1
  } else if (bStartTime < aStartTime) {
    return 1
  } else {
    return 0
  }
}

/**
 * Formats a time of day (seconds after midnight) nicely.
 * e.g. given 18300, returns "5:05am"
 * e.g. given 81840, returns "10:42pm"
 *
 * @param timeOfDay seconds after midnight
 */
export const formatTimeOfDay = (timeOfDay: number): string => {
  const hours24 = Math.floor(timeOfDay / 3600)
  const hours12 = hours24 > 12 ? hours24 - 12 : hours24
  const minutesNum = Math.floor((timeOfDay % 3600) / 60)
  const minutesStr = minutesNum < 10 ? `0${minutesNum}` : minutesNum
  const ampm = hours24 <= 12 ? "am" : "pm"

  return `${hours12}:${minutesStr}${ampm}`
}

const BlockWaiver = ({
  blockWaiver: { tripId, startTime, endTime, remark },
}: {
  blockWaiver: BlockWaiver
}) => (
  <div className="m-block-waiver">
    <div className="m-block-waiver__title">Dispatcher Note</div>

    <table className="m-block-waiver__details">
      <tbody>
        <tr>
          <td className="m-block-waiver__detail-label">Trip ID</td>
          <td className="m-block-waiver__detail-value">{tripId}</td>
        </tr>
        <tr>
          <td className="m-block-waiver__detail-label">Reason</td>
          <td className="m-block-waiver__detail-value">{remark}</td>
        </tr>
        <tr>
          <td className="m-block-waiver__detail-label">Start Time</td>
          <td className="m-block-waiver__detail-value">
            {formatTimeOfDay(startTime)}
          </td>
        </tr>
        <tr>
          <td className="m-block-waiver__detail-label">End Time</td>
          <td className="m-block-waiver__detail-value">
            {formatTimeOfDay(endTime)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
)

const BlockWaivers = ({ blockWaivers }: Props) => (
  <div className="m-block-waivers">
    {Object.keys(blockWaivers)
      .sort(byStartTime(blockWaivers))
      .map(tripId => (
        <BlockWaiver blockWaiver={blockWaivers[tripId]} key={tripId} />
      ))}
  </div>
)

export default BlockWaivers
