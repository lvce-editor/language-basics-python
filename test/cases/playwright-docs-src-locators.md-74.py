row_locator = page.get_by_role("listitem")

await row_locator.filter(has_text="Mary").filter(
    has=page.get_by_role("button", name="Say goodbye")
).screenshot(path="screenshot.png")
