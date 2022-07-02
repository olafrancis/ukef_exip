import { tellUsAboutYourPolicyPage } from '../../pages';
import partials from '../../partials';
import { ERROR_MESSAGES } from '../../../../content-strings';
import CONSTANTS from '../../../../constants';
import checkText from '../../helpers/check-text';

const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Tell us about the policy you need page - form validation', () => {
  beforeEach(() => {
    cy.visit(ROUTES.TELL_US_ABOUT_YOUR_POLICY, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('when submitting an empty form', () => {
    it('should render validation errors for all required fields', () => {
      tellUsAboutYourPolicyPage.submitButton().click();

      partials.errorSummaryListItems().should('exist');

      const TOTAL_REQUIRED_FIELDS = 4;
      partials.errorSummaryListItems().should('have.length', TOTAL_REQUIRED_FIELDS);

      // currency
      checkText(
        partials.errorSummaryListItems().eq(0),
        ERROR_MESSAGES[FIELD_IDS.CURRENCY].IS_EMPTY,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CURRENCY].IS_EMPTY}`,
      );

      // amount
      checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.AMOUNT].IS_EMPTY,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.AMOUNT].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.AMOUNT].IS_EMPTY}`,
      );

      // credit period
      checkText(
        partials.errorSummaryListItems().eq(2),
        ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].IS_EMPTY,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].IS_EMPTY}`,
      );

      // policy type
      checkText(
        partials.errorSummaryListItems().eq(3),
        ERROR_MESSAGES[FIELD_IDS.POLICY_TYPE],
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.POLICY_TYPE].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.POLICY_TYPE]}`,
      );
    });
  });

  describe('when `amount` has a non-numeric value', () => {
    it('should render a validation error', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.AMOUNT].input().type('a');
      tellUsAboutYourPolicyPage.submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.AMOUNT].NOT_A_NUMBER,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.AMOUNT].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.AMOUNT].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when `amount` has a value less than the minimum', () => {
    it('should render a validation error', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.AMOUNT].input().type('0');
      tellUsAboutYourPolicyPage.submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.AMOUNT].BELOW_MINIMUM,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.AMOUNT].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.AMOUNT].BELOW_MINIMUM}`,
      );
    });
  });

  describe('when `credit period` has a non-numeric value', () => {
    it('should render a validation error', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].input().type('a');
      tellUsAboutYourPolicyPage.submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(2),
        ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].NOT_A_NUMBER,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when `credit period` contains a decimal', () => {
    it('should render a validation error', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].input().type('1.2');
      tellUsAboutYourPolicyPage.submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(2),
        ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].NOT_A_WHOLE_NUMBER,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].NOT_A_WHOLE_NUMBER}`,
      );
    });
  });

  describe('when `credit period` has a value less than the minimum', () => {
    it('should render a validation error', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].input().type('0');
      tellUsAboutYourPolicyPage.submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(2),
        ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].BELOW_MINIMUM,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].BELOW_MINIMUM}`,
      );
    });
  });

  describe('with any validation error', () => {
    it('should render submitted values', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].input().select('AED');
      tellUsAboutYourPolicyPage[FIELD_IDS.AMOUNT].input().type('10');
      tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].input().type('2');
      tellUsAboutYourPolicyPage[FIELD_IDS.POLICY_TYPE].single.input().click();

      tellUsAboutYourPolicyPage.submitButton().click();

      tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].inputOptionSelected().contains('AED');

      tellUsAboutYourPolicyPage[FIELD_IDS.AMOUNT].input()
        .should('have.attr', 'value', '10');

      tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].input()
        .should('have.attr', 'value', '2');

      tellUsAboutYourPolicyPage[FIELD_IDS.POLICY_TYPE].single.input().should('be.checked');
    });
  });
});
