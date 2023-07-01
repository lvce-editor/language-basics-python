import re
from playwright.sync_api import expect

expect(page).to_have_title(re.compile("Playwright"))
