import { submitButton } from '../../../pages/shared';
import { policyTypePage } from '../../../pages/quote';
import partials from '../../../partials';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import { completeAndSubmitBuyerBodyForm, completeAndSubmitExporterLocationForm, completeAndSubmitUkContentForm } from '../../../../support/quote/forms';

context('Policy type page - policy type & length validation', () => {
  before(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();
    completeAndSubmitUkContentForm();

    cy.url().should('include', ROUTES.QUOTE.POLICY_TYPE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  context('with single policy type selected', () => {
    describe('when `single policy length` is not provided', () => {
      beforeEach(() => {
        policyTypePage[FIELD_IDS.POLICY_TYPE].single.input().click();
      });

      it('should render a validation error', () => {
        submitButton().click();

        cy.checkText(
          partials.errorSummaryListItems().eq(0),
          ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].IS_EMPTY,
        );

        cy.checkText(
          policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
          `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].IS_EMPTY}`,
        );
      });

      describe('when `single policy length` has a non-numeric value', () => {
        it('should render a validation error', () => {
          cy.keyboardInput(policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].input(), 'a');
          submitButton().click();

          cy.checkText(
            partials.errorSummaryListItems().eq(0),
            ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_NUMBER,
          );

          cy.checkText(
            policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_NUMBER}`,
          );
        });
      });

      describe('when `single policy length` contains a decimal', () => {
        it('should render a validation error', () => {
          cy.keyboardInput(policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].input(), '1.2');
          submitButton().click();

          cy.checkText(
            partials.errorSummaryListItems().eq(0),
            ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_WHOLE_NUMBER,
          );

          cy.checkText(
            policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_WHOLE_NUMBER}`,
          );
        });
      });

      describe('when `single policy length` is less than the minimum', () => {
        it('should render a validation error', () => {
          cy.keyboardInput(policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].input(), '0');
          submitButton().click();

          cy.checkText(
            partials.errorSummaryListItems().eq(0),
            ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].BELOW_MINIMUM,
          );

          cy.checkText(
            policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].BELOW_MINIMUM}`,
          );
        });
      });

      describe('when `single policy length` is greater than the maximum', () => {
        it('should render a validation error', () => {
          cy.keyboardInput(policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].input(), '23');
          submitButton().click();

          cy.checkText(
            partials.errorSummaryListItems().eq(0),
            ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].ABOVE_MAXIMUM,
          );

          cy.checkText(
            policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
            `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].ABOVE_MAXIMUM}`,
          );
        });
      });
    });
  });
});
