import {
  buyerCountryPage,
  cannotApplyPage,
  submitButton,
} from '../../../pages/shared';
import { LINKS, PAGES } from '../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { completeStartForm, completeCheckIfEligibleForm } from '../../../../support/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.CANNOT_APPLY;

const {
  START,
  ELIGIBILITY: { BUYER_COUNTRY, CANNOT_APPLY },
} = INSURANCE_ROUTES;

const COUNTRY_NAME_UNSUPPORTED = 'France';

const baseUrl = Cypress.config('baseUrl');

context('Insurance Eligibility - Cannot apply exit page', () => {
  beforeEach(() => {
    cy.navigateToUrl(START);

    completeStartForm();
    completeCheckIfEligibleForm();

    cy.keyboardInput(buyerCountryPage.input(), COUNTRY_NAME_UNSUPPORTED);
    const results = buyerCountryPage.results();
    results.first().click();

    submitButton().click();

    const expectedUrl = `${baseUrl}${CANNOT_APPLY}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: CANNOT_APPLY,
      backLink: BUYER_COUNTRY,
      assertSubmitButton: false,
      assertAuthenticatedHeader: false,
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

    cy.checkLink(
      cannotApplyPage.actions.eligibilityLink(),
      CONTENT_STRINGS.ACTIONS.ELIGIBILITY.LINK.HREF,
      CONTENT_STRINGS.ACTIONS.ELIGIBILITY.LINK.TEXT,
    );

    const expectedBroker = `${CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.LINK.TEXT} ${CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.TEXT}`;
    cy.checkText(cannotApplyPage.actions.approvedBroker(), expectedBroker);

    cy.checkLink(
      cannotApplyPage.actions.approvedBrokerLink(),
      CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.LINK.HREF,
      CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.LINK.TEXT,
    );
  });

  describe('when clicking `eligibility` link', () => {
    it(`redirects to ${LINKS.EXTERNAL.GUIDANCE}`, () => {
      cannotApplyPage.actions.eligibilityLink().click();

      cy.url().should('eq', LINKS.EXTERNAL.GUIDANCE);
    });
  });
});
