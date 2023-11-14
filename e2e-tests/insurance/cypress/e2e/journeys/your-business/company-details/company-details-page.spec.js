import { companyDetails } from '../../../../../../pages/your-business';
import partials from '../../../../../../partials';
import {
  field,
  saveAndBackButton,
  yesRadioInput,
  noRadioInput,
} from '../../../../../../pages/shared';
import { PAGES, BUTTONS } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';

const {
  ROOT,
  EXPORTER_BUSINESS: {
    ROOT: EXPORTER_BUSINESS_ROOT,
    COMPANY_DETAILS_ROOT,
  },
} = INSURANCE_ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS;

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      TRADING_ADDRESS,
      TRADING_NAME,
      WEBSITE,
      PHONE_NUMBER,
    },
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Company details page - As an Exporter I want to my companies details So that I can apply for UKEF Export Insurance policy', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection();

      url = `${baseUrl}${ROOT}/${referenceNumber}${COMPANY_DETAILS_ROOT}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${ROOT}/${referenceNumber}${COMPANY_DETAILS_ROOT}`,
      backLink: `${ROOT}/${referenceNumber}${EXPORTER_BUSINESS_ROOT}`,
      lightHouseThresholds: {
        'best-practices': 93,
      },
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(partials.headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('should display the trading name radios', () => {
      cy.checkText(companyDetails[TRADING_NAME].label(), EXPORTER_BUSINESS_FIELDS[TRADING_NAME].LABEL);

      cy.checkRadioInputYesAriaLabel(EXPORTER_BUSINESS_FIELDS[TRADING_NAME].LABEL);

      cy.checkRadioInputNoAriaLabel(EXPORTER_BUSINESS_FIELDS[TRADING_NAME].LABEL);
    });

    it('should display the trading address radios', () => {
      cy.checkText(companyDetails[TRADING_ADDRESS].label(), EXPORTER_BUSINESS_FIELDS[TRADING_ADDRESS].LABEL);

      cy.checkAriaLabel(yesRadioInput().eq(1), `${EXPORTER_BUSINESS_FIELDS[TRADING_ADDRESS].LABEL} Yes`);

      cy.checkAriaLabel(noRadioInput().eq(1), `${EXPORTER_BUSINESS_FIELDS[TRADING_ADDRESS].LABEL} No`);
    });

    it('should display the company website text area', () => {
      cy.checkText(field(WEBSITE).label(), EXPORTER_BUSINESS_FIELDS[WEBSITE].LABEL);

      field(WEBSITE).input().should('exist');
      cy.checkAriaLabel(field(WEBSITE).input(), EXPORTER_BUSINESS_FIELDS[WEBSITE].LABEL);
    });

    it('should display the phone number text area', () => {
      cy.checkText(field(PHONE_NUMBER).label(), EXPORTER_BUSINESS_FIELDS[PHONE_NUMBER].LABEL);

      cy.checkText(field(PHONE_NUMBER).hint(), EXPORTER_BUSINESS_FIELDS[PHONE_NUMBER].HINT);

      field(PHONE_NUMBER).input().should('exist');
      cy.checkAriaLabel(field(PHONE_NUMBER).input(), EXPORTER_BUSINESS_FIELDS[PHONE_NUMBER].LABEL);
    });

    it('should display save and go back button', () => {
      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });
});
