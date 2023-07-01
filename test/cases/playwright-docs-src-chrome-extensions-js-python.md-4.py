path_to_extension = Path(__file__).parent.joinpath("my-extension")
context = playwright.chromium.launch_persistent_context(
    "",
    headless=False,
    args=[
        "--headless=new", # the new headless arg for chrome v109+. Use '--headless=chrome' as arg for browsers v94-108.
        f"--disable-extensions-except={path_to_extension}",
        f"--load-extension={path_to_extension}",
    ],
)
