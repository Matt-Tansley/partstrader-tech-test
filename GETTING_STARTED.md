# Getting Started

## Exercise Instructions

- Provide the following documentation with applicable examples:

  - How to get the latest code.
  - How to deploy it locally.
  - How to run the tests.

- Intended audience: new members of the team who will need to use your tests.
- The instructions will be used by the reviewer of your PR for completeness.

**Note:** Remove this section after completing the exercise.

## Purpose

The purpose of this document is to:

- Document my process for working on the tech test.
- Explain how to get the test suite up and running.

## Pre-Setup

Before writing any code, I have done manual and exploratory testing to get a feel for the system under test, and to see if there are any obvious bugs and/or usability issues while following the in-scope test cases.

For the UI test cases, I have done exploratory testing on the front end.

For the API test cases, I have done checks in the browser network tab and Postman (see `partstrader_tech_test.postman_collection.json`).

The browser I am using on my local machine is Arc, a Chromium based browser, and I have played around in the Dev environment.

- **Improvement:** manual and exploratory testing should also be conducted on other browsers and environments.

I have documented issues I came across in [ISSUES](ISSUES.md).

## Getting the Latest Code

Provide instructions on how to get the latest code.

## Setting Up the Environment

Provide instructions on how to set up the local environment, including any dependencies that need to be installed.

### Playwright

I have chosen Playwright as the automation framework due to its ability to quickly create an automation test suite. This was setup by running the below to create a skeleton Playwright test suite.

```
npm init playwright@latest
```

### ESlint

I have chosen ESlint ha a code linting tool. This was setup by running the below.

```
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript typescript-eslint
```

### Prettier

I have chosen Prettier as a code formatting tool. This was setup by running the below.

```
npm install -D --save-exact prettier
```

## Running the Tests

Provide instructions on how to run the tests.

## Additional Details

Provide any other details you find pertinent, such as troubleshooting tips, common issues, or additional setup steps.

---

## Links

[README](README.md) | [EXERCISE](EXERCISE.md) | [ISSUES](ISSUES.md) | [FEEDBACK](FEEDBACK.md)
