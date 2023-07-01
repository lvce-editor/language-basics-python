for row in page.get_by_role("listitem").all():
    print(row.text_content())
