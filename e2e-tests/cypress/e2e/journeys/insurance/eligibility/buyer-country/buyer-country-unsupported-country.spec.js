import { buyerCountryPage, cannotApplyPage, submitButton } from '../../../../pages/shared';
import partials from '../../../../partials';
import { PAGES } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { completeStartForm, completeCheckIfEligibleForm } from '../../../../../support/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.CANNOT_APPLY;
const { REASON } = CONTENT_STRINGS;

const COUNTRY_NAME_UNSUPPORTED = 'France';

context('Insurance - Buyer location page - as an exporter, I want to check if UKEF offer export insurance policy for where my buyer is based - submit unsupported country', () => {
  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    completeStartForm();
    completeCheckIfEligibleForm();

    buyerCountryPage.searchInput().type(COUNTRY_NAME_UNSUPPORTED);

    const results = buyerCountryPage.results();
    results.first().click();

    submitButton().click();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('redirects to `cannot apply` exit page', () => {
    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY);
  });

  it('renders a reason', () => {
    cannotApplyPage.reason().should('exist');

    const expected = `${REASON.INTRO} ${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${COUNTRY_NAME_UNSUPPORTED}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;
    cy.checkText(cannotApplyPage.reason(), expected);
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');

    const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY}`;

    partials.backLink().should('have.attr', 'href', expected);
  });

  describe('when going back to the page', () => {
    it('should NOT have the originally submitted answer selected', () => {
      partials.backLink().click();

      buyerCountryPage.results().should('have.length', 0);
    });
  });
});
