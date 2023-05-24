import { EMAIL_TEMPLATE_IDS } from '../constants';
import fileSystem from '../file-system';
import notify from '../integrations/notify';
import { EmailResponse, ApplicationSubmissionEmailVariables, InsuranceFeedbackVariables } from '../types';
import dotenv from 'dotenv';
import formatDate from '../helpers/format-date';
import mapFeedbackSatisfaction from '../helpers/map-feedback-satisfaction';

dotenv.config();

/**
 * callNotify
 * Call Notify API
 * @param {String} Notify template ID
 * @param {String} Email address
 * @param {String} First name
 * @param {Object} Email variables
 * @returns {Object} Object with success flag and emailRecipient
 */
export const callNotify = async (templateId: string, emailAddress: string, variables: object, file?: Buffer, fileIsCsv?: boolean): Promise<EmailResponse> => {
  try {
    let emailResponse;

    if (file && fileIsCsv) {
      emailResponse = await notify.sendEmail(templateId, emailAddress, variables, file, fileIsCsv);
    } else {
      emailResponse = await notify.sendEmail(templateId, emailAddress, variables);
    }

    if (emailResponse.success) {
      return emailResponse;
    }

    throw new Error(`Sending email ${emailResponse}`);
  } catch (err) {
    console.error(err);

    throw new Error(`Sending email ${err}`);
  }
};

/**
 * confirmEmailAddress
 * Send "confirm your email address" email to an account
 * @param {String} Email address
 * @param {String} First name
 * @param {String} Verification hash
 * @returns {Object} callNotify response
 */
const confirmEmailAddress = async (emailAddress: string, urlOrigin: string, name: string, verificationHash: string): Promise<EmailResponse> => {
  try {
    console.info('Sending confirm email address email');

    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL;

    const variables = { urlOrigin, name, confirmToken: verificationHash };

    const response = await callNotify(templateId, emailAddress, variables);

    return response;
  } catch (err) {
    console.error(err);

    throw new Error(`Sending confirm email address email ${err}`);
  }
};

/**
 * securityCodeEmail
 * Send the security code email to an account
 * @param {String} Email address
 * @param {String} First name
 * @param {String} Security code
 * @returns {Object} callNotify response
 */
const securityCodeEmail = async (emailAddress: string, name: string, securityCode: string): Promise<EmailResponse> => {
  try {
    console.info('Sending security code email for account sign in');

    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.SECURITY_CODE;

    const variables = { name, securityCode };

    const response = await callNotify(templateId, emailAddress, variables);

    return response;
  } catch (err) {
    console.error(err);

    throw new Error(`Sending security code email for account sign in ${err}`);
  }
};

/**
 * passwordResetLink
 * Send "reset your password" email to an account
 * @param {String} Email address
 * @param {String} First name
 * @param {String} Password reet token
 * @returns {Object} callNotify response
 */
const passwordResetLink = async (urlOrigin: string, emailAddress: string, name: string, passwordResetHash: string): Promise<EmailResponse> => {
  try {
    console.info('Sending email for account password reset');

    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.PASSWORD_RESET;

    const variables = { urlOrigin, name, passwordResetToken: passwordResetHash };

    const response = await callNotify(templateId, emailAddress, variables);

    return response;
  } catch (err) {
    console.error(err);

    throw new Error(`Sending email for account password reset ${err}`);
  }
};

const application = {
  /**
   * application.submittedEmail
   * Send "application submitted" email to an account
   * @param {Object} ApplicationSubmissionEmailVariables
   * @returns {Object} callNotify response
   */
  submittedEmail: async (variables: ApplicationSubmissionEmailVariables): Promise<EmailResponse> => {
    try {
      console.info('Sending application submitted email to application owner or provided business contact');

      const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.CONFIRMATION;

      const { emailAddress } = variables;

      const response = await callNotify(templateId, emailAddress, variables);

      return response;
    } catch (err) {
      console.error(err);

      throw new Error(`Sending application submitted email to to application owner or provided business contact ${err}`);
    }
  },
  /**
   * application.underwritingTeam
   * Read CSV file, generate a file buffer
   * Send "application submitted" email to the underwriting team with a link to CSV
   * We send a file buffer to Notify and Notify generates a unique URL that is then rendered in the email.
   * @param {Object} ApplicationSubmissionEmailVariables
   * @returns {Object} callNotify response
   */
  underwritingTeam: async (variables: ApplicationSubmissionEmailVariables, csvPath: string, templateId: string): Promise<EmailResponse> => {
    try {
      console.info('Sending application submitted email to underwriting team');

      const emailAddress = String(process.env.UNDERWRITING_TEAM_EMAIL);

      // NOTE: no need to handle any file system errors here.
      // if something errors, it will fall into the catch handler below.
      const file = await fileSystem.readFile(csvPath);

      if (file) {
        const fileIsCsv = true;

        const fileBuffer = Buffer.from(file);

        const response = await callNotify(templateId, emailAddress, variables, fileBuffer, fileIsCsv);

        // NOTE: no need to handle an error from fs.unlink here,
        // if it errors, it will go into the catch handler below.
        await fileSystem.unlink(csvPath);

        return response;
      }

      throw new Error('Sending application submitted email to underwriting team - invalid file / file not found');
    } catch (err) {
      console.error(err);

      throw new Error(`Sending application submitted email to underwriting team ${err}`);
    }
  },
};

/**
 * documentsEmail
 * Send "we need some documents from you" email to an account
 * @param {Object} ApplicationSubmissionEmailVariables
 * @param {Boolean} Flag for sending anto-bribery/trading history template
 * @returns {Object} callNotify response
 */
const documentsEmail = async (variables: ApplicationSubmissionEmailVariables, templateId: string): Promise<EmailResponse> => {
  try {
    console.info('Sending documents email');

    const { emailAddress } = variables;

    const response = await callNotify(templateId, emailAddress, variables);

    return response;
  } catch (err) {
    console.error(err);

    throw new Error(`Sending documents email ${err}`);
  }
};

/**
 * insuranceFeedbackEmail
 * sends email for insurance feedback
 * @param {InsuranceFeedbackVariables} variables
 * @returns {Object} callNotify response
 */
const insuranceFeedbackEmail = async (variables: InsuranceFeedbackVariables): Promise<EmailResponse> => {
  try {
    console.info('Sending insurance feedback email');

    const templateId = EMAIL_TEMPLATE_IDS.FEEDBACK.INSURANCE;

    const emailAddress = process.env.FEEDBACK_EMAIL_RECIPIENT as string;

    const emailVariables = variables;
    // blank variables for date and time (used if createdAt is not populated)
    emailVariables.time = '';
    emailVariables.date = '';

    // formats the createdAt timestamp into date and time for email template
    if (variables.createdAt) {
      emailVariables.date = formatDate(variables.createdAt);
      emailVariables.time = formatDate(variables.createdAt, 'HH:mm:ss');
    }

    // if satisfaction variable exists, then map to formatted email field
    if (variables.satisfaction) {
      emailVariables.satisfaction = mapFeedbackSatisfaction(variables.satisfaction);
    }

    const response = await callNotify(templateId, emailAddress, emailVariables);

    return response;
  } catch (err) {
    console.error(err);

    throw new Error(`Sending insurance feedback email ${err}`);
  }
};

const sendEmail = {
  confirmEmailAddress,
  securityCodeEmail,
  passwordResetLink,
  application,
  documentsEmail,
  insuranceFeedbackEmail,
};

export default sendEmail;
