# Getting Started

## Purpose

The purpose of this document is to:

- Document my process for working on the tech test.
- Explaining decisions made and noting further improvements.
- Explain how to get the test suite up and running.

## Getting the Latest Code

Clone the repo from GitHub to your local machine.

```
git clone https://github.com/Matt-Tansley/partstrader-tech-test.git
```

## Setting Up The Environment

I have the below version of NodeJS and NPM on my local machine. You will need to download and install NodeJS and NPM to run this project. If on Windows, [download the windows installer from here](<(https://nodejs.org/en/download)>), or use your favourite package manager, or use the appropriate installation method for your OS.

```
$ node -v
v22.14.0

$ npm -v
11.3.0
```

Install all dependences for the project using the below command by running from the root folder.

```
npm install
```

## Running the Tests

A script has been setup in `package.json` to run all the Playwright tests (in headless mode).

```
npm run test
```

Tests can be run in debug mode which provides a browser and allows you to go step-by-step through the test.

```
npx playwright test --debug
```

For development purposes, tests can be run in UI mode which visualises what each step of the test does.

```
npx playwright test --ui
```

## Project Structure

Notable files and folder include:

- `tests/` - contains the actual Playwright tests which get executed.
- `pages/` - reusable page classes, following the Page Object Model pattern.
- `.github/workflows` - defines a CI workflow that is run when there are pushes to main or a PR to main.
- `partstrader_tech_test.postman_collection.json` - a Postman collection for manual tests against the APIs.

## Additional Details

Below I have documented the steps I took as I went through the exercise.

### Step 1: Pre-Setup

Before writing any code, I have done manual and exploratory testing to get a feel for the system under test, and to see if there are any obvious bugs and/or usability issues while following the in-scope test cases.

For the UI test cases, I have done exploratory testing on the front end.

For the API test cases, I have done checks in the browser network tab and Postman (see `partstrader_tech_test.postman_collection.json`).

The browser I am using on my local machine is Arc, a Chromium based browser, and I have played around in the Dev environment.

I have documented issues I came across in [ISSUES](ISSUES.md).

**Improvements:**

- [ ] Manual and exploratory testing should also be conducted on other browsers and environments.

### Step 2: Development Setup

Again, before writing any automation tests, I set up my development environment.

#### NodeJS and NPM

I have the below version of NodeJS and NPM on my local machine. You will need to download and install NodeJS and NPM to run this project. If on Windows, [download the windows installer from here](<(https://nodejs.org/en/download)>), or use your favourite package manager, or use the appropriate installation method for your OS.

```
$ node -v
v22.14.0

$ npm -v
11.3.0
```

#### Playwright

I have chosen Playwright as the automation framework due to its ability to quickly create an automation test suite. This was setup by running the below to create a skeleton Playwright test suite. This creates some skeleton files, including a basic GitHub Action!

```
npm init playwright@latest
```

#### Linter, Formatter, and Pre-Commit

I have chosen ESlint as a code linting tool, as it is a tool I'm familiar with and it is widely used. This was setup by running the below.

```
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript typescript-eslint
```

I have chosen Prettier as a code formatting tool, as it is a tool I'm familiar with and it is widely used. This was setup by running the below.

```
npm install -D --save-exact prettier
```

I have chosen Husky as a pre-commit tool. This was setup by running the below.

```
npx husky-init && npm install
```

My Husky pre-commit script looks like the below. This will run eslint, prettier, and playwright, using scripts defined in `package.json`. If any of these scripts fail, then the commit will fail.

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Lint code
npm run lint || exit 1

# Check code formatting
npm run prettier || exit 1

# Run playwright tests
npm run test || exit 1
```

Now we have continuous testing on the local machine!

**Improvements:**

- [ ] Find out what linter, formatter, and pre-commit tools are used by the team and implement these so we are all using the same tooling.
- [ ] Find out the shared style guides, standrds, and configs used by the team and implement these in the code base.
- [ ] For this exercise I have used basic config for ESlint, Prettier, and Husky, but they have a lot of powerful settings which could be added (e.g strict type checking for Typescript, more complex pre-commit script, etc).

#### GitHub Actions

Playwright comes with a basic GitHub Actions workflow, which I have edited slightly. It is best practice to avoid committing to main, and instead to submit code changes as a PR that triggers CI and is reviewed by other team members. GitHub Actions helps to achieve this.

**Improvements:**

- [ ] Workflow could add a comment to the PR with a link to the test report.
- [ ] Workflow could upload the HTML test report to a static hosting service (such as Amazon S3) and print the link for this to conveniently view the reports (rather than having to download and extract a zip file).
- [ ] Find out the team's CI and PR process and make changes to the workflow if necessary to align with standards.

### Step 3: Utils

Based on the initial manual and exploratory testing, I could already tell of a few things that would be best to set up now to save time and effort going forward.

- UItest cases 14 and 15 share many of the same webpages. To avoid code duplication it is best practice to use the page object model pattern.
- The API test cases have some shared config (such as base URL, common headers).
- Test data is required. It is better to parameterise this in the automation scripts so it can be dynamically changed, rather than have it hardcoded. I have chosen to use Falso, and I have used seeds for reproducability. Useful test data I have identified includes email, password, credit card details, and address.

Falso was installed with the following:

```
npm i -D @ngneat/falso
```

**Improvements:**

- [ ] Create config to dynamically switch between environments. At a minimum this should be changing the base URL that the UI and API tests use. Automation could be written to test one or more environments in one go.
- [ ] Passwords and other test data could be considered sensitive data, even in non-prod environments. Better ways to store sensitve data could be an `.env` file which is git ignored for using locally, and GitHub Actions can use secrets that the workflow can securely access.
- [ ] Seeding test data generated by Falso to have reproducable tests. The seed should be configurable.
- [ ] Possibly using a test data utils functions file. For example, there could be a function that returns an object that contains all the necessary data for a form. This would also help to keep the test spec files cleaner as they won't need to import all the Falso functions.

### Step 4: Creating The Tests

Notes while making the UI tests:

- Used Playwright codegen tool to help setup locators and basic test structure.
- Base URL has been set in `playwright.config.ts` as https://automationexercise.com.
- Created page classes to make use of the page object model pattern. Also created a navbar class since this is a common component on many pages.
- For adding products to the cart, there are multiple ways to navigate to the Products page, and these could be covered under separate tests. The main goal of Test Case 14 and 15 is to test register and checkout, and it just so happens that products need to be in the cart to achieve this, but they care less about how the products ended up in the cart. Ultimately: requirements should be clarified with stakeholders to understand what they would like to see from the test case, and new test cases should be created if needed.
- For test case 14; assumption that user is logged out initially. May want to implement logic where it can dynamically handle if user is logged in or logged out. How would you handle this?
- Default country in sign up form is used.
- I found that Falso `randPassword()` is returning wrong type (a string array rather than a string). An issue has already been reported to the Falso maintainers about this: https://github.com/ngneat/falso/issues/400.
- Need to ensure that if tests are running in parallel, that each test uses a different username, otherwise there will be conflicts during sign up if all the tests use the same username. This is one of the pitfalls of parallel testing. The exact issue I ran into was that the website does not allow a user to sign up with a username and email if it already exists. When executing parallel tests all using the same seed to generate login details, this lead to conflicts between the tests.

**Improvements:**

- [ ] Running UI tests is a costly operation, and will take longer and longer as the test suite grows e.g we could have 50+ test cases that all start with a login. In this case, an action like login could be executed once to authenticate the user, and then the auth information is captured and re-used in multiple test cases (auth information could be obtained either from a UI action or API call, depending on the system and goals of the test).
- [ ] I have 2 test files (`api.spec.ts` and `ui.spec.ts`) which group all API and UI tests. As the test suite grows, these files should potentially be refactored and split into more files. Right now the test suite is small and only has a handful of test cases, so it is manageable.
- [ ] Seed for random test data could be configurable.
- [ ] Radio button input selector for the sign up form is brittle, and will be easily broken if a new radio button is added to the form. This should be changed to be a better locator.
- [ ] Check that the product that was originally selected is in the view your order screen
- [ ] If the email address already exists, then the user can't sign up with it. Need a hook at start of test to ensure the user does not already exist and delete it if it does.
- [ ] For Test Case 14, step 18, the 'Your order has been placed successfully!' message only briefly shows for a few seconds. My test is currently verifying a message that shows up on the subsequent page, need to address this.
- [ ] For sign up and credit card forms, there should be other tests for validating the form and testing edge cases.
- [ ] On the cart page, clicking proceed to checkout either result in a modal pop-up (if the user is not logged in) or navigates the user to the next page. The logic of how the test handles this could potentially be improved.
- [ ] If applicable, the automated tests should also be run on other types of devices and screen sizes (such as mobile and tablet).

### Step 5: Submission

## Links

[README](README.md) | [EXERCISE](EXERCISE.md) | [ISSUES](ISSUES.md) | [FEEDBACK](FEEDBACK.md)
