await expect(
    page.get_by_text(re.compile("welcome, john", re.IGNORECASE))
).to_be_visible()
