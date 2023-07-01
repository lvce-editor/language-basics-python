await page.locator("#item-to-be-dragged").hover()
await page.mouse.down()
await page.locator("#item-to-drop-at").hover()
await page.mouse.up()
