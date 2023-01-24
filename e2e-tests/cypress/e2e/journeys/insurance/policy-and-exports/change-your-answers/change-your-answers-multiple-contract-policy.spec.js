import { submitButton } from '../../../../pages/shared';
import { multipleContractPolicyPage, checkYourAnswersPage } from '../../../../pages/insurance/policy-and-export';
import partials from '../../../../partials';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import getReferenceNumber from '../../../../helpers/get-reference-number';
import { createTimestampFromNumbers, formatDate } from '../../../../helpers/date';
import formatCurrency from '../../../../helpers/format-currency';
import application from '../../../../../fixtures/application';
import currencies from '../../../../../fixtures/currencies';

const {
  POLICY_AND_EXPORTS: {
    CHECK_YOUR_ANSWERS,
    MULTIPLE_CONTRACT_POLICY_CHANGE,
  },
} = ROUTES.INSURANCE;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        CREDIT_PERIOD_WITH_BUYER,
        POLICY_CURRENCY_CODE,
        MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
      },
    },
  },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

const { summaryList } = checkYourAnswersPage;

context('Insurance - Policy and exports - Check your answers - Multiple contract policy - As an exporter, I want to change my answers to the type of policy and exports section', () => {
  let referenceNumber;

  before(() => {
    cy.visit(ROUTES.INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTI);
    cy.completeAndSubmitMultipleContractPolicyForm();
    cy.completeAndSubmitAboutGoodsOrServicesForm();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('single policy type answers', () => {
    describe(REQUESTED_START_DATE, () => {
      const fieldId = REQUESTED_START_DATE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHANGE}`, () => {
          summaryList[fieldId].changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = {
          ...application.POLICY_AND_EXPORTS[fieldId],
          year: application.POLICY_AND_EXPORTS[fieldId].year + 1,
        };

        before(() => {
          multipleContractPolicyPage[fieldId].yearInput().clear().type(newAnswer.year);

          submitButton().click();
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
        });

        it('should render the new answer', () => {
          const expected = formatDate(createTimestampFromNumbers(newAnswer.day, newAnswer.month, newAnswer.year));

          cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        });
      });
    });

    describe(TOTAL_MONTHS_OF_COVER, () => {
      const fieldId = TOTAL_MONTHS_OF_COVER;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHANGE}`, () => {
          summaryList[fieldId].changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = String(Number(application.POLICY_AND_EXPORTS[fieldId]) + 1);

        before(() => {
          multipleContractPolicyPage[fieldId].input().select(newAnswer);

          submitButton().click();
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
        });

        it('should render the new answer', () => {
          const expected = `${newAnswer} months`;

          cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        });
      });
    });

    describe(TOTAL_SALES_TO_BUYER, () => {
      const fieldId = TOTAL_SALES_TO_BUYER;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHANGE}`, () => {
          summaryList[fieldId].changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = application.POLICY_AND_EXPORTS[fieldId] - 500;

        before(() => {
          multipleContractPolicyPage[fieldId].input().clear().type(newAnswer);

          submitButton().click();
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
        });

        it('should render the new answer', () => {
          const expected = formatCurrency(newAnswer);

          cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        });
      });
    });

    describe(MAXIMUM_BUYER_WILL_OWE, () => {
      const fieldId = MAXIMUM_BUYER_WILL_OWE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHANGE}`, () => {
          summaryList[fieldId].changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = Number(application.POLICY_AND_EXPORTS[fieldId]) + 1000;

        before(() => {
          multipleContractPolicyPage[fieldId].input().clear().type(newAnswer);

          submitButton().click();
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
        });

        it('should render the new answer', () => {
          const expected = formatCurrency(newAnswer);

          cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        });
      });
    });

    describe(CREDIT_PERIOD_WITH_BUYER, () => {
      const fieldId = CREDIT_PERIOD_WITH_BUYER;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHANGE}`, () => {
          summaryList[fieldId].changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = `${application.POLICY_AND_EXPORTS[fieldId]} additional text`;

        before(() => {
          multipleContractPolicyPage[fieldId].input().clear().type(newAnswer);

          submitButton().click();
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
        });

        it('should render the new answer', () => {
          const expected = newAnswer;

          cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        });
      });
    });

    describe(POLICY_CURRENCY_CODE, () => {
      const fieldId = POLICY_CURRENCY_CODE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${MULTIPLE_CONTRACT_POLICY_CHANGE}`, () => {
          summaryList[fieldId].changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, MULTIPLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = currencies[3].isoCode;

        before(() => {
          multipleContractPolicyPage[fieldId].input().select(newAnswer);

          submitButton().click();
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
        });

        it('should render the new answer', () => {
          const { isoCode, name } = currencies[3];

          const expected = `${isoCode} ${name}`;

          cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        });
      });
    });
  });
});