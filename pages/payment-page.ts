import { Locator, type Page } from "@playwright/test";

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

  async fillForm(
    name: string,
    cardNumber: string,
    cvc: string,
    month: string,
    year: string,
  ) {
    await this.nameInput.fill(name);
    await this.cardNumberInput.fill(cardNumber);
    await this.cvcInput.fill(cvc);
    await this.expirationMonthInput.fill(month);
    await this.expirationYearInput.fill(year);
  }

  async clickPayAndConfirmButton() {
    await this.payAndConfirmButton.click();
  }
}
