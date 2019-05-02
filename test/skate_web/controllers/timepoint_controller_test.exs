defmodule SkateWeb.TimepointControllerTest do
  use SkateWeb.ConnCase

  describe "index" do
    test "returns timepoints for a multiple routes", %{conn: conn} do
      gtfs_server_pid =
        Gtfs.start_mocked(%{
          "routes.txt" => [
            "route_id,route_type",
            "71,3",
            "73,3"
          ],
          "route_patterns.txt" => [
            "route_pattern_id,route_id,direction_id,representative_trip_id",
            "71-pattern,71,1,71-trip",
            "73-pattern,73,1,73-trip"
          ],
          "trips.txt" => [
            "route_id,trip_id",
            "71,71-trip",
            "73,73-trip"
          ],
          "stop_times.txt" => [
            "trip_id,stop_sequence,checkpoint_id",
            "71-trip,1,check",
            "73-trip,1,check"
          ]
        })

      conn = Plug.Conn.assign(conn, :gtfs_server_pid, gtfs_server_pid)
      response = get(conn, Routes.timepoint_path(conn, :index), %{"route_id" => ["71", "73"]})

      assert json_response(response, 200) == %{
               "data" => %{
                 "71" => ["check"],
                 "73" => ["check"]
               }
             }
    end
  end
end
