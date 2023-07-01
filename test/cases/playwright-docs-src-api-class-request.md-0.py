response = await page.goto("http://example.com")
print(response.request.redirected_from.url) # "http://example.com"
