# 5 in-stock items
await expect(page.get_by_role("listitem").filter(has_not_text="Out of stock")).to_have_count(5)
