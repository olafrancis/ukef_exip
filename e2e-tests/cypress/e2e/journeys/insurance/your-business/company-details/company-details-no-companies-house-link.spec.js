import { companyDetails } from '../../../../pages/your-business';
import { insurance } from '../../../../pages';
import partials from '../../../../partials';
import {
  cannotApplyPage,
} from '../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';

const CONTENT_STRINGS = PAGES.INSURANCE.APPLY_OFFLINE;
const { ACTIONS } = CONTENT_STRINGS;

const {
  ROOT,
  APPLY_OFFLINE,
  EXPORTER_BUSINESS: {
    COMPANY_DETAILS,
    NO_COMPANIES_HOUSE_NUMBER,
  },
} = ROUTES.INSURANCE;

context('Insurance - Your business - Company details page - As an Exporter it should take me to the apply offline page if I do not have a companies house number', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      const url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${COMPANY_DETAILS}`;

      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it(`should redirect to ${APPLY_OFFLINE} page when pressing the no companies house number link`, () => {
    companyDetails.companiesHouseNoNumber().should('have.attr', 'href', `${ROOT}/${referenceNumber}${NO_COMPANIES_HOUSE_NUMBER}`);
    companyDetails.companiesHouseNoNumber().click();

    cy.url().should('eq', `${Cypress.config('baseUrl')}${APPLY_OFFLINE}`);
  });

  it(`should contain "${CONTENT_STRINGS.REASON.NO_COMPANIES_HOUSE_NUMBER}" message on apply offline page`, () => {
    const expected = `${CONTENT_STRINGS.REASON.INTRO} ${CONTENT_STRINGS.REASON.NO_COMPANIES_HOUSE_NUMBER}`;

    cy.checkText(cannotApplyPage.reason(), expected);
  });

  it('should contain link to proposal form on the apply offline page', () => {
    insurance.applyOfflinePage.downloadFormLink().should('have.attr', 'href', ACTIONS.DOWNLOAD_FORM.LINK.HREF_PROPOSAL);
  });

  it('should take you back to company-details page when pressing the back button', () => {
    partials.backLink().click();

    cy.url().should('eq', `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${COMPANY_DETAILS}`);
  });
});
