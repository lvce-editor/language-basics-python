# Single selection matching the value or label
await page.get_by_label('Choose a color').select_option('blue')

# Single selection matching the label
await page.get_by_label('Choose a color').select_option(label='Blue')

# Multiple selected items
await page.get_by_label('Choose multiple colors').select_option(['red', 'green', 'blue'])
