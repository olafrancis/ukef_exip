import { buyerCountryPage, yesRadioInput, submitButton } from '../../../pages/shared';
import { checkYourAnswersPage } from '../../../pages/quote';
import partials from '../../../partials';
import { FIELD_IDS, ROUTES } from '../../../../../constants';

const {
  BUYER_COUNTRY,
  VALID_EXPORTER_LOCATION,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
} = FIELD_IDS;

const submissionData = {
  [BUYER_COUNTRY]: 'Algeria',
  [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: true,
};

context('Change your answers (export fields) - as an exporter, I want to change the details before submitting the proposal', () => {
  before(() => {
    cy.login();
    cy.submitAnswersHappyPathSinglePolicy();
    cy.url().should('include', ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('change `Buyer based`', () => {
    let row = checkYourAnswersPage.summaryLists.export[BUYER_COUNTRY];

    it(`clicking 'change' redirects to ${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = ROUTES.QUOTE.BUYER_COUNTRY_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('has originally submitted answer selected', () => {
      const expectedValue = submissionData[BUYER_COUNTRY];

      buyerCountryPage.results().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedValue);
      });
    });

    it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}#heading`;
      cy.url().should('include', expected);
    });

    it(`redirects to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS} when resubmitting a new answer`, () => {
      buyerCountryPage.searchInput().type('Brazil');
      const results = buyerCountryPage.results();
      results.first().click();
      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in `Check your answers` page', () => {
      row = checkYourAnswersPage.summaryLists.export[BUYER_COUNTRY];

      row.value().invoke('text').then((text) => {
        const expected = 'Brazil';

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('change `Company`', () => {
    const row = checkYourAnswersPage.summaryLists.export[VALID_EXPORTER_LOCATION];

    it(`clicking 'change' redirects to ${ROUTES.QUOTE.EXPORTER_LOCATION_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = ROUTES.QUOTE.EXPORTER_LOCATION_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.EXPORTER_LOCATION_CHANGE}#heading`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('has originally submitted answer selected', () => {
      yesRadioInput().should('be.checked');
    });

    it(`redirects to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS} when resubmitting`, () => {
      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    });
  });

  describe('change `UK goods`', () => {
    const row = checkYourAnswersPage.summaryLists.export[HAS_MINIMUM_UK_GOODS_OR_SERVICES];

    it(`clicking 'change' redirects to ${ROUTES.QUOTE.UK_GOODS_OR_SERVICES_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = ROUTES.QUOTE.UK_GOODS_OR_SERVICES_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.UK_GOODS_OR_SERVICES_CHANGE}#heading`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('has originally submitted answer', () => {
      yesRadioInput().should('be.checked');
    });

    it(`redirects to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS} when resubmitting`, () => {
      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    });
  });
});
