import partials from '../../../partials';
import { saveAndBackButton } from '../../../pages/shared';
import { TASKS } from '../../../../../content-strings';
import { FIELD_VALUES, ROUTES } from '../../../../../constants';

const { taskList } = partials.insurancePartials;

const {
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    ALL_SECTIONS,
  },
} = ROUTES;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

context('Insurance - Policy and exports - Complete the entire section as a single contract policy', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitAboutGoodsOrServicesForm();

      // go back to the all sections page
      saveAndBackButton().click();
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should change the 'type of policy and exports' task status to 'completed' in the ${ALL_SECTIONS} page`, () => {
    const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

    cy.url().should('eq', expectedUrl);

    cy.checkText(
      task.status(),
      TASKS.STATUS.COMPLETED,
    );
  });
});
