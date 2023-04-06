import header from '../../partials/header';
import { HEADER } from '../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../constants';
import mockAccount from '../../../fixtures/account';

const {
  INSURANCE: {
    ROOT,
    DASHBOARD,
    ALL_SECTIONS,
    ACCOUNT: { MANAGE_ACCOUNT, SIGN_IN: { ROOT: SIGN_IN_ROOT } },
  },
} = ROUTES;

const {
  INSURANCE: {
    ACCOUNT: { FIRST_NAME, LAST_NAME },
  },
} = FIELD_IDS;

context('Insurance - header - authenticated - As an Exporter, I want the system to have a login service header across every page of the digital service once I am signed in, So that I can easily access the header content anywhere on the application', () => {
  let referenceNumber;
  let allSectionsUrl;

  const dashboardUrl = `${Cypress.config('baseUrl')}${DASHBOARD}`;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      allSectionsUrl = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  describe('`manage account` link', () => {
    beforeEach(() => {
      cy.navigateToUrl(allSectionsUrl);
    });

    const selector = header.navigation.manageAccount;

    it('should render', () => {
      const expectedAccountName = `${mockAccount[FIRST_NAME]} ${mockAccount[LAST_NAME]}`;

      cy.checkLink(selector(), MANAGE_ACCOUNT, expectedAccountName);
    });

    it(`should redirect to ${MANAGE_ACCOUNT} when clicking the link`, () => {
      selector().click();

      const expected = `${Cypress.config('baseUrl')}${MANAGE_ACCOUNT}`;

      cy.url().should('eq', expected);
    });
  });

  describe('`my applications` link', () => {
    beforeEach(() => {
      cy.navigateToUrl(allSectionsUrl);
    });

    const selector = header.navigation.applications;

    it('should render', () => {
      cy.checkLink(selector(), DASHBOARD, HEADER.APPLICATIONS.TEXT);
    });

    it(`should redirect to ${DASHBOARD} when clicking the link`, () => {
      selector().click();

      cy.url().should('eq', dashboardUrl);
    });
  });

  describe('`sign out` link', () => {
    beforeEach(() => {
      cy.navigateToUrl(allSectionsUrl);
    });

    const selector = header.navigation.signOut;

    it('should render', () => {
      cy.checkLink(selector(), SIGN_IN_ROOT, HEADER.SIGN_OUT.TEXT);
    });

    it(`should redirect to ${DASHBOARD} when clicking the link as the user is already logged in`, () => {
      selector().click();

      cy.url().should('eq', dashboardUrl);
    });
  });
});