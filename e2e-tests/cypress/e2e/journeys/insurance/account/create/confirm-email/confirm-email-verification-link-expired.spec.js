import { PAGES } from '../../../../../../../content-strings';
import { verifyEmailLinkExpiredPage } from '../../../../../pages/insurance/account/create';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../support/api';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.VERIFY_EMAIL_LINK_EXPIRED;

const {
  START,
  ACCOUNT: { CREATE: { CONFIRM_EMAIL, VERIFY_EMAIL, VERIFY_EMAIL_LINK_EXPIRED } },
} = ROUTES;

context('Insurance - Account - Create - Confirm email page - expired token - As an Exporter I want to verify my email address, So that I can activate my email address and use it to create a digital service account with UKEF', () => {
  let url;
  let exporter;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    url = `${Cypress.config('baseUrl')}${CONFIRM_EMAIL}`;

    cy.url().should('eq', url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccount();
  });

  describe(`when a verification token has expired and exporter navigates to ${VERIFY_EMAIL} with the expired token`, () => {
    let updatedExporter;

    beforeEach(async () => {
      /**
       * Get the exporter so that we can use the ID
       * to update the verification period.
       */
      const exporterEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      const exportersResponse = await api.getExporterByEmail(exporterEmail);

      const { data } = exportersResponse.body;

      const [firstExporter] = data.exporters;
      exporter = firstExporter;

      /**
       * Update the exporter's verification expiry date via the API,
       * so that we can mimic missing the verification period.
       */
      const today = new Date();
      const lastMonth = new Date(today.setMonth(today.getMonth() - 1));

      const updateObj = {
        verificationExpiry: lastMonth,
      };

      updatedExporter = await api.updateExporter(exporter.id, updateObj);
    });

    it(`should redirect to ${VERIFY_EMAIL_LINK_EXPIRED} and render core page elements and content`, () => {
      const { verificationHash } = updatedExporter;

      cy.navigateToUrl(`${Cypress.config('baseUrl')}${VERIFY_EMAIL}?token=${verificationHash}`);

      const expectedUrl = `${Cypress.config('baseUrl')}${VERIFY_EMAIL_LINK_EXPIRED}?id=${exporter.id}`;

      cy.url().should('eq', expectedUrl);

      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: `${VERIFY_EMAIL}?token=${exporter.verificationHash}`,
        backLink: `${CONFIRM_EMAIL}?id=${exporter.id}`,
        assertSubmitButton: false,
      });

      // assert body content
      cy.checkText(verifyEmailLinkExpiredPage.body(), CONTENT_STRINGS.BODY);

      // assert link to create an account
      cy.checkLink(verifyEmailLinkExpiredPage.createAccount(), CONTENT_STRINGS.CREATE_ACCOUNT.HREF, CONTENT_STRINGS.CREATE_ACCOUNT.TEXT);
    });
  });
});
