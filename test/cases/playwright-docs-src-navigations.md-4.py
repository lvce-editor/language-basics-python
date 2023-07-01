await page.get_by_text("Click me").click()
await page.wait_for_url("**/login")
