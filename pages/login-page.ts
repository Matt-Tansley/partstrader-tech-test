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

  async goto() {
    await this.page.goto("/login");
  }

  async fillSignupNameInput(name: string) {
    await this.signupNameInput.click();
    await this.signupNameInput.fill(name);
  }

  async fillSignupEmailinput(email: string) {
    await this.signupEmailInput.click();
    await this.signupEmailInput.fill(email);
  }

  async clickSignupLink() {
    await this.signupLink.click();

    return new SignupPage(this.page);
  }
}
