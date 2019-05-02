defmodule SkateWeb.TimepointController do
  use SkateWeb, :controller

  @spec index(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def index(conn, %{"route_id" => route_ids}) do
    gtfs_server_pid = conn.assigns[:gtfs_server_pid]

    data =
      Map.new(route_ids, fn route_id ->
        {route_id, Gtfs.timepoints_on_route(route_id, gtfs_server_pid)}
      end)

    json(conn, %{data: data})
  end
end
