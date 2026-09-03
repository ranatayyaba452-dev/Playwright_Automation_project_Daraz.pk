class DarazPage {
  constructor(page) {
    this.page = page;

    this.searchBox = page.locator('input[placeholder*="Search"]').first();
    this.brandFilter = page.getByText('Brand', { exact: true }).first();

    this.minPrice = page.getByPlaceholder('Min').first();
    this.maxPrice = page.getByPlaceholder('Max').first();

    this.products = page.locator('a[href*="/products/"]');
    this.freeShipping = page.getByText(/Free Shipping/i).first();
  }

  async open() {
    await this.page.goto('https://www.daraz.pk/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async searchProduct(product) {
    await this.searchBox.fill(product);
    await this.searchBox.press('Enter');
    await this.page.waitForTimeout(5000);
  }

  async applyBrandFilter() {
    await this.brandFilter.click();

    const brandCheckbox = this.page.locator('input[type="checkbox"]').first();
    await brandCheckbox.check();
  }

  async applyPriceFilter(min, max) {
    await this.minPrice.fill(String(min));
    await this.maxPrice.fill(String(max));
    await this.maxPrice.press('Enter');
    await this.page.waitForTimeout(3000);
  }

  async getProductCount() {
    return await this.products.count();
  }

  async openFirstProduct() {
    await this.products.first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isFreeShippingAvailable() {
    return await this.freeShipping.isVisible().catch(() => false);
  }
}

module.exports = { DarazPage };
