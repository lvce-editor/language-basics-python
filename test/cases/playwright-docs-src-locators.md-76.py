for row in await page.get_by_role("listitem").all():
    print(await row.text_content())
