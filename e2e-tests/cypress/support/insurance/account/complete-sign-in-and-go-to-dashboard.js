import { submitButton } from '../../../e2e/pages/shared';
import { enterCodePage } from '../../../e2e/pages/insurance/account/sign-in';
import { FIELD_IDS, ROUTES } from '../../../../constants';

const {
  INSURANCE: {
    ACCOUNT: { SECURITY_CODE },
  },
} = FIELD_IDS;

const {
  INSURANCE: { DASHBOARD },
} = ROUTES;

/**
 * completeSignInAndGoToDashboard
 * 1) Create an account directly via the API
 * 2) Verify the account via "verify email" page (mimicking clicking email link)
 * 3) Complete and submit the "account sign in" form
 * 4) Add a new OTP/security code and get it directly from the API
 * 5) Complete and submit the "enter security code" form
 * 6) Check we are on the dashbooard
 */
const completeSignInAndGoToDashboard = () => cy.createAccount({}).then((verifyAccountUrl) => {
  // verify the account by navigating to the "verify account" page
  cy.navigateToUrl(verifyAccountUrl);

  // sign in to the account. Behind the scenes, an application is created at this point.
  cy.completeAndSubmitSignInAccountForm();

  // get the OTP security code
  cy.accountAddAndGetOTP().then((securityCode) => {
    cy.keyboardInput(enterCodePage[SECURITY_CODE].input(), securityCode);

    // submit the OTP security code
    submitButton().click();

    // assert we are on the dashboard
    const expectedUrl = `${Cypress.config('baseUrl')}${DASHBOARD}`;
    cy.url().should('eq', expectedUrl);
  });
});

export default completeSignInAndGoToDashboard;