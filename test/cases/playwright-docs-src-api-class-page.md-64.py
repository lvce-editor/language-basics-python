async with page.expect_event("framenavigated") as event_info:
    await page.get_by_role("button")
frame = await event_info.value
