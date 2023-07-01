# Throws if there are several frames in DOM:
await page.frame_locator('.result-frame').get_by_role('button').click()

# Works because we explicitly tell locator to pick the first frame:
await page.frame_locator('.result-frame').first.get_by_role('button').click()
