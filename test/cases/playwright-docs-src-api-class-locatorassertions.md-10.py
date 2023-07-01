from playwright.async_api import expect

locator = page.locator("div.warning")
await expect(locator).to_be_empty()
