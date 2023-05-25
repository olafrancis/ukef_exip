import { Context } from '.keystone/types'; // eslint-disable-line
import { isAfter } from 'date-fns';
import { ACCOUNT, FIELD_IDS } from '../../constants';
import getAccountByField from '../../helpers/get-account-by-field';
import confirmEmailAddressEmail from '../../helpers/send-email-confirm-email-address';
import isValidAccountPassword from '../../helpers/is-valid-account-password';
import generateOTPAndUpdateAccount from '../../helpers/generate-otp-and-update-account';
import getFullNameString from '../../helpers/get-full-name-string';
import createAuthenticationRetryEntry from '../../helpers/create-authentication-retry-entry';
import shouldBlockAccount from '../../helpers/should-block-account';
import blockAccount from '../../helpers/block-account';
import sendEmail from '../../emails';
import { Account, AccountSignInVariables, AccountSignInResponse } from '../../types';

const { EMAIL } = ACCOUNT;

/**
 * accountSignIn
 * - Check if the account exists
 * - Check if the account is already blocked
 * - Check if the account needs to be blocked
 * - Get and validate email and password
 * - Generate an OTP, save in the database
 * - Send the user an email with security code
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the AccountSignIn mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag
 */
const accountSignIn = async (root: any, variables: AccountSignInVariables, context: Context): Promise<AccountSignInResponse> => {
  try {
    console.info('Signing in account');

    const { urlOrigin, email, password } = variables;

    // Get the account the email is associated with.
    const accountData = await getAccountByField(context, FIELD_IDS.INSURANCE.ACCOUNT.EMAIL, email);

    if (!accountData) {
      console.info('Unable to validate account - no account found');

      return { success: false };
    }

    const account = accountData as Account;

    const { id: accountId } = account;

    /**
     * Create a new retry entry for the account
     * If this fails, return success=false
     */
    const newRetriesEntry = await createAuthenticationRetryEntry(context, accountId);

    if (!newRetriesEntry.success) {
      return { success: false };
    }

    /**
     * Check if the account should be blocked.
     * If so, update the account and return isBlocked=true
     */
    const needToBlockAccount = await shouldBlockAccount(context, accountId);

    if (needToBlockAccount) {
      const blocked = await blockAccount(context, accountId);

      if (blocked) {
        return {
          success: false,
          isBlocked: true,
          accountId,
        };
      }

      return { success: false };
    }

    /**
     * Account is found and verified. We can therefore:
     * 1) Check if the password is matches what is encrypted in the database.
     * 2) If the password is valid:
     *   - If the account is unverified, but has a valid has/token, send verification email.
     *   - If the account is verified, generate an OTP/security code and send via email.
     * 3) Otherwise, we return a rejection because either:
     *   - The password is invalid.
     *   - The email was not sent.
     */
    if (isValidAccountPassword(password, account.salt, account.hash)) {
      /**
       * Check if the account:
       * 1) Is unverified.
       * 2) Has a verification hash/token.
       * 3) Has a verification hash/token that has not expired.
       *
       * This means that the user has not verified their email address.
       * We can therefore:
       * 1) Reset the account's verification expiry.
       * 2) Re-send the verification link email that was sent during account creation.
       */
      if (!account.isVerified) {
        console.info('Unable to sign in account - account has not been verified yet');

        const now = new Date();

        const verificationHasExpired = isAfter(now, account.verificationExpiry);

        if (account.verificationHash && !verificationHasExpired) {
          console.info('Account has an unexpired verification token - resetting verification expiry');

          const accountUpdate = {
            verificationExpiry: EMAIL.VERIFICATION_EXPIRY(),
          };

          (await context.db.Account.updateOne({
            where: { id: accountId },
            data: accountUpdate,
          })) as Account;

          console.info('Account has an unexpired verification token - sending verification email');

          const emailResponse = await confirmEmailAddressEmail.send(context, urlOrigin, accountId);

          if (emailResponse.success) {
            return {
              success: false,
              resentVerificationEmail: true,
              accountId,
            };
          }

          return { success: false };
        }

        // reject
        console.info('Unable to sign in account - account has not been verified');

        return { success: false };
      }

      // generate OTP and update the account
      const { securityCode } = await generateOTPAndUpdateAccount(context, accountId);

      // send "security code" email.
      const name = getFullNameString(account);

      const emailResponse = await sendEmail.securityCodeEmail(email, name, securityCode);

      if (emailResponse.success) {
        return {
          ...emailResponse,
          accountId,
        };
      }

      return {
        success: false,
      };
    }

    // invalid credentials.
    return { success: false };
  } catch (err) {
    console.error(err);
    throw new Error(`Validating password or sending email for account sign in (accountSignIn mutation) ${err}`);
  }
};

export default accountSignIn;
