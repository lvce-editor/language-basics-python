with page.expect_popup() as page_info:
    page.get_by_role("button").click() # click triggers a popup.
popup = page_info.value
# Wait for the "DOMContentLoaded" event.
popup.wait_for_load_state("domcontentloaded")
print(popup.title()) # popup is ready to use.
