import pytest

@pytest.mark.browser_context_args(timezone_id="Europe/Berlin", locale="en-GB")
def test_browser_context_args(page):
    assert page.evaluate("window.navigator.userAgent") == "Europe/Berlin"
    assert page.evaluate("window.navigator.languages") == ["de-DE"]
