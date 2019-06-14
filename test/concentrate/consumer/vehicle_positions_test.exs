defmodule Concentrate.Supervisor.VehiclePositionsTest do
  @moduledoc false
  use ExUnit.Case, async: true

  alias Concentrate.Consumer.VehiclePositions

  describe "handle_events/3" do
    setup do
      real_trip_fn = Application.get_env(:realtime, :trip_fn)

      on_exit(fn ->
        Application.put_env(:realtime, :trip_fn, real_trip_fn)
      end)

      Application.put_env(:realtime, :trip_fn, fn _trip_id -> nil end)

      events = [
        [
          {
            %Concentrate.TripUpdate{
              direction_id: 0,
              route_id: "505",
              schedule_relationship: :SCHEDULED,
              start_date: {2019, 5, 17},
              start_time: nil,
              trip_id: "39984755"
            },
            [
              %Concentrate.VehiclePosition{
                bearing: 0,
                block_id: "A505-106",
                id: "y0562",
                label: "0562",
                last_updated: 1_558_121_727,
                latitude: 42.3408556,
                license_plate: nil,
                longitude: -71.0642766,
                odometer: nil,
                operator_id: "71041",
                operator_name: "FRANK",
                run_id: "123-9048",
                speed: nil,
                status: :IN_TRANSIT_TO,
                stop_id: "6551",
                stop_sequence: 1,
                trip_id: "39984755"
              }
            ],
            []
          },
          {
            %Concentrate.TripUpdate{
              direction_id: 0,
              route_id: "91",
              schedule_relationship: :SCHEDULED,
              start_date: nil,
              start_time: nil,
              trip_id: "40155689"
            },
            [
              %Concentrate.VehiclePosition{
                bearing: 0,
                block_id: "G111-155",
                id: "y0638",
                label: "0638",
                last_updated: 1_558_121_738,
                latitude: 42.362946519,
                license_plate: nil,
                longitude: -71.0579357,
                odometer: nil,
                operator_id: "70112",
                operator_name: "PANIAGUA",
                run_id: "126-1430",
                speed: 0.0,
                status: :IN_TRANSIT_TO,
                stop_id: "8310",
                stop_sequence: 1,
                trip_id: "40155689"
              }
            ],
            []
          }
        ]
      ]

      {:ok, events: events}
    end

    test "returns noreply", %{events: events} do
      response = VehiclePositions.handle_events(events, nil, %{})

      assert response == {:noreply, [], %{}}
    end
  end
end