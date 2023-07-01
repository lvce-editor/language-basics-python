async with page.expect_popup() as popup:
  await page.get_by_text("open the popup").click()
child_page = await popup.value
await child_page.goto("https://wikipedia.org")
