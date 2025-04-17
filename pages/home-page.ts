import { type Page } from "@playwright/test";
import { NavBar } from "./navbar";

export class HomePage {
  readonly page: Page;
  readonly navbar: NavBar;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavBar(page);
  }

  async goto() {
    await this.page.goto("/");
  }
}
