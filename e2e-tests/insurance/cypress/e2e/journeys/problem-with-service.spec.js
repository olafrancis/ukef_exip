import { PAGES } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

const CONTENT_STRINGS = PAGES.PROBLEM_WITH_SERVICE_PAGE;

context('Problem with service page - Insurance', () => {
  const url = ROUTES.INSURANCE.PROBLEM_WITH_SERVICE;

  beforeEach(() => {
    cy.navigateToUrl(url);

    cy.assertUrl(`${Cypress.config('baseUrl')}${url}`);

    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.clearCookies();

    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: url,
      assertSubmitButton: false,
      assertAuthenticatedHeader: false,
      assertBackLink: false,
      isInsurancePage: true,
      assertCookies: false,
    });
  });
});
