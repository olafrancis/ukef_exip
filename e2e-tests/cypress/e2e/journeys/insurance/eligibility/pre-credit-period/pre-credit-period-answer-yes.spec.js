import { cannotApplyPage, yesRadio, noRadio, submitButton } from '../../../../pages/shared';
import { insurance } from '../../../../pages';
import partials from '../../../../partials';
import { PAGES } from '../../../../../../content-strings';
import CONSTANTS from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../support/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE;
const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Insurance - Eligibility - Pre-credit period page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction that is paid via letter of credit - submit `need pre-credit period cover`', () => {
  before(() => {
    cy.visit(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    completeAndSubmitBuyerCountryForm();

    yesRadio().click();
    submitButton().click();

    yesRadio().click();
    submitButton().click();

    noRadio().click();
    submitButton().click();

    noRadio().click();
    submitButton().click();

    noRadio().click();
    submitButton().click();

    noRadio().click();
    submitButton().click();

    yesRadio().click();
    submitButton().click();
  });

  it('redirects to exit page', () => {
    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE);
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');

    const expectedUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD}`;

    partials.backLink().should('have.attr', 'href', expectedUrl);
  });

  it('renders a specific reason', () => {
    cannotApplyPage.reason().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.REASON.INTRO} ${CONTENT_STRINGS.REASON.NEED_PRE_CREDIT_PERIOD_COVER}`;

      expect(text.trim()).equal(expected);
    });
  });
});
