try:
  await page.wait_for_selector(".foo")
except TimeoutError as e:
  pass
  # do something if this is a timeout.
