from playwright.sync_api import expect

locator = page.get_by_role("textbox")
expect(locator).to_be_editable()
