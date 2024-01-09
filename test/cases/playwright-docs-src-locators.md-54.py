product = page.get_by_role("listitem").filter(has_text="Product 2")

await product.get_by_role("button", name="Add to cart").click()
