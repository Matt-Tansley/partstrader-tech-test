import { type Locator, type Page } from "@playwright/test";
import { ProductsPage } from "./products-page";
import { CartPage } from "./cart-page";
import { LoginPage } from "./login-page";

export class NavBar {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly signupLoginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsLink = page.getByRole("link", { name: "Products" });
    this.cartLink = page.getByRole("link", { name: "Cart" });
    this.signupLoginLink = page.getByRole("link", { name: "Signup / Login" });
  }

  async clickProducts() {
    await this.productsLink.click();

    return new ProductsPage(this.page);
  }

  async clickCart() {
    await this.cartLink.click();

    return new CartPage(this.page);
  }

  async clickSignupLogin() {
    await this.signupLoginLink.click();

    return new LoginPage(this.page);
  }
}
