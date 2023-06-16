import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { DATE_ONE_MINUTE_IN_THE_PAST } from '../../../../../../../constants/dates';
import { PAGES, BUTTONS } from '../../../../../../../content-strings';
import { linkExpiredPage } from '../../../../../pages/insurance/account/suspended';
import { submitButton } from '../../../../../pages/shared';
import api from '../../../../../../support/api';

const {
  ACCOUNT: {
    SUSPENDED: {
      VERIFY_EMAIL,
      VERIFY_EMAIL_LINK_EXPIRED,
    },
  },
} = INSURANCE_ROUTES;

const {
  ACCOUNT: { REACTIVATION_EXPIRY, REACTIVATION_HASH },
} = INSURANCE_FIELD_IDS;

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SUSPENDED.VERIFY_EMAIL_LINK_EXPIRED;

context('Insurance - Account - Suspended - Verify email - Visit with an expired token query param', () => {
  const baseUrl = Cypress.config('baseUrl');
  const verifyEmailUrl = `${baseUrl}${VERIFY_EMAIL}`;
  const verifyEmailLinkExpiredUrl = `${baseUrl}${VERIFY_EMAIL_LINK_EXPIRED}`;

  before(() => {
    cy.createAnAccountAndBecomeBlocked({ startReactivationJourney: true });
  });

  after(() => {
    cy.deleteAccount();
  });

  describe(`when a reactivation token has expired and the user navigates to ${VERIFY_EMAIL} with the expired token`, () => {
    let updatedAccount;

    beforeEach(async () => {
      /**
       * Get the account so that we can use the ID
       * to update the reactivation verification period.
       */
      const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      const accountsResponse = await api.getAccountByEmail(accountEmail);

      const { data } = accountsResponse.body;

      const [firstAccount] = data.accounts;
      const account = firstAccount;

      /**
       * Update the account's reactivation expiry date via the API,
       * so that we can mimic missing the verification period.
       */
      const oneMinuteInThePast = DATE_ONE_MINUTE_IN_THE_PAST();

      const updateObj = {
        [REACTIVATION_EXPIRY]: oneMinuteInThePast,
      };

      updatedAccount = await api.updateAccount(account.id, updateObj);
    });

    it(`should redirect to ${VERIFY_EMAIL_LINK_EXPIRED} and renders page elements`, () => {
      cy.navigateToUrl(`${verifyEmailUrl}?token=${updatedAccount[REACTIVATION_HASH]}`);

      const expectedUrl = `${verifyEmailLinkExpiredUrl}?id=${updatedAccount.id}`;

      cy.assertUrl(expectedUrl);

      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: verifyEmailUrl,
        assertBackLink: false,
        assertAuthenticatedHeader: false,
        submitButtonCopy: BUTTONS.REACTIVATE_ACCOUNT,
      });

      cy.checkText(
        linkExpiredPage.body(),
        CONTENT_STRINGS.BODY,
      );

      cy.checkText(
        submitButton(),
        BUTTONS.REACTIVATE_ACCOUNT,
      );
    });
  });
});
