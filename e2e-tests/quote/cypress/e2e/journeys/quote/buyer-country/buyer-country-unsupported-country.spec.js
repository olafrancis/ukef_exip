import {
  backLink, countryInput, cannotApplyPage, submitButton,
} from '../../../../../../pages/shared';
import { PAGES, LINKS } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import { COUNTRY_UNSUPPORTRED } from '../../../../../../fixtures/countries';

const CONTENT_STRINGS = PAGES.CANNOT_APPLY;

const {
  QUOTE: { BUYER_COUNTRY, CANNOT_APPLY },
} = ROUTES;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const baseUrl = Cypress.config('baseUrl');

context('Buyer country page - as an exporter, I want to check if UKEF issue credit insurance cover for where my buyer is based - submit unsupported country', () => {
  const url = `${baseUrl}${BUYER_COUNTRY}`;

  before(() => {
    cy.navigateToUrl(url);
    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    cy.keyboardInput(countryInput.field(FIELD_ID).input(), COUNTRY_UNSUPPORTRED.name);

    const results = countryInput.field(FIELD_ID).results();
    results.first().click();

    submitButton().click();
  });

  it('redirects to `cannot obtain cover` exit page', () => {
    const expectedUrl = `${baseUrl}${CANNOT_APPLY}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders a back link with correct url', () => {
    cy.checkLink(
      backLink(),
      BUYER_COUNTRY,
      LINKS.BACK,
    );
  });

  it('renders a specific reason', () => {
    const { REASON } = CONTENT_STRINGS;
    const expected = `${REASON.INTRO} ${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${COUNTRY_UNSUPPORTRED.name}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;
    cy.checkText(cannotApplyPage.reason(), expected);
  });

  it('should prepopulate the field when going back to the page via back link', () => {
    cy.clickBackLink();

    const expectedValue = COUNTRY_UNSUPPORTRED.name;

    cy.checkValue(countryInput.field(FIELD_ID), expectedValue);

    cy.checkText(countryInput.field(FIELD_ID).results(), expectedValue);
  });
});
