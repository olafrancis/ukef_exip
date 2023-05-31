import { Context } from '.keystone/types'; // eslint-disable-line
import { isWithinInterval } from 'date-fns';
import { ACCOUNT } from '../../constants';
import getAuthenticationRetriesByAccountId from '../get-authentication-retries-by-account-id';

const { MAX_PASSWORD_RESET_TRIES, MAX_PASSWORD_RESET_TRIES_TIMEFRAME } = ACCOUNT;

/**
 * shouldBlockAccount
 * Check an accounts authentication retries
 * If there are total of MAX_PASSWORD_RESET_TRIES in less than MAX_PASSWORD_RESET_TRIES_TIMEFRAME,
 * Return a flag indicating that the account should be blocked.
 * @param {Object} KeystoneJS context API
 * @param {String} Account ID
 * @returns {Boolean}
 */
const shouldBlockAccount = async (context: Context, accountId: string): Promise<boolean> => {
  console.info(`Checking account ${accountId} authentication retries`);

  try {
    /**
     * Get retries associated with the provided account ID
     */
    const retries = await getAuthenticationRetriesByAccountId(context, accountId);

    const now = new Date();

    /**
     * Check if the retries breach the threshold:
     * - total of MAX_PASSWORD_RESET_TRIES in less than MAX_PASSWORD_RESET_TRIES_TIMEFRAME
     */
    const retriesInTimeframe = [] as Array<string>;

    retries.forEach((retry) => {
      const retryDate = new Date(retry.createdAt);

      const isWithinLast24Hours = isWithinInterval(retryDate, {
        start: MAX_PASSWORD_RESET_TRIES_TIMEFRAME,
        end: now,
      });

      if (isWithinLast24Hours) {
        retriesInTimeframe.push(retry.id);
      }
    });

    if (retriesInTimeframe.length >= MAX_PASSWORD_RESET_TRIES) {
      console.info(`Account ${accountId} authentication retries exceeds the threshold`);

      return true;
    }

    return false;
  } catch (err) {
    console.error(err);

    throw new Error(`Checking account authentication retries  ${err}`);
  }
};

export default shouldBlockAccount;