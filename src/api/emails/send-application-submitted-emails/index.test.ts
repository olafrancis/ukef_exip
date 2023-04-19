import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import sendApplicationSubmittedEmails from '.';
import baseConfig from '../../keystone';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import sendEmail from '../index';
import { ANSWERS, EMAIL_TEMPLATE_IDS } from '../../constants';
import { createFullApplication } from '../../test-helpers';
import { Application, ApplicationSubmissionEmailVariables } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line
import { mockSendEmailResponse } from '../../test-mocks';

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('emails/send-email-application-submitted', () => {
  let application: Application;
  const mockCsvPath = '/path-to-csv';

  jest.mock('./index');

  let applicationSubmittedEmailSpy = jest.fn();
  let underwritingTeamEmailSpy = jest.fn();
  let documentsEmailSpy = jest.fn();

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    application = await createFullApplication(context);

    jest.resetAllMocks();

    applicationSubmittedEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
    underwritingTeamEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
    documentsEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.applicationSubmitted.exporter = applicationSubmittedEmailSpy;
    sendEmail.applicationSubmitted.underwritingTeam = underwritingTeamEmailSpy;

    sendEmail.documentsEmail = documentsEmailSpy;
  });

  describe('emails', () => {
    let expectedSendEmailVars: ApplicationSubmissionEmailVariables;

    beforeEach(() => {
      const { referenceNumber, exporter, exporterCompany, buyer } = application;
      const { email, firstName } = exporter;
      const { companyName } = exporterCompany;
      const { companyOrOrganisationName } = buyer;

      expectedSendEmailVars = {
        emailAddress: email,
        firstName,
        referenceNumber,
        buyerName: companyOrOrganisationName,
        exporterCompanyName: companyName,
      } as ApplicationSubmissionEmailVariables;
    });

    test('it should call sendEmail.applicationSubmitted.exporter', async () => {
      await sendApplicationSubmittedEmails.send(application, mockCsvPath);

      expect(applicationSubmittedEmailSpy).toHaveBeenCalledTimes(1);
      expect(applicationSubmittedEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars);
    });

    test('it should call sendEmail.documentsEmail with correct template ID ', async () => {
      await sendApplicationSubmittedEmails.send(application, mockCsvPath);

      expect(documentsEmailSpy).toHaveBeenCalledTimes(1);

      const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY_AND_TRADING_HISTORY;

      expect(documentsEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars, templateId);
    });

    describe('when the declaration has an answer of `No` for hasAntiBriberyCodeOfConduct and buyer has exporterIsConnectedWithBuyer answer of `Yes`', () => {
      beforeEach(() => {
        application.declaration = {
          ...application.declaration,
          hasAntiBriberyCodeOfConduct: ANSWERS.NO,
        };
      });

      test('it should call sendEmail.documentsEmail with correct template ID', async () => {
        await sendApplicationSubmittedEmails.send(application, mockCsvPath);

        expect(documentsEmailSpy).toHaveBeenCalledTimes(1);

        const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.SEND_DOCUMENTS.TRADING_HISTORY;

        expect(documentsEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars, templateId);
      });
    });

    describe('when the declaration has an answer of `No` for hasAntiBriberyCodeOfConduct and does NOT have exporterIsConnectedWithBuyer', () => {
      beforeEach(() => {
        application.declaration = {
          ...application.declaration,
          hasAntiBriberyCodeOfConduct: ANSWERS.NO,
        };

        application.buyer = {
          ...application.buyer,
          exporterIsConnectedWithBuyer: ANSWERS.NO,
        };
      });

      test('it should NOT call sendEmail.documentsEmail', async () => {
        await sendApplicationSubmittedEmails.send(application, mockCsvPath);

        expect(documentsEmailSpy).toHaveBeenCalledTimes(0);
      });
    });

    describe('when the declaration has an answer of `Yes` for hasAntiBriberyCodeOfConduct and does NOT have exporterIsConnectedWithBuyer', () => {
      beforeEach(async () => {
        application.declaration = {
          ...application.declaration,
          hasAntiBriberyCodeOfConduct: ANSWERS.YES,
        };

        application.buyer = {
          ...application.buyer,
          exporterIsConnectedWithBuyer: ANSWERS.NO,
        };
      });

      test('it should NOT call sendEmail.documentsEmail', async () => {
        await sendApplicationSubmittedEmails.send(application, mockCsvPath);

        expect(documentsEmailSpy).toHaveBeenCalledTimes(1);

        const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY;

        expect(documentsEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars, templateId);
      });
    });
  });

  it('should return success=true', async () => {
    const result = await sendApplicationSubmittedEmails.send(application, mockCsvPath);

    const expected = { success: true };

    expect(result).toEqual(expected);
  });

  describe('error handling', () => {
    beforeEach(() => {
      sendEmail.applicationSubmitted.exporter = jest.fn(() => Promise.reject(mockSendEmailResponse));
    });

    test('should throw an error', async () => {
      try {
        await sendApplicationSubmittedEmails.send(application, mockCsvPath);
      } catch (err) {
        const expected = new Error(`Sending application submitted emails ${mockSendEmailResponse}`);

        expect(err).toEqual(expected);
      }
    });
  });
});
