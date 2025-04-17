import { type Locator, type Page } from "@playwright/test";
import { ProductsPage } from "./products-page";
import { CartPage } from "./cart-page";

export class NavBar {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsLink = page.getByRole("link", { name: "Products" });
    this.cartLink = page.getByRole("link", { name: "Cart" });
  }

  async clickProducts() {
    await this.productsLink.click();

    return new ProductsPage(this.page);
  }

  async clickCart() {
    await this.cartLink.click();

    return new CartPage(this.page);
  }
}
