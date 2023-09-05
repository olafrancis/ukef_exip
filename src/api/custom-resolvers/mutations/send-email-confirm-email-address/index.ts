import confirmEmailAddressEmail from '../../../helpers/send-email-confirm-email-address';
import { Context, SendExporterEmailVariables } from '../../../types';

/**
 * sendEmailConfirmEmailAddress
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the SendEmailConfirmEmailAddress mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag / result of sendEmailConfirmEmailAddress
 */
const sendEmailConfirmEmailAddressMutation = async (root: any, variables: SendExporterEmailVariables, context: Context) => {
  try {
    const emailResponse = await confirmEmailAddressEmail.send(context, variables.urlOrigin, variables.accountId);

    if (emailResponse.success) {
      return emailResponse;
    }

    throw new Error(`Sending email verification for account creation (sendEmailConfirmEmailAddress mutation) ${emailResponse}`);
  } catch (err) {
    console.error('Error sending email verification for account creation (sendEmailConfirmEmailAddress mutation) %O', err);
    throw new Error(`Sending email verification for account creation (sendEmailConfirmEmailAddress mutation) ${err}`);
  }
};

export default sendEmailConfirmEmailAddressMutation;
