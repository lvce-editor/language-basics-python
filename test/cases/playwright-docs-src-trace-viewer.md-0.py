browser = await chromium.launch()
context = await browser.new_context()

# Start tracing before creating / navigating a page.
await context.tracing.start(screenshots=True, snapshots=True, sources=True)

page = await context.new_page()
await page.goto("https://playwright.dev")

# Stop tracing and export it into a zip archive.
await context.tracing.stop(path = "trace.zip")
