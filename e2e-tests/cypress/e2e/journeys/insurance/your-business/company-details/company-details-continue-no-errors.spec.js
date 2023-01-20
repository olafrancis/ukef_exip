import { companyDetails } from '../../../../pages/your-business';
import { submitButton, yesRadioInput } from '../../../../pages/shared';
import {
  ROUTES, VALID_PHONE_NUMBERS, WEBSITE_EXAMPLES, COMPANIES_HOUSE_NUMBER,
} from '../../../../../../constants';
import getReferenceNumber from '../../../../helpers/get-reference-number';

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section", () => {
  let referenceNumber;
  let url;
  let natureOfBusinessUrl;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;
      natureOfBusinessUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS}`;

      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('continue to next page', () => {
    it('should not display any validation errors required fields entered correctly', () => {
      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      yesRadioInput().first().click();
      yesRadioInput().eq(1).click();
      submitButton().click();
    });

    it(`should redirect to ${natureOfBusinessUrl}`, () => {
      cy.url().should('eq', natureOfBusinessUrl);
    });

    it('should not display any validation errors if required and optional fields entered correctly', () => {
      cy.navigateToUrl(url);

      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      yesRadioInput().first().click();
      yesRadioInput().eq(1).click();
      companyDetails.phoneNumber().clear().type(VALID_PHONE_NUMBERS.LANDLINE.NORMAL);
      companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
      submitButton().click();
    });

    it(`should redirect to ${natureOfBusinessUrl}`, () => {
      cy.url().should('eq', natureOfBusinessUrl);
    });
  });
});
