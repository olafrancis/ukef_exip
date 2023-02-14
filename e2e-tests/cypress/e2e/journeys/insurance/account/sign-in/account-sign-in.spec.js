import partials from '../../../../partials';
import { signInPage } from '../../../../pages/insurance/account/sign-in';
import accountFormFields from '../../../../partials/insurance/accountFormFields';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { ACCOUNT_FIELDS } from '../../../../../../content-strings/fields/insurance/account';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SIGN_IN.ROOT;

const {
  START,
  ELIGIBILITY: { ACCOUNT_TO_APPLY_ONLINE },
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT, ENTER_CODE },
    CREATE: { YOUR_DETAILS },
  },
} = ROUTES;

const {
  ACCOUNT: { EMAIL, PASSWORD },
} = INSURANCE_FIELD_IDS;

const FIELD_STRINGS = ACCOUNT_FIELDS;

context('Insurance - Account - Sign in - I want to sign in into my UKEF digital service account after completing eligibility, So that I can complete my application for a UKEF Export Insurance Policy', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountSignIn();

    const expected = `${Cypress.config('baseUrl')}${SIGN_IN_ROOT}`;

    cy.url().should('eq', expected);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: SIGN_IN_ROOT,
      backLink: ACCOUNT_TO_APPLY_ONLINE,
      lightHouseThresholds: {
        performance: 70,
      },
    });
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', START);
  });

  it('renders `email` label and input', () => {
    const fieldId = EMAIL;
    const field = accountFormFields[fieldId];

    field.label().should('exist');
    cy.checkText(field.label(), FIELD_STRINGS[fieldId].LABEL);

    field.input().should('exist');
  });

  describe('password', () => {
    const fieldId = PASSWORD;
    const field = accountFormFields[fieldId];

    it('renders a label and input', () => {
      field.label().should('exist');
      cy.checkText(field.label(), FIELD_STRINGS.SIGN_IN[fieldId].LABEL);

      field.input().should('exist');
    });

    it('should render a reveal button that shows/reveals the password input', () => {
      cy.assertPasswordRevealButton();
    });
  });

  it('renders a `reset password` link', () => {
    cy.checkText(signInPage.resetPasswordLink(), CONTENT_STRINGS.RESET_PASSWORD.TEXT);

    signInPage.resetPasswordLink().should('have.attr', 'href', CONTENT_STRINGS.RESET_PASSWORD.HREF);
  });

  it('renders a `need to create an account` copy and button link', () => {
    cy.checkText(signInPage.needToCreateAccountHeading(), CONTENT_STRINGS.NEED_TO_CREATE_ACCOUNT.HEADING);

    cy.checkText(signInPage.createAccountLink(), CONTENT_STRINGS.NEED_TO_CREATE_ACCOUNT.LINK.TEXT);

    signInPage.createAccountLink().should('have.attr', 'href', CONTENT_STRINGS.NEED_TO_CREATE_ACCOUNT.LINK.HREF);
  });

  describe('when clicking `need to create an account`', () => {
    it(`should go to ${YOUR_DETAILS}`, () => {
      signInPage.createAccountLink().click();

      const expectedUrl = `${Cypress.config('baseUrl')}${YOUR_DETAILS}`;

      cy.url().should('eq', expectedUrl);
    });
  });

  describe('form submission with all valid required fields', () => {
    before(() => {
      // go back to the page
      cy.go('back');
    });

    it(`should redirect to ${ENTER_CODE}`, () => {
      cy.completeAndSubmitSignInAccountForm();

      const expected = `${Cypress.config('baseUrl')}${ENTER_CODE}`;
      cy.url().should('eq', expected);
    });
  });
});