import { submitButton } from '../../../../../pages/shared';
import { typeOfPolicyPage, singleContractPolicyPage } from '../../../../../pages/insurance/policy-and-export';
import partials from '../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, ROUTES } from '../../../../../../../constants';
import getReferenceNumber from '../../../../../helpers/get-reference-number';
import checkText from '../../../../../helpers/check-text';

const { taskList } = partials.insurancePartials;

const singlePolicyFieldId = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE;
const singlePolicyField = typeOfPolicyPage[singlePolicyFieldId].single;

const { INSURANCE } = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        CREDIT_PERIOD_WITH_BUYER,
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

context('Insurance - Policy and exports - Single contract policy page - form validation - credit period with buyer', () => {
  let referenceNumber;

  before(() => {
    cy.visit(INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

    singlePolicyField.input().click();
    submitButton().click();

    getReferenceNumber().then((id) => {
      referenceNumber = id;
      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`;

      cy.url().should('eq', expectedUrl);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  const field = singleContractPolicyPage[CREDIT_PERIOD_WITH_BUYER];

  describe('when credit period with buyer is not provided', () => {
    it('should render a validation error', () => {
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(3),
        CONTRACT_ERROR_MESSAGES[CREDIT_PERIOD_WITH_BUYER].IS_EMPTY,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[CREDIT_PERIOD_WITH_BUYER].IS_EMPTY}`,
      );
    });
  });

  describe('when total contract value is above the maximum', () => {
    it('should render a validation error', () => {
      field.input().type('a'.repeat(1001), { delay: 0 });
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(3),
        CONTRACT_ERROR_MESSAGES[CREDIT_PERIOD_WITH_BUYER].ABOVE_MAXIMUM,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[CREDIT_PERIOD_WITH_BUYER].ABOVE_MAXIMUM}`,
      );
    });
  });
});