selector = ".foo"
page.wait_for_function("selector => !!document.querySelector(selector)", selector)
