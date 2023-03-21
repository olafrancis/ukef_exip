import { saveAndBackButton } from '../../../../pages/shared';
import { insurance } from '../../../../pages';
import partials from '../../../../partials';
import { TASKS } from '../../../../../../content-strings';
import { FIELD_IDS, ROUTES } from '../../../../../../constants';

const { taskList } = partials.insurancePartials;
const task = taskList.prepareApplication.tasks.policyTypeAndExports;

const FIELD_ID = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE;
const multiplePolicyField = insurance.policyAndExport.typeOfPolicyPage[FIELD_ID].multiple;

context('Insurance - Policy and exports - Type of policy page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`;
      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  describe('when submitting an empty form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      saveAndBackButton().click();
    });

    it(`should redirect to ${ROUTES.INSURANCE.ALL_SECTIONS}`, () => {
      const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`;

      cy.url().should('eq', expected);
    });

    it('should retain the `type of policy and exports` task status as `not started yet`', () => {
      const expected = TASKS.STATUS.NOT_STARTED_YET;

      cy.checkText(task.status(), expected);
    });
  });

  describe('when selecting an answer and submitting the form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      saveAndBackButton().click();

      task.link().click();

      multiplePolicyField.input().click();
      saveAndBackButton().click();
    });

    it(`should redirect to ${ROUTES.INSURANCE.ALL_SECTIONS}`, () => {
      const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`;

      cy.url().should('eq', expected);
    });

    it('should update the status of task `type of policy and exports`to `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;

      cy.checkText(task.status(), expected);
    });

    describe('when going back to the page', () => {
      it('should have the originally submitted answer selected', () => {
        task.link().click();

        multiplePolicyField.input().should('be.checked');
      });
    });
  });
});
