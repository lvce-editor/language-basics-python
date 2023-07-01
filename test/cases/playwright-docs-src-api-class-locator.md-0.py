for li in await page.get_by_role('listitem').all():
  await li.click();
