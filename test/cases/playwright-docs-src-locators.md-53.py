expect(
    page.get_by_role("listitem").filter(
        has_not=page.get_by_role("heading", name="Product 2")
    )
).to_have_count(1)
