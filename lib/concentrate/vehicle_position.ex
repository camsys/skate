defmodule Concentrate.VehiclePosition do
  @moduledoc """
  Structure for representing a transit vehicle's position.
  """
  import Concentrate.StructHelpers

  defstruct_accessors([
    :id,
    :trip_id,
    :stop_id,
    :label,
    :license_plate,
    :latitude,
    :longitude,
    :bearing,
    :speed,
    :odometer,
    :stop_sequence,
    :block_id,
    :operator_id,
    :operator_name,
    :run_id,
    :last_updated,
    :stop_name,
    :operator,
    :direction_id,
    :headsign,
    :headway_secs,
    :is_laying_over,
    :layover_departure_time,
    :previous_vehicle_id,
    :previous_vehicle_schedule_adherence_secs,
    :previous_vehicle_schedule_adherence_string,
    :route_id,
    :schedule_adherence_secs,
    :schedule_adherence_string,
    :scheduled_headway_secs,
    :sources,
    current_status: :IN_TRANSIT_TO
  ])

  def new(opts) do
    # required fields
    _ = Keyword.fetch!(opts, :latitude)
    _ = Keyword.fetch!(opts, :longitude)
    super(opts)
  end

  def comes_from_swiftly?(%{sources: %MapSet{} = sources}), do: Enum.member?(sources, "swiftly")
  def comes_from_swiftly?(_), do: false

  defimpl Concentrate.Mergeable do
    alias Concentrate.VehiclePosition

    def key(%{id: id}, _opts \\ []), do: id

    @doc """
    Merging VehiclePositions takes the latest position for a given vehicle.
    """
    def merge(first, %{last_updated: nil}) do
      first
    end

    def merge(%{last_updated: nil}, second) do
      second
    end

    def merge(first, second) do
      if first.last_updated <= second.last_updated do
        do_merge(first, second)
      else
        do_merge(second, first)
      end
    end

    defp do_merge(first, second) do
      %{
        second
        | trip_id:
            only_swiftly(
              second.sources,
              second.trip_id,
              first.sources,
              first.trip_id
            ),
          stop_id: first_value(second.stop_id, first.stop_id),
          label: first_value(second.label, first.label),
          license_plate: first_value(second.license_plate, first.license_plate),
          latitude: first_value(second.latitude, first.latitude),
          longitude: first_value(second.longitude, first.longitude),
          bearing: first_value(second.bearing, first.bearing),
          speed: first_value(second.speed, first.speed),
          odometer: first_value(second.odometer, first.odometer),
          stop_sequence: first_value(second.stop_sequence, first.stop_sequence),
          block_id: first_value(second.block_id, first.block_id),
          operator_id: first_value(second.operator_id, first.operator_id),
          operator_name: first_value(second.operator_name, first.operator_name),
          run_id: first_value(second.run_id, first.run_id),
          stop_name: first_value(second.stop_name, first.stop_name),
          operator: first_value(second.operator, first.operator),
          direction_id: first_value(second.direction_id, first.direction_id),
          headsign:
            only_swiftly(
              second.sources,
              second.headsign,
              first.sources,
              first.headsign
            ),
          headway_secs: first_value(second.headway_secs, first.headway_secs),
          previous_vehicle_id: first_value(second.previous_vehicle_id, first.previous_vehicle_id),
          previous_vehicle_schedule_adherence_secs:
            first_value(
              second.previous_vehicle_schedule_adherence_secs,
              first.previous_vehicle_schedule_adherence_secs
            ),
          previous_vehicle_schedule_adherence_string:
            first_value(
              second.previous_vehicle_schedule_adherence_string,
              first.previous_vehicle_schedule_adherence_string
            ),
          route_id:
            only_swiftly(
              second.sources,
              second.route_id,
              first.sources,
              first.route_id
            ),
          schedule_adherence_secs:
            first_value(second.schedule_adherence_secs, first.schedule_adherence_secs),
          schedule_adherence_string:
            first_value(second.schedule_adherence_string, first.schedule_adherence_string),
          scheduled_headway_secs:
            first_value(second.scheduled_headway_secs, first.scheduled_headway_secs),
          sources: merge_sources(first, second),
          is_laying_over:
            only_swiftly(
              second.sources,
              second.is_laying_over,
              first.sources,
              first.is_laying_over
            ),
          layover_departure_time:
            only_swiftly(
              second.sources,
              second.layover_departure_time,
              first.sources,
              first.layover_departure_time
            )
      }
    end

    defp first_value(value, _) when not is_nil(value), do: value
    defp first_value(_, value), do: value

    defp only_swiftly(sources1, value1, sources2, value2) do
      case {VehiclePosition.comes_from_swiftly?(%{sources: sources1}),
            VehiclePosition.comes_from_swiftly?(%{sources: sources2})} do
        {true, true} ->
          first_value(value1, value2)

        {true, false} ->
          value1

        {false, true} ->
          value2

        {false, false} ->
          nil
      end
    end

    defp merge_sources(first, second) do
      [first, second]
      |> Enum.flat_map(&(VehiclePosition.sources(&1) || MapSet.new()))
      |> MapSet.new()
    end
  end
end
