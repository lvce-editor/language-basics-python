with context.expect_event("page") as event_info:
    page.get_by_role("button").click()
page = event_info.value
