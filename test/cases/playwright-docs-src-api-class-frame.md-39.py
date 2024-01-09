frame.click("a.delayed-navigation") # clicking the link will indirectly cause a navigation
frame.wait_for_url("**/target.html")
