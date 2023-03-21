import partials from '../../../../partials';
import { FIELD_IDS, ROUTES } from '../../../../../../constants';
import { natureOfBusiness, checkYourAnswers } from '../../../../pages/your-business';
import { submitButton } from '../../../../pages/shared';

const {
  INSURANCE: {
    EXPORTER_BUSINESS: {
      NATURE_OF_YOUR_BUSINESS: {
        GOODS_OR_SERVICES,
        YEARS_EXPORTING,
        EMPLOYEES_INTERNATIONAL,
        EMPLOYEES_UK,
      },
    },
  },
} = FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    NATURE_OF_BUSINESS_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

const { summaryList } = checkYourAnswers;

context('Insurance - Your business - Change your answers - Nature of your business- As an exporter, I want to change my answers to the nature of your business section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();
      cy.completeAndSubmitBrokerForm();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  describe(GOODS_OR_SERVICES, () => {
    const fieldId = GOODS_OR_SERVICES;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${NATURE_OF_BUSINESS_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, NATURE_OF_BUSINESS_CHANGE, GOODS_OR_SERVICES);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = 'test 12345';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.keyboardInput(natureOfBusiness[fieldId].input(), newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
      });
    });
  });

  describe(YEARS_EXPORTING, () => {
    const fieldId = YEARS_EXPORTING;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${NATURE_OF_BUSINESS_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, NATURE_OF_BUSINESS_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = '25';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.keyboardInput(natureOfBusiness[fieldId].input(), newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
      });
    });
  });

  describe(EMPLOYEES_UK, () => {
    const fieldId = EMPLOYEES_UK;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${NATURE_OF_BUSINESS_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, NATURE_OF_BUSINESS_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = '26';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.keyboardInput(natureOfBusiness[fieldId].input(), newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
      });
    });
  });

  describe(EMPLOYEES_INTERNATIONAL, () => {
    const fieldId = EMPLOYEES_INTERNATIONAL;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${NATURE_OF_BUSINESS_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, NATURE_OF_BUSINESS_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = '35';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.keyboardInput(natureOfBusiness[fieldId].input(), newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
      });
    });
  });
});
