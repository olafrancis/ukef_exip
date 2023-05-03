import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import baseConfig from '../../keystone';
import sendEmailPasswordResetLink from './send-email-password-reset-link';
import sendEmail from '../../emails';
import { ACCOUNT } from '../../constants';
import { mockAccount, mockSendEmailResponse } from '../../test-mocks';
import { Account, SuccessResponse } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

const { ENCRYPTION } = ACCOUNT;

const {
  PASSWORD: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;

describe('custom-resolvers/send-email-password-reset-link', () => {
  let account: Account;
  let result: SuccessResponse;

  jest.mock('../../emails');

  let passwordResetLinkSpy = jest.fn();

  const variables = {
    email: mockAccount.email,
  };

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    // wipe the table so we have a clean slate.
    const exporters = await context.query.Exporter.findMany();

    await context.query.Exporter.deleteMany({
      where: exporters,
    });

    // create an account
    account = (await context.query.Exporter.createOne({
      data: mockAccount,
      query: 'id',
    })) as Account;

    jest.resetAllMocks();

    passwordResetLinkSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.passwordResetLink = passwordResetLinkSpy;

    result = await sendEmailPasswordResetLink({}, variables, context);

    // get the latest account
    account = (await context.query.Exporter.findOne({
      where: { id: account.id },
      query: 'id email firstName passwordResetHash passwordResetExpiry',
    })) as Account;
  });

  it('should return the email response', () => {
    expect(result).toEqual(mockSendEmailResponse);
  });

  it('should generate a passwordResetHash and add to the account', async () => {
    expect(account.passwordResetHash.length).toEqual(KEY_LENGTH * 2);
  });

  it('should generate a passwordResetExpiry and add to the account', async () => {
    const now = new Date();

    const nowDay = now.getDay();
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();

    const expiry = new Date(account.passwordResetExpiry);

    const expiryDay = expiry.getDay();
    const expiryMonth = expiry.getMonth();
    const expiryYear = expiry.getFullYear();

    expect(expiryDay).toEqual(nowDay);
    expect(expiryMonth).toEqual(nowMonth);
    expect(expiryYear).toEqual(nowYear);

    const secondsDifference = (expiry.getTime() - now.getTime()) / 1000;

    // round up (slight millisecond difference in unit tests)
    const rounded = Math.ceil(secondsDifference);

    // 5 minutes
    const expectedSeconds = 60 * 5;

    expect(rounded).toEqual(expectedSeconds);
  });

  test('it should call sendEmail.passwordResetLink', () => {
    const { email, firstName, passwordResetHash } = account;

    expect(passwordResetLinkSpy).toHaveBeenCalledTimes(1);
    expect(passwordResetLinkSpy).toHaveBeenCalledWith(email, firstName, passwordResetHash);
  });

  describe('when no exporter is found', () => {
    test('it should return success=false', async () => {
      // wipe the table so we have a clean slate.
      const exporters = await context.query.Exporter.findMany();

      await context.query.Exporter.deleteMany({
        where: exporters,
      });

      result = await sendEmailPasswordResetLink({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      sendEmail.passwordResetLink = jest.fn(() => Promise.reject(mockSendEmailResponse));
    });

    test('should throw an error', async () => {
      try {
        await sendEmailPasswordResetLink({}, variables, context);
      } catch (err) {
        expect(passwordResetLinkSpy).toHaveBeenCalledTimes(1);

        const expected = new Error(`Sending password reset email (sendEmailPasswordResetLink mutation) ${mockSendEmailResponse}`);
        expect(err).toEqual(expected);
      }
    });
  });
});