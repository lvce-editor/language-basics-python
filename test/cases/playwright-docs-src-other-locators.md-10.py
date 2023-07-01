# Wait until all three buttons are visible
await page.locator(":nth-match(:text('Buy'), 3)").wait_for()
