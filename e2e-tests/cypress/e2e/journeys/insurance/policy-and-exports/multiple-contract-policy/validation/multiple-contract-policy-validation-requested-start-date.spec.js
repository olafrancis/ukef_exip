import partials from '../../../../../partials';
import { FIELD_VALUES, ROUTES } from '../../../../../../../constants';
import requestedCoverStartDate from '../../../../../../support/insurance/requested-start-date-field';

const { taskList } = partials.insurancePartials;

const { checkValidation } = requestedCoverStartDate;

const { INSURANCE } = ROUTES;

context('Insurance - Policy and exports - Multiple contract policy page - form validation - requested start date', () => {
  before(() => {
    cy.completeSignInAndGoToApplication().then((referenceNumber) => {
      taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`;

      cy.url().should('eq', expectedUrl);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  after(() => {
    cy.deleteAccount();
  });

  describe('when day is not provided', () => {
    it('should render a validation error', () => {
      checkValidation.day.notProvided();
    });
  });

  describe('when month is not provided', () => {
    it('should render a validation error', () => {
      checkValidation.month.notProvided();
    });
  });

  describe('when year is not provided', () => {
    it('should render a validation error', () => {
      checkValidation.year.notProvided();
    });
  });

  describe('when day is not a number', () => {
    it('should render a validation error', () => {
      checkValidation.day.notANumber();
    });
  });

  describe('when month is not a number', () => {
    it('should render a validation error', () => {
      checkValidation.month.notANumber();
    });
  });

  describe('when year is not a number', () => {
    it('should render a validation error', () => {
      checkValidation.year.notANumber();
    });
  });

  describe('when the date is not in the future', () => {
    it('should render a validation error', () => {
      checkValidation.notInTheFuture();
    });
  });

  describe('when the date has an invalid format', () => {
    it('should render a validation error', () => {
      checkValidation.notInTheFuture();
    });
  });

  describe('when the date is today', () => {
    it('should NOT render a validation error', () => {
      checkValidation.isToday();
    });
  });
});
