import re
from playwright.async_api import expect

# ...
await expect(page).to_have_url(re.compile(".*checkout"))
