import { Locator, type Page } from "@playwright/test";
import { SignupPage } from "./signup-page";

export class LoginPage {
  readonly page: Page;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupNameInput = page
      .locator("form")
      .filter({ hasText: "Signup" })
      .getByPlaceholder("Name");
    this.signupEmailInput = page
      .locator("form")
      .filter({ hasText: "Signup" })
      .getByPlaceholder("Email Address");
    this.signupLink = page.getByRole("button", { name: "Signup" });
  }

  async fillForm(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
  }

  async clickSignupLink() {
    await this.signupLink.click();

    return new SignupPage(this.page);
  }
}
