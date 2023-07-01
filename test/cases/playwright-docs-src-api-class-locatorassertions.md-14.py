from playwright.async_api import expect

locator = page.get_by_role("textbox")
await expect(locator).to_be_focused()
