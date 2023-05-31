import { callNotify } from '../call-notify';
import { ApplicationSubmissionEmailVariables, EmailResponse } from '../../types';

/**
 * documentsEmail
 * Send "we need some documents from you" email to an account
 * @param {Object} ApplicationSubmissionEmailVariables
 * @param {Boolean} Flag for sending anto-bribery/trading history template
 * @returns {Object} callNotify response
 */
export const documentsEmail = async (variables: ApplicationSubmissionEmailVariables, templateId: string): Promise<EmailResponse> => {
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