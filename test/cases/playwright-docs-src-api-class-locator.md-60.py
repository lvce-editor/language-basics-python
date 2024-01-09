await locator.press_sequentially("hello") # types instantly
await locator.press_sequentially("world", delay=100) # types slower, like a user
