page.on("dialog", lambda dialog: print(dialog.message))
page.get_by_role("button").click() # Will hang here
