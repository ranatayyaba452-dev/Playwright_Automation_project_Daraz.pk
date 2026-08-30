class DarazPage {
  constructor(page) {
    this.page = page;
    this.searchBox = page.locator('input[placeholder*="Search"]').first();
    this.products = page.locator('a[href*="/products/"]');
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

  async getProductCount() {
    return await this.products.count();
  }

  async openFirstProduct() {
    await this.products.first().click();
  }
}

module.exports = { DarazPage };