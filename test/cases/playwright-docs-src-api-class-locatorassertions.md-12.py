from playwright.async_api import expect

locator = page.locator("button.submit")
await expect(locator).to_be_enabled()
