import { Locator, type Page } from "@playwright/test";
import { CreditCardFormData } from "../utils/test-data";

export class PaymentPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expirationMonthInput: Locator;
  readonly expirationYearInput: Locator;
  readonly payAndConfirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('input[name="name_on_card"]');
    this.cardNumberInput = page.locator('input[name="card_number"]');
    this.cvcInput = page.getByRole("textbox", { name: "ex." });
    this.expirationMonthInput = page.getByRole("textbox", { name: "MM" });
    this.expirationYearInput = page.getByRole("textbox", { name: "YYYY" });
    this.payAndConfirmButton = page.getByRole("button", {
      name: "Pay and Confirm Order",
    });
  }

  async fillForm(formData: CreditCardFormData) {
    await this.nameInput.fill(formData.name);
    await this.cardNumberInput.fill(formData.cardNumber);
    await this.cvcInput.fill(formData.cvc);
    await this.expirationMonthInput.fill(formData.month.toString());
    await this.expirationYearInput.fill(formData.year.toString());
  }

  async clickPayAndConfirmButton() {
    await this.payAndConfirmButton.click();
  }
}
