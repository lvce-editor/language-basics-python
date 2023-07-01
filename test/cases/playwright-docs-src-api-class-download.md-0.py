async with page.expect_download() as download_info:
    await page.get_by_text("Download file").click()
download = await download_info.value
# waits for download to complete
path = await download.path()
