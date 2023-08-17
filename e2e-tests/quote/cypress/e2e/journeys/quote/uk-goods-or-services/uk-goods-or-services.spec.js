import {
  yesRadio, yesRadioInput, noRadio, inlineErrorMessage, submitButton,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import { completeAndSubmitBuyerBodyForm, completeAndSubmitExporterLocationForm } from '../../../../../../commands/quote/forms';
import { checkDescriptionSummaryText, checkDescriptionSummaryClickRevealsContent, checkDescriptionContent } from '../../../../../../commands/check-uk-goods-and-services-description';

const CONTENT_STRINGS = {
  ...PAGES.UK_GOODS_OR_SERVICES,
  ...PAGES.QUOTE.UK_GOODS_OR_SERVICES,
};

const {
  ELIGIBILITY: { HAS_MINIMUM_UK_GOODS_OR_SERVICES },
} = FIELD_IDS;

const {
  QUOTE: {
    UK_GOODS_OR_SERVICES,
    EXPORTER_LOCATION,
    POLICY_TYPE,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('UK goods or services page - as an exporter, I want to check if my export value is eligible for UKEF export insurance cover', () => {
  const url = `${baseUrl}${UK_GOODS_OR_SERVICES}`;

  before(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();

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
      isInsurancePage: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders `yes` radio button', () => {
      cy.checkText(yesRadio(), FIELD_VALUES.YES);

      cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    it('renders `no` radio button', () => {
      cy.checkText(noRadio(), FIELD_VALUES.NO);

      cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    describe('expandable details', () => {
      it('renders summary text', () => {
        checkDescriptionSummaryText();
      });

      it('clicking summary text reveals details', () => {
        checkDescriptionSummaryClickRevealsContent();
      });

      it('renders expanded content', () => {
        checkDescriptionContent();
      });

      it('renders `will calculate thoroughly` copy ', () => {
        const expected = CONTENT_STRINGS.WILL_CALCULATE_THOROUGHLY;
        cy.checkText(partials.ukGoodsOrServicesDescription.calculateThoroughly(), expected);
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

        cy.checkErrorSummaryListHeading();

        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = String(ERROR_MESSAGES.ELIGIBILITY[HAS_MINIMUM_UK_GOODS_OR_SERVICES].IS_EMPTY);

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
      it(`should redirect to ${POLICY_TYPE}`, () => {
        cy.navigateToUrl(url);

        yesRadio().click();
        submitButton().click();

        const expectedUrl = `${baseUrl}${POLICY_TYPE}`;

        cy.assertUrl(expectedUrl);
      });
    });
  });
});
