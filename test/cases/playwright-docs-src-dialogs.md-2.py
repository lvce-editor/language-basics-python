page.on("dialog", lambda dialog: print(dialog.message))
await page.get_by_role("button").click() # Will hang here
