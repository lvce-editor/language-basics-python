from playwright.sync_api import expect

locator = page.locator('.my-element')
expect(locator).to_be_hidden()
