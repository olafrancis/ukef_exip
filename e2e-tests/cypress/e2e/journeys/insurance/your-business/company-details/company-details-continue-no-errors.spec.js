import { submitButton } from '../../../../pages/shared';
import partials from '../../../../partials';
import {
  ROUTES, VALID_PHONE_NUMBERS, WEBSITE_EXAMPLES, COMPANIES_HOUSE_NUMBER, FIELD_IDS,
} from '../../../../../../constants';
import application from '../../../../../fixtures/application';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: {
      COMPANY_SIC,
      INDUSTRY_SECTOR_NAME,
    },
  },
} = FIELD_IDS.INSURANCE;

const { EXPORTER_COMPANY } = application;

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section", () => {
  let referenceNumber;
  let url;
  let contactUrl;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      contactUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.CONTACT}`;

      cy.navigateToUrl(url);

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  const companyDetailsFormVariables = {
    companiesHouseNumber: COMPANIES_HOUSE_NUMBER,
    phoneNumber: VALID_PHONE_NUMBERS.LANDLINE.NORMAL,
    website: WEBSITE_EXAMPLES.VALID,
  };

  describe('continue to next page', () => {
    describe('when required fields entered correctly', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeCompanyDetailsForm({ companiesHouseNumber: COMPANIES_HOUSE_NUMBER });

        submitButton().click();
      });

      it(`should redirect to ${contactUrl}`, () => {
        cy.assertUrl(contactUrl);
      });
    });

    describe('when required and optional fields are entered correctly', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeCompanyDetailsForm(companyDetailsFormVariables);

        submitButton().click();
      });

      it(`should redirect to ${contactUrl}`, () => {
        cy.assertUrl(contactUrl);
      });
    });
  });

  describe('when resubmitting company number on company details page', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      // navigate back to company details page from nature of business
      cy.clickBackLink();

      cy.completeCompanyDetailsForm(companyDetailsFormVariables);

      submitButton().click();
      // return to company details page after redirect to nature of business
      cy.clickBackLink();
    });

    it('should remove old sic codes from company summary list', () => {
      cy.checkText(partials.yourBusinessSummaryList[COMPANY_SIC].value(), `${EXPORTER_COMPANY[COMPANY_SIC][0]} - ${EXPORTER_COMPANY[INDUSTRY_SECTOR_NAME][0]}`);
    });
  });
});
