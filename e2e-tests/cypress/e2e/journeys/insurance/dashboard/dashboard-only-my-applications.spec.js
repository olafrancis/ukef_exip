import dashboardPage from '../../../pages/insurance/dashboard';
import { backLink } from '../../../pages/shared';
import { ROUTES } from '../../../../../constants';

const { table } = dashboardPage;

const { DASHBOARD } = ROUTES.INSURANCE;

const firstAccountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');
const secondAccountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_2');

const accountEmails = [firstAccountEmail, secondAccountEmail];

context("Insurance - Dashboard - As an Exporter, I want to access only my UKEF export insurance application from my dashboard, So that I do not have access to another exporter's application", () => {
  let referenceNumbers;

  let firstReferenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumbers = [refNumber];

      firstReferenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${DASHBOARD}`;

      // TODO: EMS-1268 - when the authenticated header has been built, update this to click on the dashboard link.
      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    referenceNumbers.forEach((refNumber) => {
      cy.deleteApplication(refNumber);
    });

    accountEmails.forEach((email) => {
      cy.deleteAccount(email);
    });
  });

  it('should have only one application', () => {
    table.body.rows().should('have.length', 1);
  });

  it('should have the correct reference number', () => {
    cy.checkText(table.body.firstRow.referenceNumber(), firstReferenceNumber);
  });

  describe('when a different exporter logs in and creates an application', () => {
    let secondReferenceNumber;

    before(() => {
      // sign out / clear the user session.

      // TODO: EMS-1268 - when the authenticated header has been built, update this to click on the sign out link.
      cy.clearCookies();
      Cypress.session.clearCurrentSessionData();

      cy.completeSignInAndGoToApplication(secondAccountEmail).then((refNumber) => {
        referenceNumbers = [...referenceNumbers, refNumber];

        secondReferenceNumber = refNumber;

        // go back to the dashboard
        backLink().click();
      });
    });

    describe('when visiting the dashboard', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(url);
      });

      it('should have only one application', () => {
        table.body.rows().should('have.length', 1);
      });

      it('should NOT have a reference number that equals the first application/reference number, created by a different exporter', () => {
        table.body.firstRow.referenceNumber().invoke('text').then((refNumber) => {
          expect(refNumber.trim()).to.not.equal(firstReferenceNumber);
        });
      });

      it('should have the correct reference number', () => {
        cy.checkText(table.body.firstRow.referenceNumber(), secondReferenceNumber);
      });
    });
  });
});