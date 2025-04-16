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

## Development Setup

Again, before writing any automation tests, I set up my development environment.

### Playwright

I have chosen Playwright as the automation framework due to its ability to quickly create an automation test suite. This was setup by running the below to create a skeleton Playwright test suite.

```
npm init playwright@latest
```

### ESlint

I have chosen ESlint ha a code linting tool, as it is a tool I'm familiar with and it is widely used. This was setup by running the below.

```
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript typescript-eslint
```

### Prettier

I have chosen Prettier as a code formatting tool, as it is a tool I'm familiar with and it is widely used. This was setup by running the below.

```
npm install -D --save-exact prettier
```

### Husky

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

**Improvement:** find out what linter, formatter, and pre-commit tools are used by the team and implement these so we are all using the same tooling. Also, find out the shared style and config used by the team and implement these in the test suite.

### GitHub Actions

Playwright comes with a basic GitHub Actions workflow, which I have edited slightly. It is best practice to avoid committing to main, and instead to submit code changes as a PR that triggers CI and is reviewed by other team members. GitHub Actions helps to achieve this.

**Improvements:**

- Workflow could add a comment to the PR with a link to the test report.
- Workflow could upload the HTML test report to a static hosting service (such as Amazon S3) and print the link for this to conveniently view the reports.
- Find out the team's CI and PR process and make changes to the workflow if necessary to align with standards.

## Getting the Latest Code

Provide instructions on how to get the latest code.

## Setting Up the Environment

Provide instructions on how to set up the local environment, including any dependencies that need to be installed.

## Running the Tests

Provide instructions on how to run the tests.

A script has been setup in `package.json` to run the Playwright tests.

```
npm run test
```

## Additional Details

---

## Links

[README](README.md) | [EXERCISE](EXERCISE.md) | [ISSUES](ISSUES.md) | [FEEDBACK](FEEDBACK.md)
