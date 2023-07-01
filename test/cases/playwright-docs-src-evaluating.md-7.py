data = { 'text': 'some data', 'value': 1 }
# Pass |data| as a parameter.
result = page.evaluate("""data => {
  window.myApp.use(data)
}""", data)
