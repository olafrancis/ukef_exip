import partials from '../../../../../../../partials';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { summaryList } from '../../../../../../../pages/shared';
import application from '../../../../../../../fixtures/application';
import account from '../../../../../../../fixtures/account';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: {
    NAME_ON_POLICY_CHECK_AND_CHANGE,
  },
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    NAME_ON_POLICY: { NAME, POSITION },
  },
  ACCOUNT: { FIRST_NAME, LAST_NAME },
} = INSURANCE_FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const { POLICY_CONTACT } = application;

const getFieldVariables = (fieldId, referenceNumber) => ({
  route: NAME_ON_POLICY_CHECK_AND_CHANGE,
  checkYourAnswersRoute: TYPE_OF_POLICY,
  newValueInput: '',
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Policy - Change from different name to same name on policy - Summary List', () => {
  let url;
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
      cy.completePrepareApplicationMultiplePolicyType({ referenceNumber, differentPolicyContact: true });

      task.link().click();

      // To get past "Eligibility" check your answers page
      cy.submitCheckYourAnswersForm();

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(NAME, () => {
    const fieldId = NAME;
    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${NAME_ON_POLICY_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitNameOnPolicyForm({});
      });

      it(`should redirect to ${TYPE_OF_POLICY} and display new answers`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, TYPE_OF_POLICY, fieldId);

        const newName = `${account[FIRST_NAME]} ${account[LAST_NAME]}`;
        const newPosition = POLICY_CONTACT[POSITION];

        cy.assertSummaryListRowValueNew(summaryList, fieldId, newName);
        cy.assertSummaryListRowValueNew(summaryList, POSITION, newPosition);
      });
    });
  });
});
