import {
  yesRadio, yesRadioInput, noRadio, inlineErrorMessage, submitButton,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import {
  completeStartForm,
  completeCheckIfEligibleForm,
  completeExporterLocationForm,
  completeUkGoodsAndServicesForm,
  completeInsuredAmountForm,
  completeInsuredPeriodForm,
  completeOtherPartiesForm,
  completeLetterOfCreditForm,
  completePreCreditPeriodForm,
} from '../../../../../../commands/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER;

const insuranceStartRoute = ROUTES.INSURANCE.START;

context('Insurance - Eligibility - Companies house number page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction if I do not have UK Companies House Registration Number', () => {
  let url;

  before(() => {
    cy.navigateToUrl(insuranceStartRoute);

    completeStartForm();
    completeCheckIfEligibleForm();
    completeAndSubmitBuyerCountryForm();
    completeExporterLocationForm();
    completeUkGoodsAndServicesForm();
    completeInsuredAmountForm();
    completeInsuredPeriodForm();
    completeOtherPartiesForm();
    completeLetterOfCreditForm();
    completePreCreditPeriodForm();

    url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER}`;

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER,
      backLink: ROUTES.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders `yes` radio button', () => {
      yesRadio().should('exist');

      cy.checkText(yesRadio(), FIELD_VALUES.YES);

      cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    it('renders `no` radio button', () => {
      noRadio().should('exist');

      cy.checkText(noRadio(), FIELD_VALUES.NO);

      cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render validation errors', () => {
        submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = String(ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_IDS.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER].IS_EMPTY);

        cy.checkText(partials.errorSummaryListItems().first(), expectedMessage);

        cy.checkText(inlineErrorMessage(), `Error: ${expectedMessage}`);
      });

      it('should focus on input when clicking summary error message', () => {
        submitButton().click();

        partials.errorSummaryListItemLinks().eq(0).click();
        yesRadioInput().should('have.focus');
      });
    });

    describe('when submitting the answer as `yes`', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        yesRadio().click();
        submitButton().click();
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE}`, () => {
        const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE}`;

        cy.assertUrl(expected);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected', () => {
          cy.clickBackLink();

          yesRadioInput().should('be.checked');
        });
      });
    });
  });
});