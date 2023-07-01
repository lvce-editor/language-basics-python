from playwright.sync_api import expect

locator = page.locator("button.submit")
expect(locator).to_be_enabled()
