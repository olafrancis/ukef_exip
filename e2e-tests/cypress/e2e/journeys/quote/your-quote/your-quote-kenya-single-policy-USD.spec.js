import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
} from '../../../../support/quote/forms';
import { buyerCountryPage, submitButton, summaryList } from '../../../pages/shared';
import {
  policyTypePage,
  tellUsAboutYourPolicyPage,
} from '../../../pages/quote';
import { ROUTES, FIELD_IDS } from '../../../../../constants';
import { USD_CURRENCY_CODE } from '../../../../fixtures/currencies';

const {
  ELIGIBILITY: {
    CONTRACT_VALUE,
    CURRENCY,
    PERCENTAGE_OF_COVER,
  },
  POLICY_TYPE,
  QUOTE,
  SINGLE_POLICY_LENGTH,
} = FIELD_IDS;

context('Get a quote/your quote page (single policy, Kenya, USD) - as an exporter, I want to get an Export insurance quote', () => {
  before(() => {
    cy.login();

    cy.keyboardInput(buyerCountryPage.input(), 'Kenya');
    const results = buyerCountryPage.results();
    results.first().click();
    submitButton().click();

    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();
    completeAndSubmitUkContentForm();

    policyTypePage[POLICY_TYPE].single.input().click();
    cy.keyboardInput(policyTypePage[SINGLE_POLICY_LENGTH].input(), '18');

    submitButton().click();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('should get a quote with a large contract value and render in the correct format', () => {
    cy.keyboardInput(tellUsAboutYourPolicyPage[CONTRACT_VALUE].input(), '100,000');
    tellUsAboutYourPolicyPage[CURRENCY].input().select(USD_CURRENCY_CODE);
    tellUsAboutYourPolicyPage[PERCENTAGE_OF_COVER].input().select('80');

    submitButton().click();

    cy.url().should('include', ROUTES.QUOTE.CHECK_YOUR_ANSWERS);

    // Check contract value formatting in the answers page
    const answersAmount = summaryList.field(CONTRACT_VALUE).value();

    const expectedAmount = '$100,000';
    cy.checkText(answersAmount, expectedAmount);

    submitButton().click();

    // Check contract value formatting in the quote
    const expectedValue = '$80,000.00';
    cy.checkText(summaryList.field(QUOTE.INSURED_FOR).value(), expectedValue);

    // Check estimated cost in the quote
    const expectedCost = '$5,090.00';
    cy.checkText(summaryList.field(QUOTE.ESTIMATED_COST).value(), expectedCost);
  });
});
