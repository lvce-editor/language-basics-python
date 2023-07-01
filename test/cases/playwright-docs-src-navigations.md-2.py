# Navigate and click element
# Click will auto-wait for the element
await page.goto("https://example.com")
await page.get_by_text("example domain").click()
