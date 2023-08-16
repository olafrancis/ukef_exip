import {
  yesRadio, yesRadioInput, noRadio, noRadioInput, inlineErrorMessage, submitButton,
} from '../../../../../../pages/shared';
import { insurance } from '../../../../../../pages';
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
} from '../../../../../../commands/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED;

context('Insurance - Other parties page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction if there are other parties involved in the export', () => {
  let url;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    completeStartForm();
    completeCheckIfEligibleForm();
    completeAndSubmitBuyerCountryForm();
    completeExporterLocationForm();
    completeUkGoodsAndServicesForm();
    completeInsuredAmountForm();
    completeInsuredPeriodForm();

    url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED}`;

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED,
      backLink: ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD,
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

    describe('expandable details', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders summary text', () => {
        insurance.eligibility.otherPartiesPage.description.summary().should('exist');

        cy.checkText(insurance.eligibility.otherPartiesPage.description.summary(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.INTRO);
      });

      it('clicking summary text reveals details', () => {
        insurance.eligibility.otherPartiesPage.description.summary().click();

        insurance.eligibility.otherPartiesPage.description.list.intro().should('be.visible');
      });

      it('renders expanded content', () => {
        cy.checkText(insurance.eligibility.otherPartiesPage.description.list.intro(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST_INTRO);

        cy.checkText(insurance.eligibility.otherPartiesPage.description.list.item1(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[0].TEXT);

        cy.checkText(insurance.eligibility.otherPartiesPage.description.list.item2(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[1].TEXT);

        cy.checkText(insurance.eligibility.otherPartiesPage.description.list.item3(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[2].TEXT);

        cy.checkText(insurance.eligibility.otherPartiesPage.description.list.item4(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[3].TEXT);

        cy.checkText(insurance.eligibility.otherPartiesPage.description.list.item5(), CONTENT_STRINGS.OTHER_PARTIES_DESCRIPTION.LIST[4].TEXT);
      });
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

        const expectedMessage = String(ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_IDS.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED].IS_EMPTY);

        cy.checkText(partials.errorSummaryListItems().first(), expectedMessage);

        cy.checkText(inlineErrorMessage(), `Error: ${expectedMessage}`);
      });

      it('should focus on input when clicking summary error message', () => {
        submitButton().click();

        partials.errorSummaryListItemLinks().eq(0).click();
        yesRadioInput().should('have.focus');
      });
    });

    describe('when submitting the answer as `no`', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        noRadio().click();
        submitButton().click();
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT}`, () => {
        const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT}`;

        cy.assertUrl(expected);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected', () => {
          cy.clickBackLink();

          noRadioInput().should('be.checked');
        });
      });
    });
  });
});