from playwright.sync_api import expect

locator = page.locator("input")
expect(locator).to_have_attribute("type", "text")
