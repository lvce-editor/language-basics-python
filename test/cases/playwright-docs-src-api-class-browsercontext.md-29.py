async with context.expect_event("page") as event_info:
    await page.get_by_role("button").click()
page = await event_info.value
