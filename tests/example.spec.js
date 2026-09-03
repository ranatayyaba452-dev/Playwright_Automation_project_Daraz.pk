const { test, expect } = require('@playwright/test');
const { DarazPage } = require('../pages/DarazPage');

test('Daraz Electronics Automation', async ({ page }) => {
  const daraz = new DarazPage(page);

  // 1. Navigate to Daraz
  await daraz.open();

  // 2. Search for Electronics
  await daraz.searchProduct('electronics');

  // 3. Apply Brand Filter
  await daraz.applyBrandFilter();

  // 4. Apply Price Filter 500–5000 PKR
  await daraz.applyPriceFilter(500, 5000);

  // 5. Validate Product Count
  const productCount = await daraz.getProductCount();
  console.log('Product count:', productCount);

  expect(productCount).toBeGreaterThan(0);

  // 6. Open Product Details Page
  await daraz.openFirstProduct();

  await expect(page).toHaveURL(/product/i);

  // 7. Verify Free Shipping
  const freeShipping = await daraz.isFreeShippingAvailable();

  console.log(
    freeShipping
      ? 'Free Shipping is available'
      : 'Free Shipping is not available for this product'
  );
});
