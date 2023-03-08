import { submitButton } from '../../../../pages/shared';
import { singleContractPolicyPage, checkYourAnswersPage } from '../../../../pages/insurance/policy-and-export';
import partials from '../../../../partials';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import { createTimestampFromNumbers, formatDate } from '../../../../helpers/date';
import formatCurrency from '../../../../helpers/format-currency';
import application from '../../../../../fixtures/application';
import currencies from '../../../../../fixtures/currencies';

const {
  POLICY_AND_EXPORTS: {
    CHECK_YOUR_ANSWERS,
    SINGLE_CONTRACT_POLICY_CHANGE,
  },
} = ROUTES.INSURANCE;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        CREDIT_PERIOD_WITH_BUYER,
        POLICY_CURRENCY_CODE,
        SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
      },
    },
  },
} = FIELD_IDS;

const { taskList, policyCurrencyCodeFormField } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

const { summaryList } = checkYourAnswersPage;

context('Insurance - Policy and exports - Change your answers - Single contract policy - As an exporter, I want to change my answers to the type of policy and exports section', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm();
      cy.completeAndSubmitAboutGoodsOrServicesForm();

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  after(() => {
    cy.deleteAccount();
  });

  describe('single policy type answers', () => {
    describe(REQUESTED_START_DATE, () => {
      const fieldId = REQUESTED_START_DATE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHANGE}`, () => {
          summaryList[fieldId].changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, SINGLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = {
          ...application.POLICY_AND_EXPORTS[fieldId],
          year: application.POLICY_AND_EXPORTS[fieldId].year + 1,
        };

        before(() => {
          cy.keyboardInput(singleContractPolicyPage[fieldId].yearInput(), newAnswer.year);
          cy.keyboardInput(singleContractPolicyPage[CONTRACT_COMPLETION_DATE].yearInput(), newAnswer.year + 1);

          submitButton().click();
        });

        it('should redirect to the check answers page', () => {
          cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
        });

        it('should render the new answer', () => {
          const expected = formatDate(createTimestampFromNumbers(newAnswer.day, newAnswer.month, newAnswer.year));

          cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        });
      });
    });

    describe(CONTRACT_COMPLETION_DATE, () => {
      const fieldId = CONTRACT_COMPLETION_DATE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHANGE}`, () => {
          summaryList[fieldId].changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, SINGLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = {
          ...application.POLICY_AND_EXPORTS[fieldId],
          year: application.POLICY_AND_EXPORTS[fieldId].year + 2,
        };

        before(() => {
          cy.keyboardInput(singleContractPolicyPage[fieldId].yearInput(), newAnswer.year);

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

    describe(TOTAL_CONTRACT_VALUE, () => {
      const fieldId = TOTAL_CONTRACT_VALUE;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHANGE}`, () => {
          summaryList[fieldId].changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, SINGLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = application.POLICY_AND_EXPORTS[fieldId] - 500;

        before(() => {
          cy.keyboardInput(singleContractPolicyPage[fieldId].input(), newAnswer);

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
        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHANGE}`, () => {
          summaryList[fieldId].changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, SINGLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = `${application.POLICY_AND_EXPORTS[fieldId]} additional text`;

        before(() => {
          cy.keyboardInput(singleContractPolicyPage[fieldId].input(), newAnswer);

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
        it(`should redirect to ${SINGLE_CONTRACT_POLICY_CHANGE}`, () => {
          summaryList[fieldId].changeLink().click();

          cy.assertChangeAnswersPageUrl(referenceNumber, SINGLE_CONTRACT_POLICY_CHANGE, fieldId);
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = currencies[3].isoCode;

        before(() => {
          policyCurrencyCodeFormField.input().select(newAnswer);

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
