import { buyerCountryPage, heading, submitButton } from '../../pages/shared';
import { needToStartAgainPage } from '../../pages/quote';
import partials from '../../partials';
import {
  BUTTONS,
  ORGANISATION,
  LINKS,
  PAGES,
} from '../../../../content-strings';
import CONSTANTS from '../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../support/forms';
import { completeAndSubmitBuyerBodyForm } from '../../../support/quote/forms';

const CONTENT_STRINGS = PAGES.QUOTE.NEED_TO_START_AGAIN;
const { FIELD_IDS, ROUTES } = CONSTANTS;

context('Need to start again exit page', () => {
  beforeEach(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();

    cy.visit(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.url().should('include', ROUTES.QUOTE.NEED_TO_START_AGAIN);
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 100,
      seo: 60,
    });
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  }); 

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.PAGE_TITLE);
    });
  });

  it('renders a reason', () => {
    needToStartAgainPage.reason().should('exist');
  });

  it('renders a submit button', () => {
    submitButton().should('exist');

    submitButton().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.START_AGAIN.TEXT);
    });
  });

  describe('clicking the submit button', () => {
    it(`should redirect to ${ROUTES.QUOTE.BUYER_COUNTRY}`, () => {
      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.BUYER_COUNTRY);
    });
  });  
});
