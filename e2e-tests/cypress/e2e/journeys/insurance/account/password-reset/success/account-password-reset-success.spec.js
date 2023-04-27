import { successPage } from '../../../../../pages/insurance/account/password-reset';
import { BUTTONS, PAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../support/api';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.SUCCESS;

const {
  ACCOUNT: {
    PASSWORD_RESET: { ROOT: PASSWORD_RESET_ROOT, NEW_PASSWORD, SUCCESS },
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
} = ROUTES;

context('Insurance - Account - Password reset - success page - I want to reset my password, So that I can securely access my digital service account with UKEF', () => {
  const successUrl = `${Cypress.config('baseUrl')}${SUCCESS}`;
  let newPasswordUrl;

  before(() => {
    cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

    // navigate to password reset page
    cy.navigateToUrl(PASSWORD_RESET_ROOT);

    cy.completeAndSubmitPasswordResetForm();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccount();
  });

  describe(`when visiting ${NEW_PASSWORD} with a token query param`, () => {
    beforeEach(async () => {
      /**
       * Get an account's password reset token directly from the API,
       * so that we can visit the `new password` page and continue the journey.
       * This is to ensure that we are testing a real world scenario.
       *
       * The alternative approach is to either intercept the UI requests and fake the password reset token generation,
       * or have email inbox testing capabilities which can be risky/flaky.
       * This approach practically mimics "get my password reset link from my email inbox".
       */
      const exporterEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      const resetPasswordToken = await api.getAccountPasswordResetToken(exporterEmail);

      newPasswordUrl = `${Cypress.config('baseUrl')}${NEW_PASSWORD}?token=${resetPasswordToken}`;
    });

    describe('when progressing to the password reset success page', () => {
      beforeEach(() => {
        cy.navigateToUrl(newPasswordUrl);

        cy.completeAndSubmitNewPasswordAccountForm();

        cy.url().should('eq', successUrl);
      });

      it('renders core page elements and a link button to sign in', () => {
        cy.corePageChecks({
          pageTitle: CONTENT_STRINGS.PAGE_TITLE,
          currentHref: successUrl,
          assertBackLink: false,
          assertAuthenticatedHeader: false,
          assertSubmitButton: false,
        });

        cy.checkLink(
          successPage.continueToSignInLinkButton(),
          SIGN_IN_ROOT,
          BUTTONS.CONTINUE_TO_SIGN_IN,
        );
      });
    });
  });
});
