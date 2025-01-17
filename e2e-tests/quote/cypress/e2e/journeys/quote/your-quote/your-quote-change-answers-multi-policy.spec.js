import {
  backLink, countryInput, field, submitButton, summaryList,
} from '../../../../../../pages/shared';
import { FIELD_IDS, ROUTES } from '../../../../../../constants';
import { LINKS } from '../../../../../../content-strings';

const {
  ELIGIBILITY: {
    MAX_AMOUNT_OWED,
    PERCENTAGE_OF_COVER,
    BUYER_COUNTRY,
  },
  QUOTE,
} = FIELD_IDS;

const {
  QUOTE: {
    YOUR_QUOTE,
    TELL_US_ABOUT_YOUR_POLICY_CHANGE,
    CHECK_YOUR_ANSWERS,
    BUYER_COUNTRY_CHANGE,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Your quote page - change answers (policy type and length from multiple to single) - as an exporter, I want to get an Credit insurance quote', () => {
  const url = `${baseUrl}${YOUR_QUOTE}`;

  before(() => {
    cy.login();

    cy.submitQuoteAnswersHappyPathMultiplePolicy();
    submitButton().click();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe('change `max amount owed`', () => {
    const row = summaryList.field(MAX_AMOUNT_OWED);

    beforeEach(() => {
      cy.navigateToUrl(url);

      row.changeLink().click();
    });

    it(`clicking 'change' redirects to ${TELL_US_ABOUT_YOUR_POLICY_CHANGE} with a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change`, () => {
      const expectedUrl = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${MAX_AMOUNT_OWED}-label`;

      cy.assertUrl(expectedUrl);
    });

    it('renders a back link with correct url', () => {
      cy.checkLink(
        backLink(),
        url,
        LINKS.BACK,
      );
    });

    it(`redirects to ${CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      cy.keyboardInput(field(MAX_AMOUNT_OWED).input(), '200');

      submitButton().click();

      const expectedUrl = `${baseUrl}${CHECK_YOUR_ANSWERS}#${MAX_AMOUNT_OWED}-label`;

      cy.assertUrl(expectedUrl);
    });

    it('renders the new answer in the quote', () => {
      // form submit
      submitButton().click();

      // submit check your answers
      submitButton().click();

      const expected = '£200';
      cy.checkText(row.value(), expected);
    });
  });

  describe('change `percentage of cover`', () => {
    const row = summaryList.field(PERCENTAGE_OF_COVER);

    beforeEach(() => {
      cy.navigateToUrl(url);

      row.changeLink().click();
    });

    it(`clicking 'change' redirects to ${TELL_US_ABOUT_YOUR_POLICY_CHANGE} with a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change`, () => {
      const expectedUrl = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`;

      cy.assertUrl(expectedUrl);
    });

    it('renders a back link with correct url', () => {
      cy.checkLink(
        backLink(),
        url,
        LINKS.BACK,
      );
    });

    it(`redirects to ${CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      field(PERCENTAGE_OF_COVER).input().select('95');
      submitButton().click();

      const expectedUrl = `${baseUrl}${CHECK_YOUR_ANSWERS}#${PERCENTAGE_OF_COVER}-label`;

      cy.assertUrl(expectedUrl);
    });

    it('renders the new answer in the quote', () => {
      // form submit
      submitButton().click();

      // submit check your answers
      submitButton().click();

      const expected = '95%';
      cy.checkText(row.value(), expected);
    });
  });

  describe('change `buyer location`', () => {
    const row = summaryList.field(QUOTE.BUYER_LOCATION);

    beforeEach(() => {
      cy.navigateToUrl(url);

      row.changeLink().click();
    });

    it(`clicking 'change' redirects to ${BUYER_COUNTRY_CHANGE} with a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change`, () => {
      const expectedUrl = `${baseUrl}${BUYER_COUNTRY_CHANGE}#heading`;

      cy.assertUrl(expectedUrl);
    });

    it('renders a back link with correct url', () => {
      cy.checkLink(
        backLink(),
        url,
        LINKS.BACK,
      );
    });

    it(`redirects to ${CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      cy.keyboardInput(countryInput.field(BUYER_COUNTRY).input(), 'Brazil');
      const results = countryInput.field(BUYER_COUNTRY).results();
      results.first().click();

      submitButton().click();

      const expectedUrl = `${baseUrl}${CHECK_YOUR_ANSWERS}#heading`;

      cy.assertUrl(expectedUrl);
    });

    it('renders the new answers in the quote', () => {
      cy.keyboardInput(countryInput.field(BUYER_COUNTRY).input(), 'Brazil');
      const results = countryInput.field(BUYER_COUNTRY).results();
      results.first().click();

      // form submit
      submitButton().click();

      // submit check your answers
      submitButton().click();

      const expectedUrl = `${url}#heading`;

      cy.assertUrl(expectedUrl);

      const buyerLocation = summaryList.field(QUOTE.BUYER_LOCATION);

      cy.checkText(buyerLocation.value(), 'Brazil');
    });
  });
});
