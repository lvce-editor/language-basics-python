# A specific element is visible.
await expect(page.get_by_text("Welcome")).to_be_visible()

# At least one item in the list is visible.
await expect(page.get_by_test_id("todo-item").first).to_be_visible()

# At least one of the two elements is visible, possibly both.
await expect(
    page.get_by_role("button", name="Sign in")
    .or_(page.get_by_role("button", name="Sign up"))
    .first
).to_be_visible()
