from playwright.async_api import expect

locator = page.locator("list > .component")
await expect(locator).to_have_count(3)
