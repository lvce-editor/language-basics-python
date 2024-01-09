path_to_extension = Path(__file__).parent.joinpath("my-extension")
context = playwright.chromium.launch_persistent_context(
    "",
    headless=False,
    args=[
        "--headless=new",
        f"--disable-extensions-except={path_to_extension}",
        f"--load-extension={path_to_extension}",
    ],
)
