async with frame.expect_navigation():
    await frame.click("a.delayed-navigation") # clicking the link will indirectly cause a navigation
# Resolves after navigation has finished
