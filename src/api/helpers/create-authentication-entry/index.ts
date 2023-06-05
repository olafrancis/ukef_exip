import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * createAuthenticationEntry
 * Create an entry in the Authentication table
 * @param {Object} KeystoneJS context API
 * @param {String} Account ID
 * @returns {Boolean}
 */
const createAuthenticationEntry = async (context: Context, entry: object) => {
  console.info('Creating authentication entry');

  try {
    const result = await context.db.Authentication.createOne({
      data: {
        ...entry,
        createdAt: new Date(),
      },
    });

    return result;
  } catch (err) {
    console.error(err);

    throw new Error(`Creating authentication entry ${err}`);
  }
};

export default createAuthenticationEntry;
