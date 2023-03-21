import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT,
  ACCOUNT: { CREATE: { YOUR_DETAILS } },
  ALL_SECTIONS,
  DASHBOARD,
} = ROUTES;

context('Insurance - Account - Create - Your details page - Already signed in', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  it(`should redirect to ${DASHBOARD} when visiting ${YOUR_DETAILS}`, () => {
    cy.navigateToUrl(YOUR_DETAILS);

    const expectedUrl = `${Cypress.config('baseUrl')}${DASHBOARD}`;

    cy.url().should('eq', expectedUrl);
  });
});
