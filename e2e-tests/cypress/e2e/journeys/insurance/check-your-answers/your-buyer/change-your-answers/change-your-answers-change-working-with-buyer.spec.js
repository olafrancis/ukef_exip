import { submitButton, status } from '../../../../../pages/shared';
import partials from '../../../../../partials';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { checkYourAnswersYourBuyer } from '../../../../../pages/insurance/check-your-answers';
import { workingWithBuyerPage } from '../../../../../pages/insurance/your-buyer';
import {
  checkChangeLinkUrl,
  checkChangeAnswerRendered,
} from '../../../../../../support/check-summary-list-field-change';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUYER,
  },
  YOUR_BUYER: {
    WORKING_WITH_BUYER_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  WORKING_WITH_BUYER: {
    CONNECTED_WITH_BUYER,
    TRADED_WITH_BUYER,
  },
} = INSURANCE_FIELD_IDS.YOUR_BUYER;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const { summaryList } = checkYourAnswersYourBuyer;

const getFieldVariables = (fieldId, referenceNumber) => ({
  route: WORKING_WITH_BUYER_CHECK_AND_CHANGE,
  checkYourAnswersRoute: YOUR_BUYER,
  newValueInput: '',
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

context('Insurance - Check your answers - Working with buyer - Your buyer page- Summary list', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType();

      task.link().click();

      // to get past eligibility check your answers page
      submitButton().click();
      // to get past policy and exports check your answers page
      submitButton().click();
      // to get past your business check your answers page
      submitButton().click();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${YOUR_BUYER}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  describe(CONNECTED_WITH_BUYER, () => {
    const fieldId = CONNECTED_WITH_BUYER;
    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${WORKING_WITH_BUYER_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        workingWithBuyerPage[fieldId].noRadioInput().click();

        submitButton().click();
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUYER, fieldId);
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        fieldVariables.newValue = 'No';
        checkChangeAnswerRendered(fieldVariables);

        cy.checkTaskStatusCompleted(status());
      });
    });
  });

  describe(TRADED_WITH_BUYER, () => {
    const fieldId = TRADED_WITH_BUYER;
    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${WORKING_WITH_BUYER_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        workingWithBuyerPage[fieldId].noRadioInput().click();

        submitButton().click();
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUYER, fieldId);
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        fieldVariables.newValue = 'No';
        checkChangeAnswerRendered(fieldVariables);

        cy.checkTaskStatusCompleted(status());
      });
    });
  });
});
