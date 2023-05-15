import { confirmEmailPage } from '../../../../../pages/insurance/account/create';
import { PAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../support/api';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL_RESENT;

const {
  START,
  ACCOUNT: { CREATE: { CONFIRM_EMAIL, CONFIRM_EMAIL_RESENT } },
} = ROUTES;

context.skip('Insurance - Account - Create - Resend confirm email page - As an Exporter I want to request a new link to confirm my email address, So that I can readily use my email address to set up an account that I can use for UKEF digital service such as EXIP digital service', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    confirmEmailPage.havingProblems.requestNew.link().click();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccount();
  });

  let account;
  let url;

  describe('core page elements and content', () => {
    before(() => {
      /**
       * Get the account ID directly from the API,
       * so that we can assert that the URL and `request a new link` has the correct ID.
       */
      const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      api.getAccountByEmail(accountEmail).then((response) => {
        const { data } = response.body;

        const [firstAccount] = data.accounts;
        account = firstAccount;

        url = `${CONFIRM_EMAIL_RESENT}?id=${account.id}`;

        cy.url().should('eq', `${Cypress.config('baseUrl')}${url}`);
      });
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: url,
        backLink: `${CONFIRM_EMAIL}?id=${account.id}`,
        assertSubmitButton: false,
        assertAuthenticatedHeader: false,
      });
    });

    it('renders all `confirm email` page content', () => {
      cy.navigateToUrl(url);

      cy.assertConfirmEmailPageContent(account.id);
    });
  });
});
