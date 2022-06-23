import {
  companyBasedPage,
  checkYourAnswersPage,
} from '../../pages';
import CONSTANTS from '../../../../constants';

const {
  FIELD_IDS,
  ROUTES,
} = CONSTANTS;

const { VALID_COMPANY_BASE } = FIELD_IDS;

context('Change your answers after checking answers - Company fields', () => {
  before(() => {
    cy.login();
    cy.submitAnswersHappyPath();
    cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('change `Company`', () => {
    const row = checkYourAnswersPage.summaryLists.company[VALID_COMPANY_BASE];

    it(`clicking 'change' redirects to ${ROUTES.COMPANY_BASED_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = `${ROUTES.COMPANY_BASED_CHANGE}#${VALID_COMPANY_BASE}`;
      cy.url().should('include', expectedUrl);
    });

    it('has originally submitted answer selected', () => {
      companyBasedPage[VALID_COMPANY_BASE].yesInput().should('be.checked');
    });

    it('auto focuses the input', () => {
      companyBasedPage[VALID_COMPANY_BASE].yesInput().should('have.focus');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when resubmitting`, () => {
      companyBasedPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });
  });
});
