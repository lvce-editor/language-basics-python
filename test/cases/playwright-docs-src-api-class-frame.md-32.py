selector = ".foo"
await frame.wait_for_function("selector => !!document.querySelector(selector)", selector)
