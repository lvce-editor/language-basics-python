page.on("requestfailed", lambda request: print(request.url + " " + request.failure.error_text))
