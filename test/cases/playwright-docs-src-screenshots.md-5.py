screenshot_bytes = page.screenshot()
print(base64.b64encode(screenshot_bytes).decode())
