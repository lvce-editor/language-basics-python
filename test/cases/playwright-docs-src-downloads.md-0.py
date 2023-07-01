# Start waiting for the download
async with page.expect_download() as download_info:
    # Perform the action that initiates download
    await page.get_by_text("Download file").click()
download = await download_info.value
# Wait for the download process to complete
print(await download.path())
# Save downloaded file somewhere
await download.save_as("/path/to/save/download/at.txt")
