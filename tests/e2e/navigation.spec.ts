import { expect, test } from '@playwright/test';

test('navbar links navigate from legal pages to home sections', async ({ page }) => {
  await page.goto('/termos-de-uso');

  await page.locator('nav a[href="/\#beneficios"]').click();

  await expect(page).toHaveURL(/\/\#beneficios$/);
  await expect(page.locator('#beneficios')).toBeVisible();
});
