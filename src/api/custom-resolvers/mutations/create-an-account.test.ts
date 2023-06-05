import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import baseConfig from '../../keystone';
import createAnAccount from './create-an-account';
import { ACCOUNT } from '../../constants';
import getFullNameString from '../../helpers/get-full-name-string';
import sendEmail from '../../emails';
import { mockAccount, mockSendEmailResponse } from '../../test-mocks';
import { Account } from '../../types';
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

describe('custom-resolvers/create-an-account', () => {
  let account: Account;

  jest.mock('../../emails');

  let sendEmailConfirmEmailAddressSpy = jest.fn();

  const mockPassword = String(process.env.MOCK_ACCOUNT_PASSWORD);

  const variables = {
    urlOrigin: 'https://mock-origin.com',
    firstName: 'a',
    lastName: 'b',
    email: mockAccount.email,
    password: mockPassword,
  };

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    jest.resetAllMocks();

    sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.confirmEmailAddress = sendEmailConfirmEmailAddressSpy;

    // wipe the table so we have a clean slate.
    const accounts = await context.query.Account.findMany();

    await context.query.Account.deleteMany({
      where: accounts,
    });

    // create an account
    account = (await createAnAccount({}, variables, context)) as Account;
  });

  it('should generate and return the created account with added salt and hashes', () => {
    expect(account.firstName).toEqual(variables.firstName);
    expect(account.lastName).toEqual(variables.lastName);
    expect(account.email).toEqual(variables.email);
    expect(account.salt.length).toEqual(RANDOM_BYTES_SIZE * 2);
    expect(account.hash.length).toEqual(KEY_LENGTH * 2);
    expect(account.verificationHash.length).toEqual(KEY_LENGTH * 2);
  });

  it('should generate and return verification expiry date', () => {
    const now = new Date();

    const tomorrowDay = new Date(now).getDay() + 1;

    const expiry = new Date(account.verificationExpiry);

    const expiryDay = expiry.getDay();

    expect(expiryDay).toEqual(tomorrowDay);
  });

  it('should call sendEmail.confirmEmailAddress', () => {
    const { email, verificationHash } = account;

    const name = getFullNameString(account);

    expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledTimes(1);
    expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledWith(email, variables.urlOrigin, name, verificationHash);
  });

  describe('when an account with the provided email already exists', () => {
    let result: Account;

    beforeAll(async () => {
      // attempt to create account with the same email
      result = (await createAnAccount({}, variables, context)) as Account;
    });

    it('should return success=false', () => {
      const expected = {
        success: false,
      };

      expect(result).toEqual(expected);
    });

    it('should not create the account', async () => {
      const accounts = await context.query.Account.findMany();

      // should only have the first created account
      expect(accounts.length).toEqual(1);
    });
  });

  describe('error handling', () => {
    describe('when sendEmail.confirmEmailAddress does not return success=true', () => {
      const emailFailureResponse = { ...mockSendEmailResponse, success: false };

      beforeEach(() => {
        sendEmail.confirmEmailAddress = jest.fn(() => Promise.resolve(emailFailureResponse));
      });

      test('should throw an error', async () => {
        try {
          await createAnAccount({}, variables, context);
        } catch (err) {
          const expected = new Error(`Sending email verification for account creation ${emailFailureResponse}`);
          expect(err).toEqual(expected);
        }
      });
    });
  });
});
