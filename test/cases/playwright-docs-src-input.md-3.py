# Check the checkbox
page.get_by_label('I agree to the terms above').check()

# Assert the checked state
assert page.get_by_label('Subscribe to newsletter').is_checked() is True

# Select the radio button
page.get_by_label('XL').check()
