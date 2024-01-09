locator = page.get_by_label("Password")
await locator.press_sequentially("my password")
await locator.press("Enter")
