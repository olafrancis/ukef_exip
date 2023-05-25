import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import accountPasswordReset from './account-password-reset';
import createAuthenticationEntry from '../../helpers/create-authentication-entry';
import createAuthenticationRetryEntry from '../../helpers/create-authentication-retry-entry';
import baseConfig from '../../keystone';
import { ACCOUNT } from '../../constants';
import { mockAccount } from '../../test-mocks';
import { Account, AccountPasswordResetVariables, ApplicationRelationship, SuccessResponse } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

const { ENCRYPTION } = ACCOUNT;

const {
  RANDOM_BYTES_SIZE,
  PASSWORD: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;

describe('custom-resolvers/account-password-reset', () => {
  let account: Account;
  let result: SuccessResponse;
  let variables: AccountPasswordResetVariables;
  let authRetries;

  beforeEach(async () => {
    // wipe the accounts table so we have a clean slate.
    const accounts = await context.query.Account.findMany();

    await context.query.Account.deleteMany({
      where: accounts,
    });

    // wipe the AuthenticationRetry table so we have a clean slate.
    authRetries = (await context.query.AuthenticationRetry.findMany()) as Array<ApplicationRelationship>;

    await context.query.AuthenticationRetry.deleteMany({
      where: authRetries,
    });

    // wipe the Authentication table so we have a clean slate.
    let authEntries = await context.query.Authentication.findMany();

    await context.query.Authentication.deleteMany({
      where: authEntries,
    });

    authEntries = await context.query.Authentication.findMany();

    expect(authEntries.length).toEqual(0);

    // create an account
    account = (await context.query.Account.createOne({
      data: mockAccount,
      query: 'id',
    })) as Account;

    // create an AuthenticationRetry so we can assert it becomes wiped.
    await createAuthenticationRetryEntry(context, account.id);

    // get the latest AuthenticationRetry entries
    authRetries = (await context.query.AuthenticationRetry.findMany()) as Array<ApplicationRelationship>;

    expect(authRetries.length).toEqual(1);

    variables = {
      token: String(mockAccount.passwordResetHash),
      password: `${process.env.MOCK_ACCOUNT_PASSWORD}-modified`,
    };

    result = await accountPasswordReset({}, variables, context);

    account = (await context.query.Account.findOne({
      where: { id: account.id },
      query: 'id salt hash passwordResetHash passwordResetExpiry',
    })) as Account;
  });

  afterAll(async () => {
    jest.resetAllMocks();

    const entries = await context.query.Authentication.findMany();

    await context.query.Authentication.deleteMany({
      where: entries,
    });
  });

  test('it should return success=true', () => {
    const expected = {
      success: true,
    };

    expect(result).toEqual(expected);
  });

  test(`it should wipe the account's retry entires`, async () => {
    // get the latest retries
    authRetries = (await context.query.AuthenticationRetry.findMany()) as Array<ApplicationRelationship>;

    expect(authRetries.length).toEqual(0);
  });

  test('it should add an authentication entry', async () => {
    const entries = await context.query.Authentication.findMany();

    expect(entries.length).toEqual(1);
  });

  test("it should update the account's salt and hash", async () => {
    // get the latest account
    account = (await context.query.Account.findOne({
      where: { id: account.id },
      query: 'id salt hash passwordResetHash passwordResetExpiry',
    })) as Account;

    expect(account.salt).toBeDefined();
    expect(account.salt.length).toEqual(RANDOM_BYTES_SIZE * 2);
    expect(account.salt).not.toEqual(mockAccount.salt);

    expect(account.hash).toBeDefined();
    expect(account.hash.length).toEqual(KEY_LENGTH * 2);
    expect(account.hash).not.toEqual(mockAccount.hash);
  });

  test("it should nullify the account's password reset hash and expiry", async () => {
    expect(account.passwordResetHash).toEqual('');
    expect(account.passwordResetExpiry).toEqual(null);
  });

  describe('when the account is blocked', () => {
    test('it should return success=false', async () => {
      account = (await context.query.Account.updateOne({
        where: { id: account.id },
        data: {
          isBlocked: true,
        },
      })) as Account;

      result = await accountPasswordReset({}, variables, context);

      const expected = {
        success: false,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the account does not have a password reset expiry', () => {
    test('it should return success=false', async () => {
      account = (await context.query.Account.updateOne({
        where: { id: account.id },
        data: {
          isBlocked: false,
          passwordResetHash: mockAccount.passwordResetHash,
          passwordResetExpiry: null,
        },
      })) as Account;

      result = await accountPasswordReset({}, variables, context);

      const expected = {
        success: false,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the account does not have a password reset hash', () => {
    test('it should return success=false', async () => {
      account = (await context.query.Account.updateOne({
        where: { id: account.id },
        data: {
          passwordResetHash: '',
        },
      })) as Account;

      result = await accountPasswordReset({}, variables, context);

      const expected = {
        success: false,
      };

      expect(result).toEqual(expected);
    });
  });

  describe("when the account's password reset expiry is in the past", () => {
    beforeEach(async () => {
      const now = new Date();

      const milliseconds = 300000;
      const oneMinuteAgo = new Date(now.setMilliseconds(-milliseconds)).toISOString();

      account = (await context.query.Account.updateOne({
        where: { id: account.id },
        data: {
          passwordResetHash: mockAccount.passwordResetHash,
          passwordResetExpiry: oneMinuteAgo,
        },
      })) as Account;
    });

    test('it should return success=false with expired=true', async () => {
      result = await accountPasswordReset({}, variables, context);

      const expected = {
        success: false,
        expired: true,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the provided password matches the existing account password', () => {
    test('it should return success=false and hasBeenUsedBefore=true', async () => {
      // update the account to have default test password (MOCK_ACCOUNT_PASSWORD)

      await context.query.Account.updateOne({
        where: { id: account.id },
        data: mockAccount,
      });

      // change the variables to have the same password
      variables.password = String(process.env.MOCK_ACCOUNT_PASSWORD);

      result = await accountPasswordReset({}, variables, context);

      const expected = {
        success: false,
        hasBeenUsedBefore: true,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the provided password has been used before', () => {
    test('it should return success=false and hasBeenUsedBefore=true', async () => {
      // create an account
      account = (await context.query.Account.createOne({
        data: mockAccount,
        query: 'id',
      })) as Account;

      const authEntry = {
        account: {
          connect: {
            id: account.id,
          },
        },
        salt: mockAccount.salt,
        hash: mockAccount.hash,
      };

      await createAuthenticationEntry(context, authEntry);

      // change the variables to have the same password
      variables.password = String(process.env.MOCK_ACCOUNT_PASSWORD);

      result = await accountPasswordReset({}, variables, context);

      const expected = {
        success: false,
        hasBeenUsedBefore: true,
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

      result = await accountPasswordReset({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });
});
