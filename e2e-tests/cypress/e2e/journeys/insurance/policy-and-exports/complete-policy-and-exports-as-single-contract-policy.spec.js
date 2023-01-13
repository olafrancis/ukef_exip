import partials from '../../../partials';
import { saveAndBackButton } from '../../../pages/shared';
import { TASKS } from '../../../../../content-strings';
import { FIELD_VALUES, ROUTES } from '../../../../../constants';
import getReferenceNumber from '../../../helpers/get-reference-number';
import checkText from '../../../helpers/check-text';

const { taskList } = partials.insurancePartials;

const {
  INSURANCE: {
    START,
    ROOT: INSURANCE_ROOT,
    ALL_SECTIONS,
  },
} = ROUTES;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

context('Insurance - Policy and exports - Complete the entire section as a single contract policy', () => {
  before(() => {
    cy.visit(START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

    cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
    cy.completeAndSubmitSingleContractPolicyForm();
    cy.completeAndSubmitAboutGoodsOrServicesForm();

    // go back to the all sections page
    saveAndBackButton().click();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it(`should change the 'type of policy and exports' task status to 'completed' in the ${ALL_SECTIONS} page`, () => {
    getReferenceNumber().then((referenceNumber) => {
      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', expectedUrl);

      checkText(
        task.status(),
        TASKS.STATUS.COMPLETED,
      );
    });
  });
});
