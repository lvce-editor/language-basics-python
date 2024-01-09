def records_or_updates_the_har_file(page: Page):
    # Get the response from the HAR file
    page.route_from_har("./hars/fruit.har", url="*/**/api/v1/fruits", update=True)

    # Go to the page
    page.goto("https://demo.playwright.dev/api-mocking")

    # Assert that the fruit is visible
    expect(page.get_by_text("Strawberry")).to_be_visible()
