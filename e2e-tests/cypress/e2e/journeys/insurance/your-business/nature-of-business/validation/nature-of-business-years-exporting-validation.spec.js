import { natureOfBusiness } from '../../../../../pages/your-business';
import partials from '../../../../../partials';
import { submitButton } from '../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../../constants';
import getReferenceNumber from '../../../../../helpers/get-reference-number';
import checkText from '../../../../../helpers/check-text';

const NATURE_OF_BUSINESS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

const {
  NATURE_OF_YOUR_BUSINESS: {
    YEARS_EXPORTING,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

describe('Insurance - Your business - Nature of your business page - As an Exporter I want to enter details about the nature of my business - years exporting input validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitCompanyDetails();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe(`${YEARS_EXPORTING} error`, () => {
    describe(`when ${YEARS_EXPORTING} is left empty`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[YEARS_EXPORTING].IS_EMPTY;

      it(`should display validation errors if ${YEARS_EXPORTING} left empty`, () => {
        const fieldId = YEARS_EXPORTING;
        const field = natureOfBusiness[fieldId];

        field.input().clear();
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 4);
        checkText(partials.errorSummaryListItems().eq(1), errorMessage);
      });

      it(`should focus to the ${YEARS_EXPORTING} section when clicking the error`, () => {
        const fieldId = YEARS_EXPORTING;
        const field = natureOfBusiness[fieldId];

        partials.errorSummaryListItemLinks().eq(1).click();
        field.input().should('have.focus');
      });

      it(`should display the validation error for ${YEARS_EXPORTING}`, () => {
        const fieldId = YEARS_EXPORTING;
        const field = natureOfBusiness[fieldId];

        checkText(field.error(), `Error: ${errorMessage}`);
      });
    });

    describe(`when ${YEARS_EXPORTING} is a decimal place number`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[YEARS_EXPORTING].INCORRECT_FORMAT;

      it(`should display validation errors for ${YEARS_EXPORTING}`, () => {
        const fieldId = YEARS_EXPORTING;
        const field = natureOfBusiness[fieldId];

        field.input().clear().type('5.5');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 4);
        checkText(partials.errorSummaryListItems().eq(1), errorMessage);
      });

      it(`should display the validation error for ${YEARS_EXPORTING}`, () => {
        const fieldId = YEARS_EXPORTING;
        const field = natureOfBusiness[fieldId];

        checkText(field.error(), `Error: ${errorMessage}`);
      });
    });

    describe(`when ${YEARS_EXPORTING} has special characters`, () => {
      const errorMessage = NATURE_OF_BUSINESS_ERRORS[YEARS_EXPORTING].INCORRECT_FORMAT;

      it(`should display validation errors for ${YEARS_EXPORTING}`, () => {
        const fieldId = YEARS_EXPORTING;
        const field = natureOfBusiness[fieldId];

        field.input().clear().type('5O');
        submitButton().click();
        partials.errorSummaryListItems().should('have.length', 4);
        checkText(partials.errorSummaryListItems().eq(1), errorMessage);
      });

      it(`should display the validation error for ${YEARS_EXPORTING}`, () => {
        const fieldId = YEARS_EXPORTING;
        const field = natureOfBusiness[fieldId];

        checkText(field.error(), `Error: ${errorMessage}`);
      });
    });
  });

  describe(`when ${YEARS_EXPORTING} is correctly entered`, () => {
    it('should not display validation errors', () => {
      cy.navigateToUrl(url);

      const fieldId = YEARS_EXPORTING;
      const field = natureOfBusiness[fieldId];

      field.input().clear().type('5');
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 3);
    });
  });
});