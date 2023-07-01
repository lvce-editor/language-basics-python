with page.expect_event("framenavigated") as event_info:
    page.get_by_role("button")
frame = event_info.value
