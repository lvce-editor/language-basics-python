import asyncio
from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeoutError

async def run(playwright):
    browser = await playwright.chromium.launch()
    page = await browser.new_page()
    try:
      await page.locator("text=Example").click(timeout=100)
    except PlaywrightTimeoutError:
      print("Timeout!")
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)

asyncio.run(main())
