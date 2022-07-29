import {
  policyTypePage,
  checkYourAnswersPage,
  tellUsAboutYourPolicyPage,
} from '../../pages';
import partials from '../../partials';
import CONSTANTS from '../../../../constants';

const {
  FIELD_IDS,
  FIELD_VALUES,
  ROUTES,
} = CONSTANTS;

const {
  CREDIT_PERIOD,
  MULTI_POLICY_LENGTH,
  MULTI_POLICY_TYPE,
  POLICY_LENGTH,
  POLICY_TYPE,
  SINGLE_POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
} = FIELD_IDS;

const submissionData = {
  [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
  [POLICY_LENGTH]: '3',
};

context('Change your answers after checking answers - Policy type and length', () => {
  let row;

  before(() => {
    cy.login();
    cy.submitAnswersHappyPathSinglePolicy();
    cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_TYPE];
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it(`clicking 'change' redirects to ${ROUTES.POLICY_TYPE_CHANGE}`, () => {
    row.changeLink().click();

    const expectedUrl = ROUTES.POLICY_TYPE_CHANGE;
    cy.url().should('include', expectedUrl);
  });

  it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
    const expected = `${ROUTES.POLICY_TYPE_CHANGE}#heading`;
    cy.url().should('include', expected);
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');

    const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
    partials.backLink().should('have.attr', 'href', expected);
  });

  it('has originally submitted `policy type` (single)', () => {
    policyTypePage[POLICY_TYPE].single.input().should('be.checked');
  });

  it(`has originally submitted 'policy length' (${submissionData[POLICY_LENGTH]})`, () => {
    policyTypePage[SINGLE_POLICY_LENGTH].input().should('have.attr', 'value', submissionData[POLICY_LENGTH]);
  });

  it(`redirects to ${ROUTES.TELL_US_ABOUT_YOUR_POLICY} when submitting new answers`, () => {
    policyTypePage[POLICY_TYPE].multi.input().click();
    policyTypePage[MULTI_POLICY_LENGTH].input().type('8');
    policyTypePage.submitButton().click();

    cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_POLICY);
  });

  it('renders the new answers in `Check your answers` page (multi, 8 months)', () => {
    // credit period field is now required because it's a multi policy
    tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().type('1');
    tellUsAboutYourPolicyPage.submitButton().click();

    row = checkYourAnswersPage.summaryLists.policy[MULTI_POLICY_TYPE];

    row.value().invoke('text').then((text) => {
      const expected = FIELD_VALUES.POLICY_TYPE.MULTI;

      expect(text.trim()).equal(expected);
    });

    row = checkYourAnswersPage.summaryLists.policy[MULTI_POLICY_LENGTH];

    row.value().invoke('text').then((text) => {
      const expected = '8 months';

      expect(text.trim()).equal(expected);
    });
  });

  describe('change `Policy type` and `Policy length` for a second time (multi 8 months to single 5 months)', () => {
    before(() => {
      row = checkYourAnswersPage.summaryLists.policy[MULTI_POLICY_TYPE];

      row.changeLink().click();

      const expectedUrl = ROUTES.POLICY_TYPE_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.POLICY_TYPE_CHANGE}#heading`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('has previously submitted `policy type` (multi)', () => {
      policyTypePage[POLICY_TYPE].multi.input().should('be.checked');
    });

    it('has previously submitted `policy length` (8 months)', () => {
      policyTypePage[MULTI_POLICY_LENGTH].input().should('have.attr', 'value', '8');
    });

    it(`redirects to ${ROUTES.TELL_US_ABOUT_YOUR_POLICY} when submitting new answers`, () => {
      policyTypePage[POLICY_TYPE].single.input().click();
      policyTypePage[SINGLE_POLICY_LENGTH].input().clear().type('5');
      policyTypePage.submitButton().click();

      cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_POLICY);
    });

    it('renders the new answers in `Check your answers` page (single policy, 5 months)', () => {
      tellUsAboutYourPolicyPage.submitButton().click();

      row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_TYPE];

      row.value().invoke('text').then((text) => {
        const expected = FIELD_VALUES.POLICY_TYPE.SINGLE;

        expect(text.trim()).equal(expected);
      });

      row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_LENGTH];

      row.value().invoke('text').then((text) => {
        const expected = '5 months';

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('change `Policy type` and `Policy length` for a third time (single 5 months to multi 1 month)', () => {
    before(() => {
      row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_TYPE];

      row.changeLink().click();

      const expectedUrl = ROUTES.POLICY_TYPE_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.POLICY_TYPE_CHANGE}#heading`;
      cy.url().should('include', expected);
    });

    it('has previously submitted `policy type` (single)', () => {
      policyTypePage[POLICY_TYPE].single.input().should('be.checked');
    });

    it('has previously submitted `policy length` (5 months)', () => {
      policyTypePage[SINGLE_POLICY_LENGTH].input().should('have.attr', 'value', '5');
    });

    it(`redirects to ${ROUTES.TELL_US_ABOUT_YOUR_POLICY} when submitting new answers`, () => {
      policyTypePage[POLICY_TYPE].multi.input().click();
      policyTypePage[MULTI_POLICY_LENGTH].input().clear().type('1');
      policyTypePage.submitButton().click();

      cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_POLICY);
    });

    it('should have wiped previously submitted credit period field', () => {
      tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().should('not.have.attr', 'value');
    });
  });

  describe('change only `Policy length` (single policy type, 1 month to 7 months)', () => {
    before(() => {
      tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().type('2');
      tellUsAboutYourPolicyPage.submitButton().click();

      row = checkYourAnswersPage.summaryLists.policy[MULTI_POLICY_LENGTH];
      row.changeLink().click();

      const expectedUrl = ROUTES.POLICY_TYPE_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.POLICY_TYPE_CHANGE}#${MULTI_POLICY_LENGTH}-label`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it(`redirects to ${ROUTES.TELL_US_ABOUT_YOUR_POLICY} when submitting new answers`, () => {
      policyTypePage[POLICY_TYPE].single.input().click();
      policyTypePage[SINGLE_POLICY_LENGTH].input().clear().type('7');
      policyTypePage.submitButton().click();

      cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_POLICY);
    });

    it('renders the new answer in `Check your answers` page (single policy, 7 months)', () => {
      tellUsAboutYourPolicyPage.submitButton().click();

      row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_LENGTH];

      row.value().invoke('text').then((text) => {
        const expected = '7 months';

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('change only `Policy length` (multi policy type, 3 months to 6 months)', () => {
    before(() => {
      // change back to single policy
      row = checkYourAnswersPage.summaryLists.policy[SINGLE_POLICY_TYPE];
      row.changeLink().click();

      policyTypePage[POLICY_TYPE].multi.input().click();
      policyTypePage[MULTI_POLICY_LENGTH].input().type('3');
      policyTypePage.submitButton().click();
      cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_POLICY);

      // credit period field is now required because it's a multi policy
      tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().clear().type('1');
      tellUsAboutYourPolicyPage.submitButton().click();
      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);

      // click `change` (policy length)
      row = checkYourAnswersPage.summaryLists.policy[MULTI_POLICY_LENGTH];
      row.changeLink().click();

      cy.url().should('include', `${ROUTES.POLICY_TYPE_CHANGE}#${MULTI_POLICY_LENGTH}`);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.POLICY_TYPE_CHANGE}#${MULTI_POLICY_LENGTH}-label`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it(`redirects to ${ROUTES.TELL_US_ABOUT_YOUR_POLICY} when submitting new answers`, () => {
      policyTypePage[MULTI_POLICY_LENGTH].input().clear().type('6');
      policyTypePage.submitButton().click();

      cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_POLICY);
    });

    it('renders the new answer in `Check your answers` page (multi policy, 6 months)', () => {
      // credit period field is now required because it's a multi policy
      tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().clear().type('1');
      tellUsAboutYourPolicyPage.submitButton().click();

      row = checkYourAnswersPage.summaryLists.policy[MULTI_POLICY_LENGTH];

      row.value().invoke('text').then((text) => {
        const expected = '6 months';

        expect(text.trim()).equal(expected);
      });
    });
  });
});
