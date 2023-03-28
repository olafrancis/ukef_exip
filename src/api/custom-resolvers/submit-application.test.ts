import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import baseConfig from '../keystone';
import submitApplication from './submit-application';
import { APPLICATION } from '../constants';
import sendEmail from '../emails';
import { mockAccount, mockSendEmailResponse } from '../test-mocks';
import { Account, Application, ApplicationBuyer, SubmitApplicationVariables, SubmitApplicationResponse } from '../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

const createRequiredData = async () => {
  // create a new exporter
  const exporter = (await context.query.Exporter.createOne({
    data: mockAccount,
    query: 'id firstName email',
  })) as Account;

  const mockBuyer = {
    companyOrOrganisationName: 'Mock buyer',
  };

  // create a new application
  const application = (await context.query.Application.createOne({
    query: 'id referenceNumber exporter { id } buyer { id }',
    data: {
      exporter: {
        connect: {
          id: exporter.id,
        },
      },
    },
  })) as Application;

  // update the buyer so there is a name.
  const buyer = (await context.query.Buyer.updateOne({
    where: {
      id: application.buyer.id,
    },
    data: mockBuyer,
    query: 'id companyOrOrganisationName',
  })) as ApplicationBuyer;

  return {
    exporter,
    application,
    buyer,
  };
};

describe('custom-resolvers/submit-application', () => {
  let exporter: Account;
  let buyer: ApplicationBuyer;
  let application: Application;
  let submittedApplication: Application;
  let variables: SubmitApplicationVariables;
  let result: SubmitApplicationResponse;

  jest.mock('../emails');

  let sendEmailApplicationSubmittedSpy = jest.fn();

  beforeEach(async () => {
    jest.resetAllMocks();

    sendEmailApplicationSubmittedSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.applicationSubmittedEmail = sendEmailApplicationSubmittedSpy;

    const data = await createRequiredData();

    exporter = data.exporter;
    application = data.application;
    buyer = data.buyer;

    variables = {
      applicationId: application.id,
    };

    result = await submitApplication({}, variables, context);

    // get the submitted application
    submittedApplication = (await context.query.Application.findOne({
      where: {
        id: application.id,
      },
      query: 'id status previousStatus submissionDate',
    })) as Application;
  });

  it('should return success=true', () => {
    expect(result.success).toEqual(true);
  });

  it(`should change the application status to ${APPLICATION.STATUS.SUBMITTED}`, () => {
    expect(submittedApplication.status).toEqual(APPLICATION.STATUS.SUBMITTED);
  });

  it(`should add a previous status of ${APPLICATION.STATUS.DRAFT}`, () => {
    expect(submittedApplication.previousStatus).toEqual(APPLICATION.STATUS.DRAFT);
  });

  it('should add a submissionDate', () => {
    const { submissionDate } = submittedApplication;

    const submissionDateDay = new Date(submissionDate).getDay();

    const now = new Date();

    const expectedDay = now.getDay();

    expect(submissionDateDay).toEqual(expectedDay);
  });

  test('it should call sendEmail.applicationSubmittedEmail', async () => {
    result = await submitApplication({}, variables, context);

    const { email, firstName } = exporter;
    const { referenceNumber } = application;
    const { companyOrOrganisationName } = buyer;

    expect(sendEmailApplicationSubmittedSpy).toHaveBeenCalledTimes(1);
    expect(sendEmailApplicationSubmittedSpy).toHaveBeenCalledWith(email, firstName, referenceNumber, companyOrOrganisationName);
  });

  describe('when an application is not found', () => {
    it('should return success=false', async () => {
      // create a new application so we can get a valid ID format
      const newApplication = (await context.query.Application.createOne({
        query: 'id',
        data: {},
      })) as Application;

      variables = {
        applicationId: newApplication.id,
      };

      // delete the application so it will not be found
      (await context.query.Application.deleteOne({
        where: {
          id: newApplication.id,
        },
      })) as Application;

      result = await submitApplication({}, variables, context);

      expect(result.success).toEqual(false);
    });
  });

  describe('when an application is already submitted', () => {
    it('should return success=false', async () => {
      variables = {
        applicationId: submittedApplication.id,
      };

      result = await submitApplication({}, variables, context);

      expect(result.success).toEqual(false);
    });
  });

  describe('error handling', () => {
    test('should throw an error', async () => {
      variables = {
        applicationId: 'invalidId',
      };

      try {
        await submitApplication({}, variables, context);
      } catch (err) {
        const expected = new Error(`Submitting application Input error: Only a cuid can be passed to id filters`);

        expect(err).toEqual(expected);
      }
    });
  });
});
