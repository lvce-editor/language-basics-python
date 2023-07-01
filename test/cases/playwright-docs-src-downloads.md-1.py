# Start waiting for the download
with page.expect_download() as download_info:
    # Perform the action that initiates download
    page.get_by_text("Download file").click()
# Wait for the download to start
download = download_info.value
# Wait for the download process to complete
print(download.path())
# Save downloaded file somewhere
download.save_as("/path/to/save/download/at.txt")
