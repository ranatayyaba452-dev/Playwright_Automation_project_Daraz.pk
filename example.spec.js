const { test, expect } = require('@playwright/test');
const { DarazPage } = require('../pages/DarazPage');

test('Daraz Electronics using POM', async ({ page }) => {
  const daraz = new DarazPage(page);

  await daraz.open();
  await daraz.searchProduct('electronics');

  const productCount = await daraz.getProductCount();

  console.log('Product count:', productCount);

  expect(productCount).toBeGreaterThan(0);
});