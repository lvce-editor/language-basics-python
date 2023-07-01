async def handle_dialog(dialog):
    assert dialog.type == 'beforeunload'
    await dialog.dismiss()

page.on('dialog', lambda: handle_dialog)
await page.close(run_before_unload=True)
