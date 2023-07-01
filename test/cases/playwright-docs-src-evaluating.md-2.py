status = await page.evaluate("""async () => {
  response = await fetch(location.href)
  return response.status
}""")
