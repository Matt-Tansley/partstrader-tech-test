import { type Locator, type Page } from "@playwright/test";
import { NavBar } from "./navbar";

export class ProductsPage {
  readonly page: Page;
  readonly navbar: NavBar;
  readonly firstAddToCartLink: Locator;
  readonly viewCartLink: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavBar(page);
    this.firstAddToCartLink = page
      .locator("a", { hasText: "Add to cart" })
      .first();
    this.viewCartLink = page.getByRole("link", { name: "View Cart" });
    this.continueShoppingButton = page.getByRole("button", {
      name: "Continue Shopping",
    });
  }

  async addFirstProductToCart() {
    await this.firstAddToCartLink.click();
  }

  async viewCart() {
    await this.viewCartLink.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
