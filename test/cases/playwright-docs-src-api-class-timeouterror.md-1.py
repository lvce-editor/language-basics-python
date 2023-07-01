from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    try:
      page.locator("text=Example").click(timeout=100)
    except PlaywrightTimeoutError:
      print("Timeout!")
    browser.close()
