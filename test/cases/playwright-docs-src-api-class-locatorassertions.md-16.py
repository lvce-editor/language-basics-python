from playwright.async_api import expect

locator = page.locator('.my-element')
await expect(locator).to_be_hidden()
