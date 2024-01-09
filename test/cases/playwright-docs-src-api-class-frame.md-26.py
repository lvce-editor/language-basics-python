# Single selection matching the value or label
await frame.select_option("select#colors", "blue")
# single selection matching the label
await frame.select_option("select#colors", label="blue")
# multiple selection
await frame.select_option("select#colors", value=["red", "green", "blue"])
