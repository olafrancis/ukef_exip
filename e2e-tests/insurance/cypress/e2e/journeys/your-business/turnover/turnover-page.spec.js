import partials from '../../../../../../partials';
import { field as fieldSelector, saveAndBackButton } from '../../../../../../pages/shared';
import { turnoverPage } from '../../../../../../pages/your-business';
import { PAGES, BUTTONS } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/business';
import { formatDate } from '../../../../../../helpers/date';
import application from '../../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.TURNOVER;

const {
  TURNOVER: {
    FINANCIAL_YEAR_END_DATE,
    ESTIMATED_ANNUAL_TURNOVER,
    PERCENTAGE_TURNOVER,
  },
} = FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    TURNOVER,
    NATURE_OF_BUSINESS,
    BROKER,
  },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const financialYearEnd = {
  content: FIELDS.TURNOVER[FINANCIAL_YEAR_END_DATE],
  timestamp: application.EXPORTER_COMPANY[FINANCIAL_YEAR_END_DATE],
};

financialYearEnd.expectedValue = formatDate(financialYearEnd.timestamp, financialYearEnd.content.DATE_FORMAT);

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Turnover page - As an Exporter I want to enter the I want to enter the turnover of my business so that UKEF can have clarity on my business financial position when processing my Export Insurance Application', () => {
  let referenceNumber;
  let url;
  let brokerUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitNatureOfYourBusiness();

      url = `${baseUrl}${ROOT}/${referenceNumber}${TURNOVER}`;
      brokerUrl = `${baseUrl}${ROOT}/${referenceNumber}${BROKER}`;

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
      currentHref: `${ROOT}/${referenceNumber}${TURNOVER}`,
      backLink: `${ROOT}/${referenceNumber}${NATURE_OF_BUSINESS}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(partials.headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it(`should display ${FINANCIAL_YEAR_END_DATE} section`, () => {
      const fieldId = FINANCIAL_YEAR_END_DATE;
      const field = fieldSelector(fieldId);

      cy.checkText(turnoverPage[fieldId](), financialYearEnd.expectedValue);

      cy.checkText(field.label(), financialYearEnd.content.LABEL);

      field.hint().contains(financialYearEnd.content.HINT);
    });

    it('should display turnover fieldset legend', () => {
      const fieldId = ESTIMATED_ANNUAL_TURNOVER;
      const field = fieldSelector(fieldId);

      cy.checkText(field.legend(), FIELDS.TURNOVER[fieldId].LEGEND);
    });

    it(`should display ${ESTIMATED_ANNUAL_TURNOVER} section`, () => {
      const fieldId = ESTIMATED_ANNUAL_TURNOVER;
      const field = fieldSelector(fieldId);

      field.input().should('exist');

      cy.checkText(field.label(), FIELDS.TURNOVER[fieldId].LABEL);

      cy.checkText(field.prefix(), FIELDS.TURNOVER[fieldId].PREFIX);
    });

    it(`should display ${PERCENTAGE_TURNOVER} section`, () => {
      const fieldId = PERCENTAGE_TURNOVER;
      const field = fieldSelector(fieldId);

      field.input().should('exist');

      cy.checkText(field.label(), FIELDS.TURNOVER[fieldId].LABEL);

      cy.checkText(field.suffix(), FIELDS.TURNOVER[fieldId].SUFFIX);
    });

    it('should display save and go back button', () => {
      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    it(`should redirect to ${BROKER}`, () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitTurnoverForm();

      cy.assertUrl(brokerUrl);
    });
  });

  describe('when going back to the page', () => {
    it('should have the submitted values', () => {
      cy.navigateToUrl(url);

      cy.checkText(turnoverPage[FINANCIAL_YEAR_END_DATE](), financialYearEnd.expectedValue);

      fieldSelector(ESTIMATED_ANNUAL_TURNOVER).input().should('have.value', application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);

      fieldSelector(PERCENTAGE_TURNOVER).input().should('have.value', application.EXPORTER_BUSINESS[PERCENTAGE_TURNOVER]);
    });
  });
});
