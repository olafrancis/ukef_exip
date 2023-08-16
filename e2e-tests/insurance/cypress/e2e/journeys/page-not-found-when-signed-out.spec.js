import { PAGES } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

const CONTENT_STRINGS = PAGES.PAGE_NOT_FOUND_PAGE;

context('Insurance - page not found - signed out', () => {
  const invalidUrl = `${ROUTES.INSURANCE.ROOT}/invalid-ref-number${ROUTES.INSURANCE.ALL_SECTIONS}`;

  before(() => {
    cy.navigateToUrl(invalidUrl);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: invalidUrl,
      assertSubmitButton: false,
      assertBackLink: false,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(invalidUrl);
    });

    it('renders `typed` and `pasted` text and contact text and link for insurance contact us', () => {
      cy.checkPageNotFoundPageText({});
    });
  });
});