import { ukGoodsOrServicesPage } from '../../pages/quote';
import { cannotApplyPage } from '../../pages/shared';
import partials from '../../partials';
import {
  ORGANISATION,
  LINKS,
  PAGES,
} from '../../../../content-strings';
import CONSTANTS from '../../../../constants';
import { completeAndSubmitBuyerCountryForm, completeAndSubmitBuyerBodyForm, completeAndSubmitCompanyForm } from '../../../support/quote/forms';

const CONTENT_STRINGS = PAGES.QUOTE.CANNOT_OBTAIN_COVER;
const { FIELD_IDS, ROUTES } = CONSTANTS;

context('Cannot obtain UKEF cover exit page', () => {
  beforeEach(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitCompanyForm();

    cy.url().should('include', ROUTES.QUOTE.HAS_MINIMUM_UK_GOODS_OR_SERVICES);

    ukGoodsOrServicesPage.no().click();
    ukGoodsOrServicesPage.submitButton().click();

    cy.url().should('include', ROUTES.QUOTE.CANNOT_OBTAIN_COVER);
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

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().click();

    cy.url().should('include', ROUTES.QUOTE.HAS_MINIMUM_UK_GOODS_OR_SERVICES);
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    cannotApplyPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });
  });

  it('renders a reason', () => {
    cannotApplyPage.reason().should('exist');
  });

  it('renders `actions` content', () => {
    cannotApplyPage.actions.intro().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.ACTIONS.INTRO);
    });

    const listItems = cannotApplyPage.actions.listItems();

    listItems.should('have.length', 2);

    cannotApplyPage.actions.eligibility().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.ACTIONS.ELIGIBILITY.TEXT} ${CONTENT_STRINGS.ACTIONS.ELIGIBILITY.LINK.TEXT}`;
      expect(text.trim()).equal(expected);
    });

    cannotApplyPage.actions.eligibilityLink().should('have.attr', 'href', CONTENT_STRINGS.ACTIONS.ELIGIBILITY.LINK.HREF);

    cannotApplyPage.actions.approvedBroker().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.LINK.TEXT} ${CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.TEXT}`;
      expect(text.trim()).equal(expected);
    });

    cannotApplyPage.actions.approvedBrokerLink().should('have.attr', 'href', CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.LINK.HREF);
  });

  describe('when clicking `eligibility` link', () => {
    it('redirects to guidance page - eligibility section', () => {
      cannotApplyPage.actions.eligibilityLink().should('have.attr', 'href', CONTENT_STRINGS.ACTIONS.ELIGIBILITY.LINK.HREF);
    });
  });
});
