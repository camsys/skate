use Mix.Config

#config :skate,
#  redirect_http?: true,
#  static_href: {SkateWeb.Router.Helpers, :static_url}
config :skate, Gtfs.CacheFile, cache_filename: "dev_cache.terms"

# For production, don't forget to configure the url host
# to something meaningful, Phoenix uses this information
# when generating URLs.
#
# Note we also include the path to a cache manifest
# containing the digested version of static files. This
# manifest is generated by the `mix phx.digest` task,
# which you should run after static files are built and
# before starting your production server.
config :skate, SkateWeb.Endpoint,
  server: true,
  http: [:inet6, port: System.get_env("PORT") || 4000],
#  url: [host: {:system, "HOST"}, port: 80],
#  static_url: [
#    scheme: {:system, "STATIC_SCHEME"},
#    host: {:system, "STATIC_HOST"},
#    port: {:system, "STATIC_PORT"},
#    path: {:system, "STATIC_PATH"}
#  ],
  cache_static_manifest: "priv/static/cache_manifest.json"

#config :skate, :websocket_check_origin, [
#  "https://*.mbta.com",
#  "https://*.mbtace.com"
#]

# Do not print debug messages in production
config :logger, level: :info

config :logger, :console,
  format: "$time $metadata[$level] node=$node $message\n",
  metadata: [:request_id]

# Configure Ueberauth to use Cognito
config :ueberauth, Ueberauth,
  providers: [
    #cognito: {Ueberauth.Strategy.Cognito, []}
    cognito: {Skate.Ueberauth.Strategy.Fake, []}
  ]

config :ueberauth, Ueberauth.Strategy.Cognito,
  auth_domain: {System, :get_env, ["COGNITO_DOMAIN"]},
  client_id: {System, :get_env, ["COGNITO_CLIENT_ID"]},
  client_secret: {System, :get_env, ["COGNITO_CLIENT_SECRET"]},
  user_pool_id: {System, :get_env, ["COGNITO_USER_POOL_ID"]},
  aws_region: {System, :get_env, ["COGNITO_AWS_REGION"]}

config :skate, SkateWeb.AuthManager, secret_key: {System, :get_env, ["GUARDIAN_SECRET_KEY"]}

config :skate,
  record_fullstory: true,
  record_appcues: true

config :ehmon, :report_mf, {:ehmon, :info_report}

# ## SSL Support
#
# To get SSL working, you will need to add the `https` key
# to the previous section and set your `:url` port to 443:
#
#     config :skate, SkateWeb.Endpoint,
#       ...
#       url: [host: "example.com", port: 443],
#       https: [
#         :inet6,
#         port: 443,
#         cipher_suite: :strong,
#         keyfile: System.get_env("SOME_APP_SSL_KEY_PATH"),
#         certfile: System.get_env("SOME_APP_SSL_CERT_PATH")
#       ]
#
# The `cipher_suite` is set to `:strong` to support only the
# latest and more secure SSL ciphers. This means old browsers
# and clients may not be supported. You can set it to
# `:compatible` for wider support.
#
# `:keyfile` and `:certfile` expect an absolute path to the key
# and cert in disk or a relative path inside priv, for example
# "priv/ssl/server.key". For all supported SSL configuration
# options, see https://hexdocs.pm/plug/Plug.SSL.html#configure/1
#
# We also recommend setting `force_ssl` in your endpoint, ensuring
# no data is ever sent via http, always redirecting to https:
#
#     config :skate, SkateWeb.Endpoint,
#       force_ssl: [hsts: true]
#
# Check `Plug.SSL` for all available options in `force_ssl`.

# ## Using releases (distillery)
#
# If you are doing OTP releases, you need to instruct Phoenix
# to start the server for all endpoints:
#
#     config :phoenix, :serve_endpoints, true
#
# Alternatively, you can configure exactly which server to
# start per endpoint:
#
#     config :skate, SkateWeb.Endpoint, server: true
#
# Note you can't rely on `System.get_env/1` when using releases.
# See the releases documentation accordingly.
