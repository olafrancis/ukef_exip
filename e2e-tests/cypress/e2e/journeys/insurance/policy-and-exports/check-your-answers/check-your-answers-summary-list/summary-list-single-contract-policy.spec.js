import partials from '../../../../../partials';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../../constants';
import checkSummaryList from '../../../../../../support/insurance/check-policy-and-exports-summary-list';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      TYPE_OF_POLICY: { POLICY_TYPE },
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        CREDIT_PERIOD_WITH_BUYER,
        POLICY_CURRENCY_CODE,
        SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
      },
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
    },
  },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

context('Insurance - Policy and exports - Check your answers - Summary list - single contract policy', () => {
  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
    cy.completeAndSubmitSingleContractPolicyForm();
    cy.completeAndSubmitAboutGoodsOrServicesForm();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it(`should render a ${POLICY_TYPE} summary list row`, () => {
    checkSummaryList.singleContractPolicy[POLICY_TYPE]();
  });

  it(`should render a ${REQUESTED_START_DATE} summary list row`, () => {
    checkSummaryList[REQUESTED_START_DATE]();
  });

  it(`should render a ${CONTRACT_COMPLETION_DATE} summary list row`, () => {
    checkSummaryList.singleContractPolicy[CONTRACT_COMPLETION_DATE]();
  });

  it(`should render a ${TOTAL_CONTRACT_VALUE} summary list row`, () => {
    checkSummaryList.singleContractPolicy[TOTAL_CONTRACT_VALUE]();
  });

  it(`should render a ${CREDIT_PERIOD_WITH_BUYER} summary list row`, () => {
    checkSummaryList[CREDIT_PERIOD_WITH_BUYER]();
  });

  it(`should render a ${POLICY_CURRENCY_CODE} summary list row`, () => {
    checkSummaryList[POLICY_CURRENCY_CODE]();
  });

  it(`should render a ${DESCRIPTION} summary list row`, () => {
    checkSummaryList[DESCRIPTION]();
  });

  it(`should render a ${FINAL_DESTINATION} summary list row`, () => {
    checkSummaryList[FINAL_DESTINATION]();
  });
});
