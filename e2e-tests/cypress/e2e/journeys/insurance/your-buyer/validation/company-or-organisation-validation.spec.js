import { submitButton } from '../../../../pages/shared';
import partials from '../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import getReferenceNumber from '../../../../helpers/get-reference-number';

const {
  COMPANY_OR_ORGANISATION: {
    NAME,
    ADDRESS,
    COUNTRY,
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: COMPANY_OR_ORG_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.buyer;

context('Insurance - Your Buyer - Company or organisation page - form validation', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION}`;
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('should render validation errors for all required fields', () => {
    submitButton().click();

    partials.errorSummaryListItems().should('exist');

    const TOTAL_REQUIRED_FIELDS = 3;
    partials.errorSummaryListItems().should('have.length', TOTAL_REQUIRED_FIELDS);

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      COMPANY_OR_ORG_ERROR_MESSAGES[NAME].IS_EMPTY,
    );

    cy.checkText(
      partials.errorSummaryListItems().eq(1),
      COMPANY_OR_ORG_ERROR_MESSAGES[ADDRESS].IS_EMPTY,
    );

    cy.checkText(
      partials.errorSummaryListItems().eq(2),
      ERROR_MESSAGES[COUNTRY].IS_EMPTY,
    );
  });
});
