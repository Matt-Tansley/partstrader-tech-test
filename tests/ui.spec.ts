import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import * as falso from "@ngneat/falso";

test.beforeAll(() => {
  // Use parallel worker index with Falso seed() to ensure repeatable data that is unique per worker.
  falso.seed(`worker_${test.info().workerIndex}`);
});

test("Test Case 14: Place Order: Register while Checkout", async ({ page }) => {
  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'
  const homePage = new HomePage(page);
  await homePage.goto();

  // 3. Verify that home page is visible successfully
  await expect(
    page.getByRole("heading", { name: "AutomationExercise" }),
  ).toBeVisible();

  // 4. Add products to cart
  const productsPage = await homePage.navbar.clickProducts();
  await productsPage.addFirstProductToCart();
  await productsPage.continueShopping();

  // 5. Click 'Cart' button
  const cartPage = await productsPage.navbar.clickCart();

  // 6. Verify that cart page is displayed
  await expect(page.getByText("Home Shopping Cart")).toBeVisible();

  // 7. Click Proceed To Checkout
  // Assumption that user is logged out
  await cartPage.clickProceedToCheckout();
  await expect(cartPage.registerLoginLink).toBeVisible();

  // 8. Click 'Register / Login' button
  const loginPage = await cartPage.clickRegisterLoginLink();
  const username = falso.randUserName(); // saving this to check later
  await loginPage.fillForm(username, falso.randEmail());
  const signupPage = await loginPage.clickSignupLink();

  // 9. Fill all details in Signup and create account
  // Might be better to pass the list of arguments as an object for readability.
  const streetAddress = falso.randStreetAddress(); // saving this to check later
  await signupPage.fillForm(
    // falso.randWord(),
    "D3v3nv1r0m3nt",
    falso.randFirstName(),
    falso.randLastName(),
    falso.randCompanyName(),
    streetAddress,
    falso.randCounty(),
    falso.randState(),
    falso.randCity(),
    falso.randZipCode(),
    falso.randPhoneNumber(),
  );
  const accountCreatedPage = await signupPage.clickCreateAccount();

  // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
  await expect(page.getByText("Account Created!")).toBeVisible();
  // Should clickContinueLink() return a home page instance?
  await accountCreatedPage.clickContinueLink();

  // 11. Verify ' Logged in as username' at top
  // Assumption that we are back on home page.
  await expect(page.getByText(`Logged in as ${username}`)).toBeVisible();

  // 12.Click 'Cart' button
  // Should cart page instance be overridden?
  await homePage.navbar.clickCart();

  // 13. Click 'Proceed To Checkout' button
  // Assumption that we are back on cart page, and user is logged in.
  const checkoutPage = await cartPage.clickProceedToCheckout();

  // 14. Verify Address Details and Review Your Order
  await expect(
    page.getByRole("heading", { name: "Address Details" }),
  ).toBeVisible();
  // Just checking street name, but could improve to check the full address.
  await expect(checkoutPage.deliveryAddress).toContainText(streetAddress);
  await expect(checkoutPage.billingAddress).toContainText(streetAddress);
  await expect(
    page.getByRole("heading", { name: "Review Your Order" }),
  ).toBeVisible();

  // 15. Enter description in comment text area and click 'Place Order'
  await checkoutPage.fillMessageInput(falso.randSentence());
  const paymentPage = await checkoutPage.clickPlaceOrderLink();

  // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
  // Improvement would be to have better utils for generate credit card data
  await paymentPage.fillForm(
    falso.randFirstName(),
    falso.randCreditCardNumber(),
    falso.randCreditCardCVV(),
    falso.randNumber({ min: 1, max: 12 }).toString(),
    falso.randNumber({ min: 2025, max: 2030 }).toString(),
  );

  // 17. Click 'Pay and Confirm Order' button
  await paymentPage.clickPayAndConfirmButton();

  // 18. Verify success message 'Your order has been placed successfully!'
  await expect(page.getByText("Order Placed!")).toBeVisible();

  //19. Click 'Delete Account' button
  await page.getByRole("link", { name: "Delete Account" }).click();

  // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  await expect(page.getByText("Account Deleted!")).toBeVisible();
  await page.getByRole("link", { name: "Continue" }).click();
});
