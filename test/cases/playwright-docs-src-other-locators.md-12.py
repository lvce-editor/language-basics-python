# Click first button
await page.locator("button").locator("nth=0").click()

# Click last button
await page.locator("button").locator("nth=-1").click()
