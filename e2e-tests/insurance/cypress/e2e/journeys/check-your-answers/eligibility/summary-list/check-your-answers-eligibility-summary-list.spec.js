import checkSummaryList from '../../../../../../../commands/insurance/check-your-answers-eligibility-summary-list';
import partials from '../../../../../../../partials';
import { ROUTES, FIELD_IDS } from '../../../../../../../constants';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    ELIGIBILITY,
  },
} = ROUTES.INSURANCE;

const {
  TOTAL_CONTRACT_VALUE,
  COVER_PERIOD,
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
} = FIELD_IDS.INSURANCE.ELIGIBILITY;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

context('Insurance - Check your answers - Eligibility - Summary List', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ELIGIBILITY}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should render a ${BUYER_COUNTRY} summary list row`, () => {
    checkSummaryList[BUYER_COUNTRY]();
  });

  it(`should render a ${VALID_EXPORTER_LOCATION} summary list row`, () => {
    checkSummaryList[VALID_EXPORTER_LOCATION]();
  });

  it(`should render a ${HAS_MINIMUM_UK_GOODS_OR_SERVICES} summary list row`, () => {
    checkSummaryList[HAS_MINIMUM_UK_GOODS_OR_SERVICES]();
  });

  it(`should render a ${TOTAL_CONTRACT_VALUE} summary list row`, () => {
    checkSummaryList[TOTAL_CONTRACT_VALUE]();
  });

  it(`should render a ${COVER_PERIOD} summary list row`, () => {
    checkSummaryList[COVER_PERIOD]();
  });
});
