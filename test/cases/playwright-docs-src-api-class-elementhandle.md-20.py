element_handle = await page.query_selector("input")
await element_handle.type("some text")
await element_handle.press("Enter")
