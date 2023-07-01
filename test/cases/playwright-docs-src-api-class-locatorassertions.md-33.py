from playwright.sync_api import expect

locator = page.locator("list > .component")
expect(locator).to_have_count(3)
