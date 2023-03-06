import {
  backLink, cannotApplyPage, noRadio, submitButton,
} from '../../../pages/shared';
import { PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import { completeAndSubmitBuyerBodyForm } from '../../../../support/quote/forms';

const CONTENT_STRINGS = PAGES.QUOTE.CANNOT_APPLY;

context('Exporter location page - as an exporter, I want to check if my company can get UKEF issue export insurance cover - submit `not based inside the UK`', () => {
  before(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();

    cy.url().should('include', ROUTES.QUOTE.EXPORTER_LOCATION);

    noRadio().click();
    submitButton().click();
  });

  it('redirects to exit page', () => {
    cy.url().should('include', ROUTES.QUOTE.CANNOT_APPLY);
  });

  it('renders a back link with correct url', () => {
    backLink().should('exist');

    backLink().should('have.attr', 'href', ROUTES.QUOTE.EXPORTER_LOCATION);
  });

  it('renders a specific reason', () => {
    const expected = `${CONTENT_STRINGS.REASON.INTRO} ${CONTENT_STRINGS.REASON.UNSUPPORTED_COMPANY_COUNTRY}`;
    cy.checkText(cannotApplyPage.reason(), expected);
  });
});
