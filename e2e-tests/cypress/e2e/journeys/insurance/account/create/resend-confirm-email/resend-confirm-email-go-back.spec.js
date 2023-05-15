import { confirmEmailPage } from '../../../../../pages/insurance/account/create';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../support/api';

const {
  START,
  ACCOUNT: { CREATE: { CONFIRM_EMAIL, CONFIRM_EMAIL_RESENT } },
} = ROUTES;

context.skip('Insurance - Account - Create - Resend confirm email page - Go back to confirm email page via back button', () => {
  const confirmEmailUrl = `${Cypress.config('baseUrl')}${CONFIRM_EMAIL}`;

  after(() => {
    cy.deleteAccount();
  });

  let expectedUrl;
  let account;

  before(() => {
    cy.saveSession();

    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    cy.url().should('eq', confirmEmailUrl);
  });

  beforeEach(() => {
    /**
     * Get the account ID directly from the API,
     * so that we can assert that the URL and `request a new link` has the correct ID.
     */
    const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

    api.getAccountByEmail(accountEmail).then((response) => {
      const { data } = response.body;

      const [firstAccount] = data.accounts;
      account = firstAccount;

      cy.url().should('eq', confirmEmailUrl);

      confirmEmailPage.havingProblems.requestNew.link().click();

      expectedUrl = `${Cypress.config('baseUrl')}${CONFIRM_EMAIL_RESENT}?id=${account.id}`;

      cy.url().should('eq', expectedUrl);

      cy.clickBackLink();
    });
  });

  it('renders the page without error and have the account ID in the URL params', () => {
    expectedUrl = `${Cypress.config('baseUrl')}${CONFIRM_EMAIL}?id=${account.id}`;

    cy.url().should('eq', expectedUrl);
  });
});
