# Locate element inside frame
username = await page.frame_locator('.frame-class').get_by_label('User Name')
await username.fill('John')
