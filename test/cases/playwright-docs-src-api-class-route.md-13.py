page.route("**/xhr_endpoint", lambda route: route.fulfill(path="mock_data.json"))
