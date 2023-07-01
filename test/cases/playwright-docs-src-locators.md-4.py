locator = page.get_by_role("button", name="Sign in")

await locator.hover()
await locator.click()
