import { companiesHouseUnavailablePage } from '../../../../../pages/your-business';
import partials from '../../../../../partials';
import { PAGES } from '../../../../../../../content-strings';
import { ROUTES } from '../../../../../../../constants';

const { ROOT } = ROUTES.INSURANCE;

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.COMPANIES_HOUSE_UNAVAILABLE;

const insuranceStart = ROUTES.INSURANCE.START;

const { NATURE_OF_BUSINESS, COMPANY_DETAILS, COMPANIES_HOUSE_UNAVAILABLE } = ROUTES.INSURANCE.EXPORTER_BUSINESS;

context("Insurance - Your business - Companies house unavailable page - I want to enter my business's Companies House Registration Number (CRN) but companies house API is down", () => {
  let referenceNumber;
  let url;
  let natureOfBusinessUrl;
  let companyDetailsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${COMPANIES_HOUSE_UNAVAILABLE}`;
      natureOfBusinessUrl = `${ROOT}/${referenceNumber}${NATURE_OF_BUSINESS}`;
      companyDetailsUrl = `${ROOT}/${referenceNumber}${COMPANY_DETAILS}`;
      cy.navigateToUrl(url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  after(() => {
    cy.deleteAccount();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${ROOT}/${referenceNumber}${COMPANIES_HOUSE_UNAVAILABLE}`,
      backLink: null,
      assertBackLink: false,
      assertSubmitButton: false,
    });
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', insuranceStart);
  });

  it('should display the correct text on the page', () => {
    cy.checkText(companiesHouseUnavailablePage.reason(), CONTENT_STRINGS.ERROR_REASON);
    cy.checkText(companiesHouseUnavailablePage.tryAgain(), `${CONTENT_STRINGS.TRY_AGAIN_PREFIX} ${CONTENT_STRINGS.TRY_AGAIN}`);
    cy.checkText(companiesHouseUnavailablePage.continue(), `${CONTENT_STRINGS.CONTINUE_PREFIX} ${CONTENT_STRINGS.CONTINUE_LINK} ${CONTENT_STRINGS.CONTINUE_SUFFIX}`);
    cy.checkText(companiesHouseUnavailablePage.information(), CONTENT_STRINGS.INFORMATION);
  });

  it('should have the correct hrefs for the links on the page', () => {
    cy.checkLink(companiesHouseUnavailablePage.tryAgainLink(), companyDetailsUrl, CONTENT_STRINGS.TRY_AGAIN);
    cy.checkLink(companiesHouseUnavailablePage.continueLink(), natureOfBusinessUrl, CONTENT_STRINGS.CONTINUE_LINK);
  });
});