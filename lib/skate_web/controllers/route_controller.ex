defmodule SkateWeb.RouteController do
  use SkateWeb, :controller

  @spec index(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def index(conn, _params) do
    routes = Gtfs.all_routes()
    json(conn, %{data: routes})
  end
end
