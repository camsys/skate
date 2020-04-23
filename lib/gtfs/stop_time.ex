defmodule Gtfs.StopTime do
  @moduledoc """
  An individual stop time. A sequence of stop times composes a trip.

  A timepoint is a key stop along a route. In GTFS, timepoints are known as "checkpoints".
  """
  alias Gtfs.Csv
  alias Gtfs.Stop
  alias Gtfs.Trip

  @type t :: %__MODULE__{
          stop_id: Stop.id(),
          time: Util.Time.time_of_day(),
          timepoint_id: timepoint_id() | nil
        }

  @enforce_keys [
    :stop_id,
    :time
  ]

  @derive Jason.Encoder

  defstruct [
    :stop_id,
    :time,
    :timepoint_id
  ]

  @type timepoint_id :: String.t()

  @spec trip_stop_times_from_csv([Csv.row()],[Csv.row()]) :: %{Trip.id() => [t()]}
  def trip_stop_times_from_csv(stop_times_csv, timepoint_times_csv) do

      a = timepoint_times_csv
        |> Enum.group_by(fn stop_time_row ->
        stop_time_row["trip_id"] end)

      stop_times_csv
      |> Enum.group_by(fn stop_time_row ->
        stop_time_row["trip_id"] end)
      |> Helpers.map_values(fn stop_times_on_trip ->
      stop_times_on_trip
      |> Enum.sort_by(&stop_sequence_integer/1)
      |> Enum.map(fn stop_time_row ->
        time_string =
          if stop_time_row["arrival_time"] == "" do
            stop_time_row["departure_time"]
          else
            stop_time_row["arrival_time"]
          end

        time = Util.Time.parse_hhmmss(time_string)
        # Use nil instead of an empty string for timepoint_id if there is no checkpoint_id
        #timepoint_id =
        #  if stop_time_row["checkpoint_id"] == "", do: nil, else: stop_time_row["checkpoint_id"]

        IO.inspect('processing stop time update')
        if a[stop_time_row["trip_id"]] == nil do
          %__MODULE__{
            stop_id: stop_time_row["stop_id"],
            time: time
          }
        else
          timepoint_time_row = a[stop_time_row["trip_id"]] |> Enum.find(fn row -> row["arrival_time"] == stop_time_row["arrival_time"] and
                                                                                 row["departure_time"] == stop_time_row["departure_time"] end)
          #IO.inspect(timepoint_time_row)
          timepoint_id = timepoint_time_row["stop_id"]

          %__MODULE__{
            stop_id: stop_time_row["stop_id"],
            time: time,
            timepoint_id: timepoint_id
          }
        end
      end)
    end)
  end

  @spec row_in_trip_id_set?(Csv.row(), MapSet.t(Trip.id())) :: boolean
  def row_in_trip_id_set?(row, trip_id_set), do: MapSet.member?(trip_id_set, row["trip_id"])

  @spec stop_sequence_integer(Csv.row()) :: integer()
  def stop_sequence_integer(stop_time_row), do: String.to_integer(stop_time_row["stop_sequence"])

  @spec is_timepoint?(t()) :: boolean
  def is_timepoint?(%__MODULE__{timepoint_id: timepoint_id}) do
    timepoint_id != nil
  end
end
