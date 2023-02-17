import {
  buyerCountryPage,
  cannotApplyPage,
  submitButton,
} from '../../../pages/shared';
import { PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import { completeStartForm, completeCheckIfEligibleForm } from '../../../../support/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.CANNOT_APPLY;

const COUNTRY_NAME_UNSUPPORTED = 'France';

context('Insurance Eligibility - Cannot apply exit page', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    completeStartForm();
    completeCheckIfEligibleForm();

    cy.keyboardInput(buyerCountryPage.searchInput(), COUNTRY_NAME_UNSUPPORTED);
    const results = buyerCountryPage.results();
    results.first().click();

    submitButton().click();

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY,
      backLink: ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY,
      assertSubmitButton: false,
    });
  });

  it('renders a reason', () => {
    cannotApplyPage.reason().should('exist');
  });

  it('renders `actions` content', () => {
    cy.checkText(cannotApplyPage.actions.intro(), CONTENT_STRINGS.ACTIONS.INTRO);

    const listItems = cannotApplyPage.actions.listItems();

    listItems.should('have.length', 2);

    const expectedEligibility = `${CONTENT_STRINGS.ACTIONS.ELIGIBILITY.TEXT} ${CONTENT_STRINGS.ACTIONS.ELIGIBILITY.LINK.TEXT}`;

    cy.checkText(cannotApplyPage.actions.eligibility(), expectedEligibility);

    cannotApplyPage.actions.eligibilityLink().should('have.attr', 'href', CONTENT_STRINGS.ACTIONS.ELIGIBILITY.LINK.HREF);

    const expectedBroker = `${CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.LINK.TEXT} ${CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.TEXT}`;
    cy.checkText(cannotApplyPage.actions.approvedBroker(), expectedBroker);

    cannotApplyPage.actions.approvedBrokerLink().should('have.attr', 'href', CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.LINK.HREF);
  });

  describe('when clicking `eligibility` link', () => {
    it('redirects to guidance page - eligibility section', () => {
      cannotApplyPage.actions.eligibilityLink().should('have.attr', 'href', CONTENT_STRINGS.ACTIONS.ELIGIBILITY.LINK.HREF);
    });
  });
});
