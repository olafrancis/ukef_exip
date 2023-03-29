import { Context, Application } from '.keystone/types'; // eslint-disable-line
import { APPLICATION } from '../constants';
import sendEmailApplicationSubmitted from '../emails/send-email-application-submitted';
import { SubmitApplicationVariables, SubmitApplicationResponse } from '../types';

/**
 * submitApplication
 * Submit an application - changes application status and sends emails to the exporter and UKEF underwriting team
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the SubmitApplication mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag
 */
const submitApplication = async (root: any, variables: SubmitApplicationVariables, context: Context): Promise<SubmitApplicationResponse> => {
  try {
    console.info('Submitting application');

    // get the application
    const application = (await context.db.Application.findOne({
      where: { id: variables.applicationId },
    })) as Application;

    if (application) {
      const canSubmit = application.status === APPLICATION.STATUS.DRAFT;

      if (canSubmit) {
        // TODO: check that the application has all required fields/data.

        // change the status and add submission date
        const now = new Date();

        const update = {
          status: APPLICATION.STATUS.SUBMITTED,
          previousStatus: APPLICATION.STATUS.DRAFT,
          submissionDate: now,
        };

        await context.db.Application.updateOne({
          where: { id: application.id },
          data: update,
        });

        const { referenceNumber, exporterId, buyerId } = application;

        await sendEmailApplicationSubmitted(context, exporterId, buyerId, referenceNumber);

        return {
          success: true,
        };
      }

      console.error('Unable to submit application - application already submitted');
    }

    console.error('Unable to submit application - no application found');

    return {
      success: false,
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Submitting application ${err}`);
  }
};

export default submitApplication;