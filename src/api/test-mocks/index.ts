import dotenv from 'dotenv';
import crypto from 'crypto';
import { ACCOUNT, ANSWERS } from '../constants';
import application from './mock-application';
import { Account } from '../types';

dotenv.config();

const {
  RANDOM_BYTES_SIZE,
  STRING_TYPE,
  PBKDF2: { ITERATIONS, DIGEST_ALGORITHM },
  PASSWORD: {
    PBKDF2: { KEY_LENGTH },
  },
} = ACCOUNT.ENCRYPTION;

const generatePassword = (password: string) => {
  const salt = crypto.randomBytes(RANDOM_BYTES_SIZE).toString(STRING_TYPE);

  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

  return {
    salt,
    hash,
  };
};

export const mockAccount = {
  firstName: 'first',
  lastName: 'last',
  email: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1,
  ...generatePassword(String(process.env.MOCK_ACCOUNT_PASSWORD)),
  isVerified: true,
  verificationHash: 'mockVerificationHash',
  verificationExpiry: ACCOUNT.EMAIL.VERIFICATION_EXPIRY(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
} as Account;

export const mockOTP = {
  securityCode: '123456',
  salt: 'mockSalt',
  hash: 'mockHash',
  expiry: new Date(),
};

export const mockApplication = application;

export const mockExporterCompany = {
  companyName: 'Mock company name',
};

export const mockBuyer = {
  companyOrOrganisationName: 'Mock buyer',
  exporterIsConnectedWithBuyer: ANSWERS.YES,
};

export const mockApplicationDeclaration = {
  agreeToConfidentiality: true,
  agreeToAntiBribery: true,
  hasAntiBriberyCodeOfConduct: ANSWERS.YES,
  willExportWithAntiBriberyCodeOfConduct: ANSWERS.YES,
  agreeToConfirmationAndAcknowledgements: true,
  agreeHowDataWillBeUsed: true,
};

export const mockInsuranceFeedback = {
  satisfaction: 'satisfied',
  improvement: 'test',
  otherComments: '',
};

export const mockSendEmailResponse = { success: true, emailRecipient: mockAccount.email };
