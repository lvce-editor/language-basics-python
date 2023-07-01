div_counts = await page.eval_on_selector_all("div", "(divs, min) => divs.length >= min", 10)
