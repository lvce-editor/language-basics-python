data = { 'text': 'some data', 'value': 1 }
result = page.evaluate("""() => {
  # There is no |data| in the web page.
  window.myApp.use(data)
}""")
