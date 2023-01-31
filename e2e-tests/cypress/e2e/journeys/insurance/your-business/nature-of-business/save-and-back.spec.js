import { natureOfBusiness } from '../../../../pages/your-business';
import partials from '../../../../partials';
import { submitButton, saveAndBackButton } from '../../../../pages/shared';
import { TASKS } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import getReferenceNumber from '../../../../helpers/get-reference-number';
import application from '../../../../../fixtures/application';

const {
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES,
    YEARS_EXPORTING,
    EMPLOYEES_UK,
    EMPLOYEES_INTERNATIONAL,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  ROOT,
  START,
  ALL_SECTIONS,
  EXPORTER_BUSINESS: {
    NATURE_OF_BUSINESS,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

context('Insurance - Your business - Nature of your business page - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitCompanyDetails();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${NATURE_OF_BUSINESS}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('When all fields are provided', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your business` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });
  });

  describe('save and back on a partially entered form', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.navigateToUrl(url);

      natureOfBusiness[GOODS_OR_SERVICES].input().clear().type(application.EXPORTER_BUSINESS[GOODS_OR_SERVICES]);

      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your business` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    it(`should retain the ${GOODS_OR_SERVICES} input on the page and the other fields should be empty`, () => {
      task.link().click();
      submitButton().click();

      natureOfBusiness[GOODS_OR_SERVICES].input().should('have.value', application.EXPORTER_BUSINESS[GOODS_OR_SERVICES]);
      natureOfBusiness[YEARS_EXPORTING].input().should('have.value', '');
      natureOfBusiness[EMPLOYEES_UK].input().should('have.value', '');
      natureOfBusiness[EMPLOYEES_INTERNATIONAL].input().should('have.value', '');
    });
  });

  describe('When all fields are provided', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.navigateToUrl(url);

      natureOfBusiness[GOODS_OR_SERVICES].input().clear().type(application.EXPORTER_BUSINESS[GOODS_OR_SERVICES]);
      natureOfBusiness[YEARS_EXPORTING].input().clear().type(application.EXPORTER_BUSINESS[YEARS_EXPORTING]);
      natureOfBusiness[EMPLOYEES_UK].input().clear().type(application.EXPORTER_BUSINESS[EMPLOYEES_UK]);
      natureOfBusiness[EMPLOYEES_INTERNATIONAL].input().clear().type(application.EXPORTER_BUSINESS[EMPLOYEES_INTERNATIONAL]);

      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your business` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    it(`should retain the ${GOODS_OR_SERVICES} input on the page and the other fields should be empty`, () => {
      task.link().click();
      submitButton().click();

      natureOfBusiness[GOODS_OR_SERVICES].input().should('have.value', application.EXPORTER_BUSINESS[GOODS_OR_SERVICES]);
      natureOfBusiness[YEARS_EXPORTING].input().should('have.value', application.EXPORTER_BUSINESS[YEARS_EXPORTING]);
      natureOfBusiness[EMPLOYEES_UK].input().should('have.value', application.EXPORTER_BUSINESS[EMPLOYEES_UK]);
      natureOfBusiness[EMPLOYEES_INTERNATIONAL].input().should('have.value', application.EXPORTER_BUSINESS[EMPLOYEES_INTERNATIONAL]);
    });
  });
});