import { Locator, type Page } from "@playwright/test";
import { HomePage } from "./home-page";

export class AccountCreatedPage {
  readonly page: Page;
  readonly continueLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueLink = page.getByRole("link", { name: "Continue" });
  }

  async clickContinueLink() {
    await this.continueLink.click();
    return new HomePage(this.page);
  }
}
