import { Locator, type Page } from "@playwright/test";
import { PaymentPage } from "./payment-page";

export class CheckoutPage {
  readonly page: Page;
  readonly deliveryAddress: Locator;
  readonly billingAddress: Locator;
  readonly messageInput: Locator;
  readonly placeOrderLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deliveryAddress = page.locator("#address_delivery");
    this.billingAddress = page.locator("#address_invoice");
    this.messageInput = page.locator('textarea[name="message"]');
    this.placeOrderLink = page.getByRole("link", { name: "Place Order" });
  }

  async fillMessageInput(message: string) {
    await this.messageInput.click();
    await this.messageInput.fill(message);
  }

  async clickPlaceOrderLink() {
    await this.placeOrderLink.click();

    return new PaymentPage(this.page);
  }
}
