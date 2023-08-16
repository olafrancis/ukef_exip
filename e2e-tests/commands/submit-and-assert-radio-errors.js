import { submitButton, inlineErrorMessage } from '../pages/shared';
import partials from '../partials';

/**
 * @param {String} field
 * @param {Number} errorIndex - index of error in errorSummary
 * @param {Number} errorSummaryLength - the number of expected errors in errorSummary
 * @param {Number} inlineError - the index of radios to find error
 * @param {String} errorMessage
 */
export default (field, errorIndex, errorSummaryLength, errorMessage, inlineErrorIndex = 0) => {
  submitButton().click();

  partials.errorSummaryListItems().should('have.length', errorSummaryLength);

  cy.checkText(
    partials.errorSummaryListItems().eq(errorIndex),
    errorMessage,
  );

  partials.errorSummaryListItemLinks().eq(errorIndex).click();
  field.yesRadioInput().should('have.focus');

  cy.checkText(inlineErrorMessage().eq(inlineErrorIndex), `Error: ${errorMessage}`);
};