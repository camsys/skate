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
    status: :IN_TRANSIT_TO
  ])

  def new(opts) do
    # required fields
    _ = Keyword.fetch!(opts, :latitude)
    _ = Keyword.fetch!(opts, :longitude)
    super(opts)
  end

  defimpl Concentrate.Mergeable do
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
        | trip_id: first_value(second.trip_id, first.trip_id),
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
          run_id: first_value(second.run_id, first.run_id)
      }
    end

    defp first_value(value, _) when not is_nil(value), do: value
    defp first_value(_, value), do: value
  end
end
