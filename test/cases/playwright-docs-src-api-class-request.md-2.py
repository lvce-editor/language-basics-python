response = await page.goto("https://google.com")
print(response.request.redirected_from) # None
