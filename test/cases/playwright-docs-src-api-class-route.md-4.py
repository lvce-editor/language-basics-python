# Handle GET requests.
def handle_get(route):
    if route.request.method != "GET":
        route.fallback()
        return
  # Handling GET only.
  # ...

# Handle POST requests.
def handle_post(route):
    if route.request.method != "POST":
        route.fallback()
        return
  # Handling POST only.
  # ...

await page.route("**/*", handle_get)
await page.route("**/*", handle_post)
