result = await page.evaluate("([x, y]) => Promise.resolve(x * y)", [7, 8])
print(result) # prints "56"