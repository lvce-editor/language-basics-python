await expect(page.get_by_role("listitem")).to_have_text(["apple", "banana", "orange"])
