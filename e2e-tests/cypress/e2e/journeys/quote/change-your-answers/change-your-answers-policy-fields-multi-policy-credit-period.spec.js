import { backLink, submitButton } from '../../../pages/shared';
import {
  tellUsAboutYourPolicyPage,
  checkYourAnswersPage,
} from '../../../pages/quote';
import { FIELD_IDS, ROUTES } from '../../../../../constants';

const { ELIGIBILITY: { CREDIT_PERIOD } } = FIELD_IDS;

context('Change your answers (policy credit period field) - as an exporter, I want to change the details before submitting the proposal', () => {
  const url = ROUTES.QUOTE.CHECK_YOUR_ANSWERS;

  before(() => {
    cy.login();
    cy.submitQuoteAnswersHappyPathMultiplePolicy();
    cy.url().should('include', url);
  });

  let row = checkYourAnswersPage.summaryLists.policy[CREDIT_PERIOD];

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    row.changeLink().click();
  });

  it(`clicking 'change' redirects to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}`, () => {
    const expectedUrl = ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE;
    cy.url().should('include', expectedUrl);
  });

  it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
    const expected = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CREDIT_PERIOD}-label`;
    cy.url().should('include', expected);
  });

  it('renders a back link with correct url', () => {
    backLink().should('exist');

    const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`;
    backLink().should('have.attr', 'href', expected);
  });

  it('has originally submitted answer', () => {
    const firstOption = tellUsAboutYourPolicyPage[CREDIT_PERIOD].inputOption().eq(0);
    firstOption.should('have.attr', 'selected', 'selected');

    const secondOption = tellUsAboutYourPolicyPage[CREDIT_PERIOD].inputOption().eq(1);
    secondOption.should('not.have.attr', 'selected');
  });

  it(`redirects to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
    tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().select('2');

    submitButton().click();

    cy.url().should('include', ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
  });

  it('renders the new answer in `Check your answers` page', () => {
    submitButton().click();

    row = checkYourAnswersPage.summaryLists.policy[CREDIT_PERIOD];

    const expected = '2 months';
    cy.checkText(row.value(), expected);
  });
});
