import dotenv from 'dotenv';
// @ts-ignore
import { NotifyClient } from 'notifications-node-client';

dotenv.config();

const notifyKey = process.env.GOV_NOTIFY_API_KEY;
const notifyClient = new NotifyClient(notifyKey);

const notify = {
  sendEmail: async (templateId: string, sendToEmailAddress: string, firstName: string, variables: object) => {
    try {
      console.info('Calling Notify API. templateId: ', templateId);

      await notifyClient.sendEmail(templateId, sendToEmailAddress, {
        personalisation: {
          firstName,
          ...variables,
        },
        reference: null,
      });

      return {
        success: true,
        emailRecipient: sendToEmailAddress,
      };
    } catch (err) {
      throw new Error(`Calling Notify API. Unable to send email ${err}`);
    }
  },
};

export default notify;
