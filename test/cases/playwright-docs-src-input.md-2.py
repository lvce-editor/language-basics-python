# Check the checkbox
await page.get_by_label('I agree to the terms above').check()

# Assert the checked state
await expect(page.get_by_label('Subscribe to newsletter')).to_be_checked()

# Select the radio button
await page.get_by_label('XL').check()
