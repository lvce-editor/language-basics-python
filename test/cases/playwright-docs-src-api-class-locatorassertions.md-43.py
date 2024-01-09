from playwright.sync_api import expect

# ✓ Has the right items in the right order
expect(page.locator("ul > li")).to_have_text(["Text 1", "Text 2", "Text 3"])

# ✖ Wrong order
expect(page.locator("ul > li")).to_have_text(["Text 3", "Text 2", "Text 1"])

# ✖ Last item does not match
expect(page.locator("ul > li")).to_have_text(["Text 1", "Text 2", "Text"])

# ✖ Locator points to the outer list element, not to the list items
expect(page.locator("ul")).to_have_text(["Text 1", "Text 2", "Text 3"])
