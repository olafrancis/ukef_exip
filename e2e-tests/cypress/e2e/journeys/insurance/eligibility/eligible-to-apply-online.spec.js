import {
  heading, submitButton,
} from '../../../pages/shared';
import { insurance } from '../../../pages';
import partials from '../../../partials';
import {
  ORGANISATION,
  LINKS,
  PAGES,
} from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE;

const insuranceStartRoute = ROUTES.INSURANCE.START;

context('Insurance - Eligibility - You are eligible to apply online page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction', () => {
  before(() => {
    cy.visit(ROUTES.INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAnswersHappyPath();

    const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE}`;

    cy.url().should('eq', expected);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 100,
      seo: 70,
    });
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().click();

    const expectedUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER}`;

    cy.url().should('include', expectedUrl);

    // go back to page
    cy.visit(ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', insuranceStartRoute);
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

  it('renders inset text', () => {
    insurance.eligibility.eligibleToApplyOnlinePage.insetText().should('exist');

    insurance.eligibility.eligibleToApplyOnlinePage.insetText().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.INSET);
    });
  });

  it('renders body text', () => {
    insurance.eligibility.eligibleToApplyOnlinePage.body().should('exist');

    insurance.eligibility.eligibleToApplyOnlinePage.body().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.BODY);
    });
  });

  it('renders a submit button', () => {
    submitButton().should('exist');

    submitButton().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.SUBMIT_BUTTON);
    });
  });

  describe('form submission', () => {
    it(`should redirect to ${ROUTES.INSURANCE.ROOT}/[referenceNumber]${ROUTES.INSURANCE.ALL_SECTIONS}`, () => {
      submitButton().click();

      cy.url().then((url) => {
        const splitUrl = url.split('/');
        const applicationId = splitUrl[4];

        const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${applicationId}${ROUTES.INSURANCE.ALL_SECTIONS}`;
        cy.url().should('eq', expected);
      });
    });
  });
});
