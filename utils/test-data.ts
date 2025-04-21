import * as falso from "@ngneat/falso";

export interface SignupFormData {
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export const generateSignupFormData = (): SignupFormData => {
  return {
    password: process.env.PASSWORD,
    firstName: falso.randFirstName(),
    lastName: falso.randLastName(),
    company: falso.randCompanyName(),
    address1: falso.randStreetAddress(),
    address2: falso.randCounty(),
    state: falso.randState(),
    city: falso.randCity(),
    zipcode: falso.randZipCode(),
    mobileNumber: falso.randPhoneNumber(),
  };
};

export interface CreditCardFormData {
  name: string;
  cardNumber: string;
  cvc: string;
  month: number;
  year: number;
}

// Improvement would be to have better utils for generate credit card data, especially for the expiry date generation
export const generateCreditCardFormData = (): CreditCardFormData => {
  return {
    name: falso.randFirstName(),
    cardNumber: falso.randCreditCardNumber(),
    cvc: falso.randCreditCardCVV(),
    month: falso.randNumber({ min: 1, max: 12 }),
    year: falso.randNumber({ min: 2025, max: 2030 }),
  };
};
