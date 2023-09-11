import { Context } from '../../types';

/**
 * createAnEligibility
 * Create an eligibility with relationships for:
 * 1) A buyer country
 * 2) An application
 * @param {Object} KeystoneJS context API
 * @param {String} Country ID
 * @param {String} Application ID
 * @param {Object} Optional eligibility data
 * @returns {Object} Created eligibility
 */
const createAnEligibility = async (context: Context, countryId: string, applicationId: string, data?: object) => {
  console.info('Creating an eligibility for ', applicationId);

  try {
    const eligibility = await context.db.Eligibility.createOne({
      data: {
        buyerCountry: {
          connect: { id: countryId },
        },
        application: {
          connect: { id: applicationId },
        },
        ...data,
      },
    });

    return eligibility;
  } catch (err) {
    console.error('Error creating an eligibility %O', err);

    throw new Error(`Creating an eligibility ${err}`);
  }
};

export default createAnEligibility;
