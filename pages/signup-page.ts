import { Locator, type Page } from "@playwright/test";
import { AccountCreatedPage } from "./account-created-page";
import { SignupFormData } from "../utils/test-data";

export class SignupPage {
  readonly page: Page;
  readonly titleRadio: Locator;
  readonly passwordInput: Locator;
  readonly birthDaySelect: Locator;
  readonly birthMonthSelect: Locator;
  readonly birthYearSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly offersCheckbox: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Radio button locator is brittle if a new radio button is added to form.
    this.titleRadio = page.getByRole("radio").first();
    this.passwordInput = page.getByRole("textbox", { name: "Password *" });
    this.birthDaySelect = page.locator("#days");
    this.birthMonthSelect = page.locator("#months");
    this.birthYearSelect = page.locator("#years");
    this.newsletterCheckbox = page.getByRole("checkbox", {
      name: "Sign up for our newsletter!",
    });
    this.offersCheckbox = page.getByRole("checkbox", {
      name: "Receive special offers from",
    });
    this.firstNameInput = page.getByRole("textbox", { name: "First name *" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last name *" });
    this.companyInput = page.getByRole("textbox", {
      name: "Company",
      exact: true,
    });
    this.address1Input = page.getByRole("textbox", {
      name: "Address * (Street address, P.",
    });
    this.address2Input = page.getByRole("textbox", { name: "Address 2" });
    this.stateInput = page.getByRole("textbox", { name: "State *" });
    this.cityInput = page.getByRole("textbox", { name: "City *" });
    this.zipcodeInput = page.locator("#zipcode");
    this.mobileNumberInput = page.getByRole("textbox", {
      name: "Mobile Number *",
    });
    this.createAccountButton = page.getByRole("button", {
      name: "Create Account",
    });
  }

  // The select dropdown menus could be parametertised by extracting data from the webpage.
  // Date numbers could also be parameterised.
  async fillForm(formData: SignupFormData) {
    await this.titleRadio.check();
    await this.passwordInput.fill(formData.password);
    await this.birthDaySelect.selectOption("1");
    await this.birthMonthSelect.selectOption("1");
    await this.birthYearSelect.selectOption("2000");
    await this.newsletterCheckbox.check();
    await this.offersCheckbox.check();
    await this.firstNameInput.fill(formData.firstName);
    await this.lastNameInput.fill(formData.lastName);
    await this.companyInput.fill(formData.company);
    await this.address1Input.fill(formData.address1);
    await this.address2Input.fill(formData.address2);
    await this.stateInput.fill(formData.state);
    await this.cityInput.fill(formData.city);
    await this.zipcodeInput.fill(formData.zipcode);
    await this.mobileNumberInput.fill(formData.mobileNumber);
  }

  async clickCreateAccount() {
    await this.createAccountButton.click();

    return new AccountCreatedPage(this.page);
  }
}
