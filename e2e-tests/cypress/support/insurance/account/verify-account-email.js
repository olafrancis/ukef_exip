import { INSURANCE_ROUTES as ROUTES } from '../../../../constants/routes/insurance';

const {
  ACCOUNT: { CREATE: { VERIFY_EMAIL }, SIGN_IN },
} = ROUTES;

const exporterEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT');

/**
 * verifyAccountEmail
 * Get the exporter (with verification hash) directly from the API,
 * Mimic "cliking email verification link" in an email inbox by manually navigating to the URL
 */
const verifyAccountEmail = () => {
  try {
    // get exporter
    cy.getExporterByEmail(exporterEmail).then((response) => {
      const { data } = response.body;

      const [firstExporter] = data.exporters;

      const { verificationHash } = firstExporter;

      // mimic "clicking email verification link"
      cy.navigateToUrl(`${Cypress.config('baseUrl')}${VERIFY_EMAIL}?token=${verificationHash}`);

      // User should be verified and therefore redirected to the "sign in" page.
      const expected = `${Cypress.config('baseUrl')}${SIGN_IN.ROOT}`;

      cy.url().should('eq', expected);
    });
  } catch (err) {
    console.error(err);

    throw new Error('Verifying exporter account email');
  }
};

export default verifyAccountEmail;