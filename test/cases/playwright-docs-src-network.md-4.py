# Browser proxy option is required for Chromium on Windows.
browser = await chromium.launch(proxy={"server": "per-context"})
context = await browser.new_context(proxy={"server": "http://myproxy.com:3128"})
