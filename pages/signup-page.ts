import { Locator, type Page } from "@playwright/test";
import { AccountCreatedPage } from "./account-created-page";

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

  // Feels like a long method code smell... how would you handle this?
  // The select dropdown menus could be parametertised by extracting data from the webpage.
  // Might be better to pass the list of arguments as an object.
  async fillForm(
    password: string,
    firstName: string,
    lastName: string,
    company: string,
    address1: string,
    address2: string,
    state: string,
    city: string,
    zipcode: string,
    mobileNumber: string,
  ) {
    await this.titleRadio.check();
    await this.passwordInput.fill(password);
    await this.birthDaySelect.selectOption("1");
    await this.birthMonthSelect.selectOption("1");
    await this.birthYearSelect.selectOption("2000");
    await this.newsletterCheckbox.check();
    await this.offersCheckbox.check();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.companyInput.fill(company);
    await this.address1Input.fill(address1);
    await this.address2Input.fill(address2);
    await this.stateInput.fill(state);
    await this.cityInput.fill(city);
    await this.zipcodeInput.fill(zipcode);
    await this.mobileNumberInput.fill(mobileNumber);
  }

  async clickCreateAccount() {
    await this.createAccountButton.click();

    return new AccountCreatedPage(this.page);
  }
}
