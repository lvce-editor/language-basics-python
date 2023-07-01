child = page.get_by_text("Hello")
parent = page.get_by_role("listitem").filter(has=child)
