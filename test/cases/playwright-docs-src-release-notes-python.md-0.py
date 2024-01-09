from playwright.sync_api import Page, expect

def test_example(page: Page) -> None:
    page.goto("https://playwright.dev/")
    page.get_by_role("link", name="Get started").click()
    expect(page.get_by_label("Breadcrumbs").get_by_role("list")).to_contain_text("Installation")
    expect(page.get_by_label("Search")).to_be_visible()
    page.get_by_label("Search").click()
    page.get_by_placeholder("Search docs").fill("locator")
    expect(page.get_by_placeholder("Search docs")).to_have_value("locator");
