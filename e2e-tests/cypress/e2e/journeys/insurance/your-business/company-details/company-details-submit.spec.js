import { companyDetails } from '../../../../pages/your-business';
import { submitButton, yesRadioInput, inlineErrorMessage } from '../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import partials from '../../../../partials';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import getReferenceNumber from '../../../../helpers/get-reference-number';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: {
      INPUT,
    },
    YOUR_COMPANY: {
      TRADING_NAME,
    },
  },
} = FIELD_IDS.INSURANCE;

const COMPANY_DETAILS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

describe("Your business - company house search - As an Exporter I want to enter details about my business in 'your business' section", () => {
  let referenceNumber;

  before(() => {
    cy.visit(ROUTES.INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      cy.visit(url, {
        auth: {
          username: Cypress.config('basicAuthKey'),
          password: Cypress.config('basicAuthSecret'),
        },
      });

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('all page errors', () => {
    it('should display validation errors if trading name question and companies house input are not answered', () => {
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 2);

      partials.errorSummaryListItems().first().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[INPUT].INCORRECT_FORMAT);
        });

      partials.errorSummaryListItems().eq(1).invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[TRADING_NAME].IS_EMPTY);
        });
    });

    it('should focus to the companies house input section when clicking the companies house error', () => {
      partials.errorSummaryListItemLinks().first().click();
      companyDetails.companiesHouseSearch().first().should('have.focus');
    });

    it('should display the validation error for companies house input in companies house section', () => {
      companyDetails.companiesHouseSearchError().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(`Error: ${COMPANY_DETAILS_ERRORS[INPUT].INCORRECT_FORMAT}`);
        });
    });

    it('should focus to the trading name section when clicking the error', () => {
      partials.errorSummaryListItemLinks().eq(1).click();
      yesRadioInput().first().should('have.focus');
    });

    it('should display the validation error for trading name in radio error summary', () => {
      inlineErrorMessage().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(`Error: ${COMPANY_DETAILS_ERRORS[TRADING_NAME].IS_EMPTY}`);
        });
    });

    it('should display companies house error and trading name error when companies house incorrectly entered', () => {
      companyDetails.companiesHouseSearch().clear().type('123456!');
      companyDetails.companiesHouseSearchButton().click();

      submitButton().click();
      partials.errorSummaryListItems().first().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[INPUT].INCORRECT_FORMAT);
        });

      partials.errorSummaryListItems().eq(1).invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[TRADING_NAME].IS_EMPTY);
        });
    });

    it('should display companies house error and trading name error when companies house not found', () => {
      companyDetails.companiesHouseSearch().clear().type('123456');
      companyDetails.companiesHouseSearchButton().click();

      submitButton().click();
      partials.errorSummaryListItems().first().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[INPUT].NOT_FOUND);
        });

      partials.errorSummaryListItems().eq(1).invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[TRADING_NAME].IS_EMPTY);
        });
    });
  });

  describe('trading name error', () => {
    const companiesHouseNumber = '8989898';

    it('should display validation errors if trading name question is not answered', () => {
      companyDetails.companiesHouseSearch().clear().type(companiesHouseNumber);
      submitButton().click();
      partials.errorSummaryListItems().should('have.length', 1);
      partials.errorSummaryListItems().first().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(COMPANY_DETAILS_ERRORS[TRADING_NAME].IS_EMPTY);
        });
    });

    it('should focus to the trading name section when clicking the error', () => {
      partials.errorSummaryListItemLinks().first().click();
      yesRadioInput().first().should('have.focus');
    });

    it('should display the validation error for trading name in radio error summary', () => {
      inlineErrorMessage().invoke('text')
        .then((text) => {
          expect(text.trim()).equal(`Error: ${COMPANY_DETAILS_ERRORS[TRADING_NAME].IS_EMPTY}`);
        });
    });
  });
});
