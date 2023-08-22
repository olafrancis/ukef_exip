import {
  countryInput, heading, submitButton,
} from '../pages/shared';
import partials from '../partials';
import {
  BUTTONS, ERROR_MESSAGES, FIELDS, ORGANISATION, PAGES,
} from '../content-strings';
import { FIELD_IDS } from '../constants';

const {
  ELIGIBILITY: { BUYER_COUNTRY: FIELD_ID },
} = FIELD_IDS;

const CONTENT_STRINGS = PAGES.BUYER_COUNTRY;

const checkPageTitleAndHeading = () => {
  const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
  cy.title().should('eq', expectedPageTitle);

  cy.checkText(heading(), CONTENT_STRINGS.PAGE_TITLE);
};

const checkInputHint = () => {
  cy.checkText(countryInput.field(FIELD_ID).hint(), FIELDS[FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY].HINT);
};

const checkSubmitButton = () => {
  submitButton().should('exist');

  cy.checkText(submitButton(), BUTTONS.CONTINUE);
};

const checkValidationErrors = () => {
  const expectedErrorsCount = 1;

  cy.submitAndAssertFieldErrors(
    countryInput.field(FIELD_ID),
    null,
    0,
    expectedErrorsCount,
    ERROR_MESSAGES.ELIGIBILITY[FIELD_ID],
  );
};

const checkFocusOnInputWhenClickingSummaryErrorMessage = () => {
  // autocomplete component does not have a focused attribute, instead it has a class.
  // this is added with client side JS.
  // we have to wait to ensure that client side js has been executed.
  cy.wait(8000); // eslint-disable-line cypress/no-unnecessary-waiting

  partials.errorSummaryListItemLinks().eq(0).click();

  countryInput.field(FIELD_ID).input().should('have.class', 'autocomplete__input--focused');
};

export {
  checkPageTitleAndHeading,
  checkInputHint,
  checkSubmitButton,
  checkValidationErrors,
  checkFocusOnInputWhenClickingSummaryErrorMessage,
};
