browser.start_tracing(page, path="trace.json")
page.goto("https://www.google.com")
browser.stop_tracing()
