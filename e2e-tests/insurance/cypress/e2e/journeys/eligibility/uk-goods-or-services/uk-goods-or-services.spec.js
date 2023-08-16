import {
  yesNoRadioHint, yesRadio, yesRadioInput, noRadio, inlineErrorMessage, submitButton,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import {
  FIELDS,
  PAGES,
  ERROR_MESSAGES,
} from '../../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import { completeStartForm, completeCheckIfEligibleForm, completeExporterLocationForm } from '../../../../../../commands/insurance/eligibility/forms';
import {
  checkCalculateDescriptionSummaryText,
  checkCalculateDescriptionSummaryClickRevealsContent,
  checkCalculateDescriptionDescriptionContent,
} from '../../../../../../commands/check-uk-goods-and-services-calculate-description';
import {
  checkDescriptionSummaryText,
  checkDescriptionSummaryClickRevealsContent,
  checkDescriptionContent,
} from '../../../../../../commands/check-uk-goods-and-services-description';

const CONTENT_STRINGS = PAGES.UK_GOODS_OR_SERVICES;

const {
  ELIGIBILITY: { HAS_MINIMUM_UK_GOODS_OR_SERVICES },
} = FIELD_IDS;

const {
  START,
  ELIGIBILITY: { UK_GOODS_OR_SERVICES, EXPORTER_LOCATION, INSURED_AMOUNT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - UK goods or services page - as an exporter, I want to check if my export value is eligible for UKEF export insurance cover', () => {
  const url = `${baseUrl}${UK_GOODS_OR_SERVICES}`;

  before(() => {
    cy.navigateToUrl(START);

    completeStartForm();
    completeCheckIfEligibleForm();
    completeAndSubmitBuyerCountryForm();
    completeExporterLocationForm();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: UK_GOODS_OR_SERVICES,
      backLink: EXPORTER_LOCATION,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders `yes` radio button', () => {
      cy.checkText(yesRadio(), FIELD_VALUES.YES);

      cy.checkText(yesNoRadioHint(), FIELDS[HAS_MINIMUM_UK_GOODS_OR_SERVICES].HINT);

      cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    it('renders `no` radio button', () => {
      cy.checkText(noRadio(), FIELD_VALUES.NO);

      cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    describe('expandable details - how to calculate percentage', () => {
      it('renders summary text', () => {
        checkCalculateDescriptionSummaryText();
      });

      it('clicking summary text reveals details', () => {
        checkCalculateDescriptionSummaryClickRevealsContent();
      });

      it('renders expanded content', () => {
        checkCalculateDescriptionDescriptionContent();
      });
    });

    describe('expandable details - what counts as UK goods and services', () => {
      it('renders summary text', () => {
        checkDescriptionSummaryText();
      });

      it('clicking summary text reveals details', () => {
        checkDescriptionSummaryClickRevealsContent();
      });

      it('renders expanded content', () => {
        checkDescriptionContent();
      });

      it('does NOT render `will calculate thoroughly` copy ', () => {
        partials.ukGoodsOrServicesDescription.calculateThoroughly().should('not.exist');
      });
    });
  });

  describe('when submitting an empty form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render validation errors', () => {
      submitButton().click();

      partials.errorSummaryListItems().should('exist');
      partials.errorSummaryListItems().should('have.length', 1);

      const expectedMessage = String(ERROR_MESSAGES.ELIGIBILITY[HAS_MINIMUM_UK_GOODS_OR_SERVICES].IS_EMPTY);

      cy.checkText(partials.errorSummaryListItems(), expectedMessage);

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

    it(`should redirect to ${INSURED_AMOUNT}`, () => {
      const expectedUrl = `${baseUrl}${INSURED_AMOUNT}`;

      cy.assertUrl(expectedUrl);
    });

    describe('when going back to the page', () => {
      it('should have the originally submitted answer selected', () => {
        cy.clickBackLink();

        yesRadioInput().should('be.checked');
      });
    });
  });
});