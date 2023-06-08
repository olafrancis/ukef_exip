import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import crypto from 'crypto';
import baseConfig from '../../keystone';
import verifyAccountReactivationToken from './verify-account-reactivation-token';
import createAuthenticationRetryEntry from '../../helpers/create-authentication-retry-entry';
import { ACCOUNT, FIELD_IDS } from '../../constants';
import { mockAccount } from '../../test-mocks';
import { Account, SuccessResponse, VerifyAccountReactivationTokenVariables } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

const {
  ENCRYPTION: {
    STRING_TYPE,
    PBKDF2: { ITERATIONS, DIGEST_ALGORITHM },
    PASSWORD: {
      PBKDF2: { KEY_LENGTH },
    },
  },
} = ACCOUNT;

const {
  INSURANCE: {
    ACCOUNT: { IS_VERIFIED, IS_BLOCKED, REACTIVATION_HASH, REACTIVATION_EXPIRY },
  },
} = FIELD_IDS;

describe('custom-resolvers/verify-account-reactivation-token', () => {
  let account: Account;
  let reactivationHash: string;
  let result: SuccessResponse;

  const variables = {} as VerifyAccountReactivationTokenVariables;

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    // wipe the accounts table so we have a clean slate.
    const accounts = await context.query.Account.findMany();

    await context.query.Account.deleteMany({
      where: accounts,
    });

    // wipe the AuthenticationRetry table so we have a clean slate.
    let retries = await context.query.AuthenticationRetry.findMany();

    await context.query.AuthenticationRetry.deleteMany({
      where: retries,
    });

    /**
     * Create an account that:
     * - is unverified
     * - is blocked
     * - has a reactivation hash and expiry
     */
    reactivationHash = crypto.pbkdf2Sync(mockAccount.email, mockAccount.salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

    const reactivationExpiry = ACCOUNT.REACTIVATION_EXPIRY();

    account = (await context.query.Account.createOne({
      data: {
        ...mockAccount,
        [IS_VERIFIED]: false,
        [IS_BLOCKED]: true,
        reactivationHash,
        reactivationExpiry,
      },
      query: 'id reactivationHash reactivationExpiry isVerified isBlocked',
    })) as Account;

    expect(account.isVerified).toEqual(false);
    expect(account.isBlocked).toEqual(true);

    /**
     * Create an authentication entry
     * so that we can assert it gets removed after reactivation
     */
    await createAuthenticationRetryEntry(context, account.id);

    // get the latest retries to ensure we have a retry entry
    retries = await context.query.AuthenticationRetry.findMany();

    expect(retries.length).toEqual(1);

    variables.token = reactivationHash;

    result = await verifyAccountReactivationToken({}, variables, context);

    // get the latest account
    account = (await context.query.Account.findOne({
      where: { id: account.id },
      query: 'id reactivationHash reactivationExpiry isVerified isBlocked',
    })) as Account;
  });

  test('should return success=true', () => {
    const expected = {
      success: true,
    };

    expect(result).toEqual(expected);
  });

  test(`should update the account to be ${IS_BLOCKED}=false`, () => {
    expect(account[IS_BLOCKED]).toEqual(false);
  });

  test(`should update the account to be ${IS_VERIFIED}=true`, () => {
    expect(account[IS_VERIFIED]).toEqual(true);
  });

  test(`should remove ${REACTIVATION_HASH} from the account`, () => {
    expect(account[REACTIVATION_HASH]).toEqual('');
  });

  test(`should nullify ${REACTIVATION_EXPIRY} from the account`, () => {
    expect(account[REACTIVATION_EXPIRY]).toEqual(null);
  });

  test('should remove all entries for the account in the AuthenticationRetry table', async () => {
    const retries = await context.query.AuthenticationRetry.findMany();

    expect(retries.length).toEqual(0);
  });

  describe(`when the ${REACTIVATION_EXPIRY} has expired`, () => {
    test('it should return success=false and expired=true', async () => {
      const now = new Date();

      const MS_PER_MINUTE = 60000;
      const oneMinuteAgo = new Date(now.getTime() - 1 * MS_PER_MINUTE);

      account = (await context.query.Account.createOne({
        data: {
          ...mockAccount,
          reactivationHash,
          [REACTIVATION_EXPIRY]: oneMinuteAgo,
          [IS_BLOCKED]: true,
        },
      })) as Account;

      result = await verifyAccountReactivationToken({}, variables, context);

      const expected = {
        success: false,
        expired: true,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when no account is found', () => {
    test('it should return success=false', async () => {
      // wipe the table so we have a clean slate.
      const accounts = await context.query.Account.findMany();

      await context.query.Account.deleteMany({
        where: accounts,
      });

      result = await verifyAccountReactivationToken({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });
});
