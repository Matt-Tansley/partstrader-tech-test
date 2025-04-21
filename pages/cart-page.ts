import { Locator, type Page } from "@playwright/test";
import { LoginPage } from "./login-page";
import { CheckoutPage } from "./checkout-page";

export class CartPage {
  readonly page: Page;
  readonly proceedToCheckoutButton: Locator;
  readonly registerLoginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.proceedToCheckoutButton = page.getByText("Proceed To Checkout");
    this.registerLoginLink = page.getByRole("link", {
      name: "Register / Login",
    });
  }

  async clickProceedToCheckout() {
    await this.proceedToCheckoutButton.click();

    // Would like to improve the logic here, since this click can either bring up a pop-up or navigate to checkout page
    if (await this.registerLoginLink.isVisible()) {
      return this.page;
    } else {
      return new CheckoutPage(this.page);
    }
  }

  async clickRegisterLoginLink() {
    await this.registerLoginLink.click();

    return new LoginPage(this.page);
  }
}
