async def handle_download(download):
    print(await download.path())
page.on("download", handle_download)
