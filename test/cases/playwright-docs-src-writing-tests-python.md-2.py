from playwright.sync_api import expect

get_started = page.get_by_role("link", name="Get started")

expect(get_started).to_have_attribute("href", "/docs/installation")
get_started.click()
