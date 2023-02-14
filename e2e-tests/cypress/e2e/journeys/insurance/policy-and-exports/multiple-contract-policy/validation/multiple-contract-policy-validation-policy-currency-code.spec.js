import { submitButton } from '../../../../../pages/shared';
import partials from '../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../../constants';

const { taskList, policyCurrencyCodeFormField } = partials.insurancePartials;

const { INSURANCE } = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        POLICY_CURRENCY_CODE,
      },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: CONTRACT_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

context('Insurance - Policy and exports - Multiple contract policy page - form validation - policy currency code', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

    cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;
      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`;

      cy.url().should('eq', expectedUrl);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  describe('when policy currency code is not provided', () => {
    it('should render a validation error', () => {
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(5),
        CONTRACT_ERROR_MESSAGES[POLICY_CURRENCY_CODE].IS_EMPTY,
      );

      cy.checkText(
        policyCurrencyCodeFormField.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[POLICY_CURRENCY_CODE].IS_EMPTY}`,
      );
    });
  });
});
