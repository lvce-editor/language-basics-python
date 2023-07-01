from playwright.async_api import expect

locator = page.locator("input")
await expect(locator).to_have_attribute("type", "text")
