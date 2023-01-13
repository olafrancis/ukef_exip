import { companyDetails } from '../../../../pages/your-business';
import { saveAndBackButton, yesRadioInput } from '../../../../pages/shared';
import {
  ROUTES, FIELD_IDS, INVALID_PHONE_NUMBERS, WEBSITE_EXAMPLES, COMPANIES_HOUSE_NUMBER, VALID_PHONE_NUMBERS,
} from '../../../../../../constants';
import getReferenceNumber from '../../../../helpers/get-reference-number';

const { ALL_SECTIONS } = ROUTES.INSURANCE;

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: {
      INPUT,
    },
    YOUR_COMPANY: {
      TRADING_NAME,
      TRADING_ADDRESS,
      WEBSITE,
      PHONE_NUMBER,
    },
  },
} = FIELD_IDS.INSURANCE;

describe('Insurance - Your business - Company details page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe(`when only ${TRADING_ADDRESS} and ${TRADING_NAME} fields are completed`, () => {
    it('should not display validation errors and redirect to task list', () => {
      yesRadioInput().first().click();
      yesRadioInput().eq(1).click();
      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });
  });

  describe(`when required fields are completed and ${INPUT} is entered incorrectly`, () => {
    it('should not display validation errors and redirect to task list', () => {
      cy.navigateToUrl(url);

      companyDetails.companiesHouseSearch().clear().type('**/*');
      yesRadioInput().first().click();
      yesRadioInput().eq(1).click();
      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });
  });

  describe(`when required fields are completed and ${PHONE_NUMBER} is entered incorrectly`, () => {
    it('should not display validation errors and redirect to task list', () => {
      cy.navigateToUrl(url);

      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      yesRadioInput().first().click();
      yesRadioInput().eq(1).click();
      companyDetails.phoneNumber().clear().type(INVALID_PHONE_NUMBERS.LANDLINE.SPECIAL_CHAR);
      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });
  });

  describe(`when required required fields are completed and ${WEBSITE} is entered incorrectly`, () => {
    it('should not display validation errors and redirect to task list', () => {
      cy.navigateToUrl(url);

      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      yesRadioInput().first().click();
      yesRadioInput().eq(1).click();
      companyDetails.phoneNumber().clear().type(VALID_PHONE_NUMBERS.LANDLINE.NORMAL);
      companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.INVALID);
      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });
  });

  describe('when all fields are entered correctly', () => {
    it('should not display validation errors and redirect to task list if all fields are entered correctly', () => {
      cy.navigateToUrl(url);

      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      yesRadioInput().first().click();
      yesRadioInput().eq(1).click();
      companyDetails.phoneNumber().clear().type(VALID_PHONE_NUMBERS.LANDLINE.NORMAL);
      companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });
  });
});
