from playwright.sync_api import expect

locator = page.locator("div.warning")
expect(locator).to_be_empty()
