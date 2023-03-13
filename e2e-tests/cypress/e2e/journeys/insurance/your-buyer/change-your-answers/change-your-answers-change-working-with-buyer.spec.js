import partials from '../../../../partials';
import { FIELD_IDS, ROUTES } from '../../../../../../constants';
import { workingWithBuyerPage, checkYourAnswersPage } from '../../../../pages/insurance/your-buyer';
import { submitButton } from '../../../../pages/shared';

const {
  INSURANCE: {
    YOUR_BUYER: {
      WORKING_WITH_BUYER: {
        CONNECTED_WITH_BUYER,
        TRADED_WITH_BUYER,
      },
    },
  },
} = FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: {
    WORKING_WITH_BUYER_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.buyer;

const { summaryList } = checkYourAnswersPage;

context('Insurance - Your buyer - Change your answers - Company or organisation - As an exporter, I want to change my answers to the company or organisation section', () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyOrOrganisationForm();
      cy.completeAndSubmitWorkingWithBuyerForm();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccount();
  });

  describe(CONNECTED_WITH_BUYER, () => {
    const fieldId = CONNECTED_WITH_BUYER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${WORKING_WITH_BUYER_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, WORKING_WITH_BUYER_CHANGE, CONNECTED_WITH_BUYER);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        workingWithBuyerPage[fieldId].noRadioInput().click();

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, 'No');
      });
    });
  });

  describe(TRADED_WITH_BUYER, () => {
    const fieldId = TRADED_WITH_BUYER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${WORKING_WITH_BUYER_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, WORKING_WITH_BUYER_CHANGE, TRADED_WITH_BUYER);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        workingWithBuyerPage[fieldId].noRadioInput().click();

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, 'No');
      });
    });
  });
});
