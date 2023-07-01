frame.click("button") # click triggers navigation.
frame.wait_for_load_state() # the promise resolves after "load" event.
