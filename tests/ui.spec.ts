import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import * as falso from "@ngneat/falso";
import { CheckoutPage } from "../pages/checkout-page";
import {
  generateCreditCardFormData,
  generateSignupFormData,
} from "../utils/test-data";

// Reusable data
// Alternative: custom Playwright fixture
let randomEmail: string;

test.beforeAll("Test data setup", () => {
  // Use parallel worker index with Falso seed() to ensure repeatable data that is unique per worker.
  falso.seed(`worker_${test.info().workerIndex}`);
  randomEmail = falso.randEmail();
});

test.beforeEach("Ensure user does not exist", async ({ request }) => {
  // Makes use of the deleteAccount API: https://automationexercise.com/api_list
  await request.delete("/api/deleteAccount", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      email: randomEmail,
      password: process.env.PASSWORD,
    },
  });
});

test.beforeEach("Open home page", async ({ page }, testInfo) => {
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'
  const homePage = new HomePage(page);
  await homePage.goto();
  await expect(homePage.page).toHaveURL(`${testInfo.project.use.baseURL}/`);

  // 3. Verify that home page is visible successfully
  await expect(
    homePage.page.getByRole("heading", { name: "AutomationExercise" }),
  ).toBeVisible();
});

test("Test Case 14: Place Order: Register while Checkout", async ({ page }) => {
  // First few steps are covered by beforeEach()
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'
  // 3. Verify that home page is visible successfully

  // 4. Add products to cart
  const homePage = new HomePage(page);
  const productsPage = await homePage.navbar.clickProducts();
  await productsPage.addFirstProductToCart();
  await productsPage.continueShopping();

  // 5. Click 'Cart' button
  const cartPage = await productsPage.navbar.clickCart();

  // 6. Verify that cart page is displayed
  await expect(cartPage.page.getByText("Home Shopping Cart")).toBeVisible();

  // 7. Click Proceed To Checkout
  await cartPage.clickProceedToCheckout();
  // Assumption that user is logged out, therefore the register login link will be visible.
  await expect(cartPage.registerLoginLink).toBeVisible();

  // 8. Click 'Register / Login' button
  const loginPage = await cartPage.clickRegisterLoginLink();
  const username = falso.randUserName(); // saving this to check later
  await loginPage.fillForm(username, randomEmail);
  const signupPage = await loginPage.clickSignupLink();

  // 9. Fill all details in Signup and create account
  const signupFormData = generateSignupFormData();
  await signupPage.fillForm(signupFormData);
  const accountCreatedPage = await signupPage.clickCreateAccount();

  // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
  await expect(
    accountCreatedPage.page.getByText("Account Created!"),
  ).toBeVisible();
  const homePageAfterRegister = await accountCreatedPage.clickContinueLink();

  // 11. Verify 'Logged in as username' at top
  await expect(
    homePageAfterRegister.page.getByText(`Logged in as ${username}`),
  ).toBeVisible();

  // 12.Click 'Cart' button
  const cartPageAfterRegister = await homePageAfterRegister.navbar.clickCart();

  // 13. Click 'Proceed To Checkout' button
  const checkoutPage = await cartPageAfterRegister.clickProceedToCheckout();
  // Assumption that user is now logged in, therefore current page will be a checkout page
  if (checkoutPage instanceof CheckoutPage) {
    // 14. Verify Address Details and Review Your Order
    await expect(
      checkoutPage.page.getByRole("heading", { name: "Address Details" }),
    ).toBeVisible();
    // Just checking street address, but could improve to check the full address.
    await expect(checkoutPage.deliveryAddress).toContainText(
      signupFormData.address1,
    );
    await expect(checkoutPage.billingAddress).toContainText(
      signupFormData.address1,
    );
    await expect(
      page.getByRole("heading", { name: "Review Your Order" }),
    ).toBeVisible();

    // 15. Enter description in comment text area and click 'Place Order'
    await checkoutPage.fillMessageInput(falso.randSentence());
    const paymentPage = await checkoutPage.clickPlaceOrderLink();

    // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    const creditCardFormData = generateCreditCardFormData();
    await paymentPage.fillForm(creditCardFormData);

    // 17. Click 'Pay and Confirm Order' button
    await paymentPage.clickPayAndConfirmButton();

    // 18. Verify success message 'Your order has been placed successfully!'
    await expect(page.getByText("Order Placed!")).toBeVisible();

    //19. Click 'Delete Account' button
    await page.getByRole("link", { name: "Delete Account" }).click();

    // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(page.getByText("Account Deleted!")).toBeVisible();
    await page.getByRole("link", { name: "Continue" }).click();
  } else {
    throw new Error(
      `Expected current page to be a CheckoutPage, instead is it of type: ${typeof checkoutPage}`,
    );
  }
});

