import partials from '../../../../../partials';
import { BUTTONS, PAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { ACCOUNT_FIELDS } from '../../../../../../../content-strings/fields/insurance/account';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../support/api';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.NEW_PASSWORD;

const {
  START,
  ACCOUNT: {
    PASSWORD_RESET: {
      ROOT: PASSWORD_RESET_ROOT,
      LINK_SENT,
      NEW_PASSWORD,
      SUCCESS,
    },
  },
} = ROUTES;

const {
  ACCOUNT: { PASSWORD },
} = INSURANCE_FIELD_IDS;

const FIELD_STRINGS = ACCOUNT_FIELDS.NEW_PASSWORD[PASSWORD];

context('Insurance - Account - Password reset - new password page - As an Exporter, I want to reset my password, So that I can securely access my digital service account with UKEF', () => {
  let url;
  let resetPasswordToken;

  before(() => {
    cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

    // navigate to password reset page
    cy.navigateToUrl(PASSWORD_RESET_ROOT);

    cy.completeAndSubmitPasswordResetForm();

    url = `${Cypress.config('baseUrl')}${LINK_SENT}`;

    cy.url().should('eq', url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccount();
  });

  describe(`when visiting ${NEW_PASSWORD} with a token query param`, () => {
    beforeEach(async () => {
      // Get an account's password reset token
      resetPasswordToken = await api.getAccountPasswordResetToken();

      url = `${Cypress.config('baseUrl')}${NEW_PASSWORD}?token=${resetPasswordToken}`;
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.url().should('eq', url);
      });

      it('renders core page elements', () => {
        cy.corePageChecks({
          pageTitle: CONTENT_STRINGS.PAGE_TITLE,
          currentHref: url,
          assertBackLink: false,
          assertAuthenticatedHeader: false,
          submitButtonCopy: BUTTONS.SUBMIT,
        });
      });

      it('should render a header with href to insurance start', () => {
        partials.header.serviceName().should('have.attr', 'href', START);
      });

      describe('password', () => {
        it('renders a label, hint, and input', () => {
          cy.assertPasswordLabelHintAndInput(FIELD_STRINGS);
        });

        it('should render a reveal button that shows/reveals the password input', () => {
          cy.assertPasswordRevealButton();
        });
      });
    });

    describe('form submission with all valid required fields', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.url().should('eq', url);
      });

      it(`should redirect to ${SUCCESS}`, () => {
        cy.completeAndSubmitNewPasswordAccountForm();

        const expected = `${Cypress.config('baseUrl')}${SUCCESS}`;
        cy.url().should('eq', expected);
      });
    });
  });
});