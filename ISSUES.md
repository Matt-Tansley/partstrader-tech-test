# Issues

## Exercise Instructions

- This section is optional.
- Use this page to document any issues related to the application that need to be fixed.
- Issues can be identified at any point, so they do not need to be part of the automated test.

When documenting issues, please include:

- A brief description of the issue.
- How it was found (e.g., automated test, exploratory testing, observation while coding, etc.).
- Whether it is reproducible.

Feel free to add more details as necessary.

**Note:** Remove this section after completing the exercise.

## Documented Issues

### Issue Template

**Found by:**

**Reproducable:**

**Comments:**

### Issue 1: Credit card number input field is not masked

**Found by:** Exploratory testing

**Reproducable:** Yes

**Comments:** For better usability, it is useful to implement masking for input fields such as credit card numbers that have a standard format (in the case of credit card numbers, it is always 16 numerical digits in groups of 4 e.g XXXX XXXX XXXX XXXX). Additionally, credit card input is a standard field used in many applications, so it may align better to the expectations of the user if input masking is implemented.

### Issue 2: There is no character limit for the credit card number input

**Found by:** Exploratory testing

**Reproducable:** Yes

**Comments:** Related to Issue 1, credit card numbers are a standard and have 16 characters. Currently in the Dev environment, the credit card number input field allows the user to type more than 16 characters.

### Issue 3: Credit card input form has no dynamic validation

**Found by:** Exploratory testing

**Reproducable:** Yes

**Comments:** It is useful to provide dynamic validation to the user as they are filling out a form to enhance user experience. It is sub-optimal user experience for the user to fill out a form, click submit, and then be told afterwards there are errors with their input. This becomes more important for long forms, where it may be difficult for the user to find where the error is after clicking submit.

### Issue 4: App does not ask for confirmation when deleting account

**Found by:** Exploratory testing

**Reproducable:** Yes

**Comments:** For irreverable actions such as deleting data, it is often a better user experience to have some sort of confirmation. A user may have clicked delete by mistake, and if the action is irreversable this leads to bad user experience.

### Issue 5: Incorrect success message when placing order - TO REVIEW

**Found by:** Exploratory testing

**Reproducable:** Yes

**Comments:** There is a mismatch between the requirement in Test Case 15 Step 16 and observed app behaviour.

Expected message: 'Your order has been placed successfully!'

Actual message: 'Congratulations! Your order has been confirmed!'

Recommendation: confirm with stakeholders what the correct message should be. This will likely result in a requirement or code update.

Update: it appears the expected message shows up temporarily, but does not remain on the page after the purchase process has been completed.

### Issue 6: Review requirements for Test Case 15

**Found by:** Reading test case and exploratory testing

**Reproducable:** N/A

**Comments:** Various parts of Test Case 15 should be clarified for more accurate testing:

- Step 3: there is no specific requirement on what exactly should be visible when cart page is displayed.

### Issue 7: There is mo input masking and validation on mobile number input on user sign up form

**Found by:** Exploratory testing

**Reproducable:** Yes

**Comments:** Mobile numbers have an established and expected format. Validation for this could be improved on the sign-up form by:

- Expecting a certain prefix (the list of international mobile phone prefixes is known).
- Possibly expecting a certain length
- Only allowing numeric characters

### Issue 8: There is no input masking and validation on zipcode input on user sign up form

**Found by:** Exploratory testing

**Reproducable:** Yes

**Comments:** Zip codes have an established and expected format. Validation for this could be improved on the sign-up form by:

- Expecting a certain length
- Only allowing numeric characters

### Issue 9: Improve API documenation

**Found by:** Exploratory testing

**Reproducable:** N/A

**Comments:** API documenation could be improved. Suggestions:

1. It is unclear what format the request payload should be for API 7: POST To Verify Login with valid details. Currently it is vague and it unclear whether email and password should be URL params, or a JSON request body, or other.

### Issue 10: 'POST To Verify Login with valid details API' has response code 400 in response body, but actually returns as a 200 response

**Found by:** Manual testing

**Reproducable:** Yes

**Comments:** When making a request via the 'POST To Verify Login with valid details API' (i.e `https://automationexercise.com/api/verifyLogin`) in the Dev environment, I get the below response message:

```
{"responseCode": 400, "message": "Bad request, email or password parameter is missing in POST request."}
```

Despite the response message, the response comes back with a 200 OK status code. This is a mismatch of information between response body and status code which should be corrected.

### Issue 11: Unable to access Test environment

**Found by:** Exploratory testing

**Reproducable:** Yes

**Comments:** I am unable to hit the Test environment (i.e https://test.automationexercise.com/) from my machine.

Checks to make:

- See if others can access https://test.automationexercise.com/
- Contact developement/network teams to investigate root cause (e.g IP not whitelisted, environment is down, etc).

### Issue 12: Credit card number input works with non-numeric characters

**Found by:** Exploratory testing

**Reproducable:** Yes

**Comments:** Credit card numbers follow a standard and should only accept numerical characters, however I am able to enter non-numeric characters.

### Issue 13: There is no validation on credit card number expiry

**Found by:** Exploratory testing

**Reproducable:** Yes

**Comments:** I am able to enter a past date for credit card expiration. This is not expected and unacceptable as the system allows users to use expired credit cards.

### Issue 14: It is unclear where the verifyLogin API is used in the front end

**Found by:** Exploratory testing

**Reproducable:** N/A

**Comments:** While I have validated the Verify Login API in Postman, I have not been able to validate it by triggering it via the front end. Knowing this would allow for more robust testing as realistically APIs are not called in isolation, but happen as part of a user action. It would also allow for verifying the request/response details in the browser network tab.

As an example, I tried to trigger the Products List API by checking the browser network tab after navigating to the Products page. This did not send a request to https://automationexercise.com/api/productsList, indicating the API is not actually used by the front end, or it is made a downstream call and therefore not visible in the browser network tab.

---

## Links

[README](README.md) | [EXERCISE](EXERCISE.md) | [GETTING_STARTED](GETTING_STARTED.md) | [FEEDBACK](FEEDBACK.md)