test("Test Case 15: Place Order: Register before Checkout", async ({
  page,
}) => {
  // First few steps are covered by beforeEach()
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'
  // 3. Verify that home page is visible successfully

  // 4. Click 'Signup / Login' button
  const homePage = new HomePage(page);
  const loginPage = await homePage.navbar.clickSignupLogin();
  const username = falso.randUserName(); // saving this to check later
  await loginPage.fillForm(username, randomEmail);
  const signupPage = await loginPage.clickSignupLink();

  // 5. Fill all details in Signup and create account
  const signupFormData = generateSignupFormData();
  await signupPage.fillForm(signupFormData);
  const accountCreatedPage = await signupPage.clickCreateAccount();

  // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
  await expect(
    accountCreatedPage.page.getByText("Account Created!"),
  ).toBeVisible();
  const homePageAfterRegister = await accountCreatedPage.clickContinueLink();

  // 7. Verify ' Logged in as username' at top
  await expect(
    homePageAfterRegister.page.getByText(`Logged in as ${username}`),
  ).toBeVisible();

  // 8. Add products to cart
  const productsPage = await homePageAfterRegister.navbar.clickProducts();
  await productsPage.addFirstProductToCart();
  await productsPage.continueShopping();

  // 9. Click 'Cart' button
  const cartPage = await productsPage.navbar.clickCart();

  // 10. Verify that cart page is displayed
  await expect(cartPage.page.getByText("Home Shopping Cart")).toBeVisible();

  // 11. Click Proceed To Checkout
  const checkoutPage = await cartPage.clickProceedToCheckout();
  // Assumption that user is logged in, therefore current page will be a checkout page
  if (checkoutPage instanceof CheckoutPage) {
    // 12. Verify Address Details and Review Your Order
    await expect(
      checkoutPage.page.getByRole("heading", { name: "Address Details" }),
    ).toBeVisible();
    // Just checking street address, but could improve to check the full address.
    await expect(checkoutPage.deliveryAddress).toContainText(
      signupFormData.address1,
    );
    await expect(checkoutPage.billingAddress).toContainText(
      signupFormData.address1,
    );
    await expect(
      page.getByRole("heading", { name: "Review Your Order" }),
    ).toBeVisible();

    // 13. Enter description in comment text area and click 'Place Order'
    await checkoutPage.fillMessageInput(falso.randSentence());
    const paymentPage = await checkoutPage.clickPlaceOrderLink();

    // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    const creditCardFormData = generateCreditCardFormData();
    await paymentPage.fillForm(creditCardFormData);

    // 15. Click 'Pay and Confirm Order' button
    await paymentPage.clickPayAndConfirmButton();

    // 16. Verify success message 'Your order has been placed successfully!'
    await expect(page.getByText("Order Placed!")).toBeVisible();

    // 17. Click 'Delete Account' button
    await page.getByRole("link", { name: "Delete Account" }).click();

    // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await expect(page.getByText("Account Deleted!")).toBeVisible();
    await page.getByRole("link", { name: "Continue" }).click();
  } else {
    throw new Error(
      `Expected current page to be a CheckoutPage, instead is it of type: ${typeof checkoutPage}`,
    );
  }
});
