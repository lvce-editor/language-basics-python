def handle_route(route):
  if ("my-string" in route.request.post_data):
    route.fulfill(body="mocked-data")
  else:
    route.continue_()
await page.route("/api/**", handle_route)
