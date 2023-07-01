# Capture into Image
screenshot_bytes = await page.screenshot()
print(base64.b64encode(screenshot_bytes).decode())
