await page.set_content("<div><span></span></div>")
div = await page.query_selector("div")
# waiting for the "span" selector relative to the div.
span = await div.wait_for_selector("span", state="attached")
