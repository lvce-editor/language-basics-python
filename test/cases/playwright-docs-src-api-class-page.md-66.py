selector = ".foo"
await page.wait_for_function("selector => !!document.querySelector(selector)", selector)
