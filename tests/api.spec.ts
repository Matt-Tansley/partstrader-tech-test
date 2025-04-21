import { test, expect } from "@playwright/test";
import { generateCreateAccountPayload } from "../utils/test-data";
import * as falso from "@ngneat/falso";

test.use({
  extraHTTPHeaders: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

test.beforeAll("Test data setup", () => {
  // Use test id with Falso seed() to ensure repeatable data that is unique per worker.
  falso.seed(`${test.info().testId}`);
});

test("API 7: POST To Verify Login with valid details", async ({ request }) => {
  const createAccountPayload = generateCreateAccountPayload();

  // Create a new account (even if the user already exists)
  await request.post("/api/createAccount", {
    form: {
      name: createAccountPayload.name,
      email: createAccountPayload.email,
      password: createAccountPayload.password,
      title: createAccountPayload.title,
      birth_date: createAccountPayload.birthDate,
      birth_month: createAccountPayload.birthMonth,
      birth_year: createAccountPayload.birthYear,
      firstname: createAccountPayload.firstName,
      lastname: createAccountPayload.lastName,
      company: createAccountPayload.company,
      address1: createAccountPayload.address1,
      address2: createAccountPayload.address2,
      country: createAccountPayload.country,
      zipcode: createAccountPayload.zipcode,
      state: createAccountPayload.state,
      city: createAccountPayload.city,
      mobile_number: createAccountPayload.mobileNumber,
    },
  });

  const response = await request.post("/api/verifyLogin", {
    form: {
      email: createAccountPayload.email,
      password: createAccountPayload.password,
    },
  });

  console.log(`POST verifyLogin response: ${await response.text()}`);

  expect(await response.json()).toMatchObject({
    message: "User exists!",
    responseCode: 200,
  });
});

test("API 8: POST To Verify Login without email parameter", async ({
  request,
}) => {
  const response = await request.post("/api/verifyLogin", {
    form: {
      password: process.env.PASSWORD,
    },
  });

  console.log(`POST verifyLogin response: ${await response.text()}`);

  expect(await response.json()).toMatchObject({
    message:
      "Bad request, email or password parameter is missing in POST request.",
    responseCode: 400,
  });
});

test("API 9: DELETE To Verify Login", async ({ request }) => {
  const response = await request.delete("/api/verifyLogin");

  console.log(`DELETE verifyLogin response: ${await response.text()}`);

  expect(await response.json()).toMatchObject({
    message: "This request method is not supported.",
    responseCode: 405,
  });
});

test("API 10: POST To Verify Login with invalid details", async ({
  request,
}) => {
  const randomEmail = falso.randEmail();
  const randomPassword = falso.randWord();

  // Ensure that the user does not exist
  await request.delete("/api/deleteAccount", {
    form: {
      email: randomEmail,
      password: randomPassword,
    },
  });

  const response = await request.post("api/verifyLogin", {
    form: {
      email: randomEmail,
      password: randomPassword,
    },
  });

  console.log(`POST verifyLogin response: ${await response.text()}`);

  expect(await response.json()).toMatchObject({
    message: "User not found!",
    responseCode: 404,
  });
});
