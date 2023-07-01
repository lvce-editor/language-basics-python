# in your playwright script, assuming the preload.js file is in same directory
await page.add_init_script(path="./preload.js")
