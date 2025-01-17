import { body, submitButton } from '../../../../../../pages/shared';
import { insurance } from '../../../../../../pages';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE;

const {
  START,
  ELIGIBILITY: {
    ELIGIBLE_TO_APPLY_ONLINE,
    CHECK_YOUR_ANSWERS,
    HAVE_AN_ACCOUNT,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - You are eligible to apply online page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction', () => {
  let url;

  before(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();

    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({});
    cy.completeEligibilityCompanyDetailsForm();
    completeAndSubmitBuyerCountryForm();
    cy.completeAndSubmitTotalValueInsuredForm({});
    cy.completeCoverPeriodForm({});
    cy.completeUkGoodsAndServicesForm();
    cy.completeEndBuyerForm();
    cy.submitCheckYourAnswers();

    url = `${baseUrl}${ELIGIBLE_TO_APPLY_ONLINE}`;

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ELIGIBLE_TO_APPLY_ONLINE,
      backLink: CHECK_YOUR_ANSWERS,
      submitButtonCopy: CONTENT_STRINGS.SUBMIT_BUTTON,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders inset text', () => {
      insurance.eligibility.eligibleToApplyOnlinePage.insetText().should('exist');

      cy.checkText(insurance.eligibility.eligibleToApplyOnlinePage.insetText(), CONTENT_STRINGS.INSET);
    });

    it('renders body text', () => {
      cy.checkText(body(), CONTENT_STRINGS.BODY);
    });

    describe('form submission', () => {
      it(`should redirect to ${HAVE_AN_ACCOUNT}`, () => {
        submitButton().click();

        const expectedUrl = `${baseUrl}${HAVE_AN_ACCOUNT}`;

        cy.assertUrl(expectedUrl);
      });
    });
  });
});
