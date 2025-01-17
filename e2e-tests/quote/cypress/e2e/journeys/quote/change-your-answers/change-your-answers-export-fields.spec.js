import {
  backLink, countryInput, yesRadioInput, submitButton, summaryList,
} from '../../../../../../pages/shared';
import { LINKS } from '../../../../../../content-strings';
import { FIELD_IDS, ROUTES } from '../../../../../../constants';

const {
  ELIGIBILITY: {
    BUYER_COUNTRY,
    VALID_EXPORTER_LOCATION,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  },
} = FIELD_IDS;

const submissionData = {
  [BUYER_COUNTRY]: 'Algeria',
  [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: true,
};

const {
  QUOTE: {
    CHECK_YOUR_ANSWERS,
    BUYER_COUNTRY_CHANGE,
    EXPORTER_LOCATION_CHANGE,
    UK_GOODS_OR_SERVICES_CHANGE,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

const checkYourAnswersUrl = `${baseUrl}${CHECK_YOUR_ANSWERS}`;
const buyerCountryChangeUrl = `${baseUrl}${BUYER_COUNTRY_CHANGE}`;
const exporterLocationChangeUrl = `${baseUrl}${EXPORTER_LOCATION_CHANGE}`;
const ukGoodsOrServicesChangeUrl = `${baseUrl}${UK_GOODS_OR_SERVICES_CHANGE}`;

context('Change your answers (export fields) - as an exporter, I want to change the details before submitting the proposal', () => {
  const url = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

  before(() => {
    cy.login();
    cy.submitQuoteAnswersHappyPathSinglePolicy();
    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe('change `Buyer based`', () => {
    let row = summaryList.field(BUYER_COUNTRY);

    beforeEach(() => {
      cy.navigateToUrl(url);

      row.changeLink().click();
    });

    it(`clicking 'change' redirects to ${BUYER_COUNTRY_CHANGE} with a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change`, () => {
      const expectedUrl = `${buyerCountryChangeUrl}#heading`;

      cy.assertUrl(expectedUrl);
    });

    it('renders a back link with correct url', () => {
      cy.checkLink(
        backLink(),
        checkYourAnswersUrl,
        LINKS.BACK,
      );
    });

    it('has originally submitted answer selected', () => {
      const expectedValue = submissionData[BUYER_COUNTRY];

      cy.checkText(countryInput.field(BUYER_COUNTRY).results(), expectedValue);
    });

    describe('when submitting a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
        row.changeLink().click();

        cy.keyboardInput(countryInput.field(BUYER_COUNTRY).input(), 'Brazil');
        const results = countryInput.field(BUYER_COUNTRY).results();
        results.first().click();

        submitButton().click();
      });

      it(`redirects to ${CHECK_YOUR_ANSWERS}`, () => {
        const expectedUrl = `${checkYourAnswersUrl}#heading`;

        cy.assertUrl(expectedUrl);
      });

      it('renders the new answer in `Check your answers` page', () => {
        row = summaryList.field(BUYER_COUNTRY);

        const expected = 'Brazil';
        cy.checkText(row.value(), expected);
      });
    });
  });

  describe('change `Company`', () => {
    const row = summaryList.field(VALID_EXPORTER_LOCATION);

    beforeEach(() => {
      cy.navigateToUrl(url);

      row.changeLink().click();
    });

    it(`clicking 'change' redirects to ${EXPORTER_LOCATION_CHANGE} with a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change`, () => {
      const expectedUrl = `${exporterLocationChangeUrl}#heading`;

      cy.assertUrl(expectedUrl);
    });

    it('renders a back link with correct url', () => {
      const expectedHref = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

      cy.checkLink(
        backLink(),
        expectedHref,
        LINKS.BACK,
      );
    });

    it('has originally submitted answer selected', () => {
      yesRadioInput().should('be.checked');
    });

    it(`redirects to ${CHECK_YOUR_ANSWERS} when resubmitting`, () => {
      submitButton().click();

      const expectedUrl = `${checkYourAnswersUrl}#heading`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe('change `UK goods`', () => {
    const row = summaryList.field(HAS_MINIMUM_UK_GOODS_OR_SERVICES);

    beforeEach(() => {
      cy.navigateToUrl(url);

      row.changeLink().click();
    });

    it(`clicking 'change' redirects to ${UK_GOODS_OR_SERVICES_CHANGE} with a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change`, () => {
      const expectedUrl = `${ukGoodsOrServicesChangeUrl}#heading`;
      cy.assertUrl(expectedUrl);
    });

    it('renders a back link with correct url', () => {
      const expectedHref = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

      cy.checkLink(
        backLink(),
        expectedHref,
        LINKS.BACK,
      );
    });

    it('has originally submitted answer', () => {
      yesRadioInput().should('be.checked');
    });

    it(`redirects to ${CHECK_YOUR_ANSWERS} when resubmitting`, () => {
      submitButton().click();

      const expectedUrl = `${checkYourAnswersUrl}#heading`;

      cy.assertUrl(expectedUrl);
    });
  });
});
