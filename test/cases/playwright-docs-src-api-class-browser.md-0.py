import asyncio
from playwright.async_api import async_playwright

async def run(playwright):
    firefox = playwright.firefox
    browser = await firefox.launch()
    page = await browser.new_page()
    await page.goto("https://example.com")
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())