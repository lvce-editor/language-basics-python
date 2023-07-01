locator = page.frame_locator("#my-frame").get_by_role("button", name="Sign in")

await locator.click()
