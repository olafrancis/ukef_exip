import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import { addMonths } from 'date-fns';
import baseConfig from './keystone';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import { APPLICATION } from './constants';
import updateApplication from './helpers/update-application';
import sendEmail from './emails';
import { mockAccount, mockSendEmailResponse, mockInsuranceFeedback } from './test-mocks';
import { Application, Account, Feedback } from './types';

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule);

describe('Create an Application', () => {
  let application: Application;

  beforeAll(async () => {
    application = (await context.query.Application.createOne({
      data: {},
      query:
        'id createdAt updatedAt referenceNumber submissionDeadline submissionType status previousStatus eligibility { id } policyAndExport { id } owner { id } company { id } business { id } broker { id } buyer { id } sectionReview { id } declaration { id }',
    })) as Application;
  });

  test('it should have an ID', () => {
    expect(application.id).toBeDefined();
    expect(typeof application.id).toEqual('string');
  });

  test('it should have created and updated dates', () => {
    const createdAtDay = new Date(application.createdAt).getDate();
    const createdAtMonth = new Date(application.createdAt).getMonth();
    const createdAtYear = new Date(application.createdAt).getFullYear();

    const expectedDay = new Date().getDate();
    const expectedMonth = new Date().getMonth();
    const expectedYear = new Date().getFullYear();

    expect(createdAtDay).toEqual(expectedDay);
    expect(createdAtMonth).toEqual(expectedMonth);
    expect(createdAtYear).toEqual(expectedYear);

    const updatedAtDay = new Date(application.updatedAt).getDate();
    const updatedAtMonth = new Date(application.updatedAt).getMonth();
    const updatedAtYear = new Date(application.updatedAt).getFullYear();

    expect(updatedAtDay).toEqual(expectedDay);
    expect(updatedAtMonth).toEqual(expectedMonth);
    expect(updatedAtYear).toEqual(expectedYear);
  });

  test('it should have a submission deadline date', () => {
    const submissionDeadlineDay = new Date(application.submissionDeadline).getDate();
    const submissionDeadlineMonth = new Date(application.submissionDeadline).getMonth();
    const submissionDeadlineYear = new Date(application.submissionDeadline).getFullYear();

    const now = new Date();

    const expectedDate = addMonths(new Date(now), APPLICATION.SUBMISSION_DEADLINE_IN_MONTHS);

    const expectedDay = new Date(expectedDate).getDate();
    const expectedMonth = new Date(expectedDate).getMonth();
    const expectedYear = new Date(expectedDate).getFullYear();

    expect(submissionDeadlineDay).toEqual(expectedDay);
    expect(submissionDeadlineMonth).toEqual(expectedMonth);
    expect(submissionDeadlineYear).toEqual(expectedYear);
  });

  test('it should have a default submission type', () => {
    expect(application.submissionType).toEqual(APPLICATION.SUBMISSION_TYPE.MIA);
  });

  test(`it should have a status of ${APPLICATION.STATUS.DRAFT}`, () => {
    expect(application.status).toEqual(APPLICATION.STATUS.DRAFT);
  });

  test('it should have a reference number', () => {
    expect(application.referenceNumber).toBeDefined();
    expect(typeof application.referenceNumber).toEqual('number');
  });

  test('it should have a policy and export id', () => {
    expect(application.policyAndExport).toBeDefined();
    expect(typeof application.policyAndExport.id).toEqual('string');
  });

  test('it should have a company id', () => {
    expect(application.company).toBeDefined();
    expect(typeof application.company.id).toEqual('string');
  });

  test('it should have a business id', () => {
    expect(application.business).toBeDefined();
    expect(typeof application.business.id).toEqual('string');
  });

  test('it should have a broker id', () => {
    expect(application.broker).toBeDefined();
    expect(typeof application.broker.id).toEqual('string');
  });

  test('it should have a buyer id', () => {
    expect(application.buyer).toBeDefined();
    expect(typeof application.buyer.id).toEqual('string');
  });

  test('it should have a sectionReview id', () => {
    expect(application.sectionReview).toBeDefined();
    expect(typeof application.sectionReview.id).toEqual('string');
  });

  test('it should have a declaration id', () => {
    expect(application.declaration).toBeDefined();
    expect(typeof application.declaration.id).toEqual('string');
  });

  test('it should have generated an eligibility entry and add the ID to the application', async () => {
    const allEligibilityEntires = await context.query.Eligibility.findMany();
    const lastEligibilityEntry = allEligibilityEntires[allEligibilityEntires.length - 1];

    const expected = lastEligibilityEntry.id;

    expect(application.eligibility.id).toEqual(expected);
  });

  test('it should add the application ID to the reference number entry', async () => {
    const referenceNumber = await context.query.ReferenceNumber.findOne({
      where: {
        id: application.referenceNumber.toString(),
      },
      query: 'id application { id }',
    });

    expect(referenceNumber.application.id).toEqual(application.id);
  });

  test('it should add the application ID to the policy and export entry', async () => {
    const business = await context.query.Business.findOne({
      where: {
        id: application.business.id,
      },
      query: 'id application { id }',
    });

    expect(business.application.id).toEqual(application.id);
  });

  test('it should add the application ID to the policy and export entry', async () => {
    const policyAndExport = await context.query.PolicyAndExport.findOne({
      where: {
        id: application.policyAndExport.id,
      },
      query: 'id application { id }',
    });

    expect(policyAndExport.application.id).toEqual(application.id);
  });

  test('it should add the application ID to the company entry', async () => {
    const company = await context.query.Company.findOne({
      where: {
        id: application.company.id,
      },
      query: 'id application { id }',
    });

    expect(company.application.id).toEqual(application.id);
  });

  test('it should add the application ID to the broker entry', async () => {
    const broker = await context.query.Broker.findOne({
      where: {
        id: application.broker.id,
      },
      query: 'id application { id }',
    });

    expect(broker.application.id).toEqual(application.id);
  });

  test('it should add the company ID to the company address entry', async () => {
    const company = await context.query.Company.findOne({
      where: {
        id: application.company.id,
      },
      query: 'id application { id } registeredOfficeAddress { id }',
    });

    const companyAddress = await context.query.CompanyAddress.findOne({
      where: {
        id: company.registeredOfficeAddress.id,
      },
      query: 'id company { id }',
    });

    expect(companyAddress.company.id).toEqual(application.company.id);
  });

  test('it should add the application ID to the buyer entry', async () => {
    const buyer = await context.query.Buyer.findOne({
      where: {
        id: application.buyer.id,
      },
      query: 'id application { id }',
    });

    expect(buyer.application.id).toEqual(application.id);
  });

  test('it should add the application ID to the sectionReview entry', async () => {
    const sectionReview = await context.query.SectionReview.findOne({
      where: {
        id: application.sectionReview.id,
      },
      query: 'id application { id }',
    });

    expect(sectionReview.application.id).toEqual(application.id);
  });

  test('it should add the application ID to the declaration entry', async () => {
    const declaration = await context.query.Declaration.findOne({
      where: {
        id: application.declaration.id,
      },
      query: 'id application { id }',
    });

    expect(declaration.application.id).toEqual(application.id);
  });
});

describe('Account', () => {
  let account: Account;

  describe('create', () => {
    jest.mock('./emails');

    const sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    beforeAll(async () => {
      sendEmail.confirmEmailAddress = sendEmailConfirmEmailAddressSpy;

      account = (await context.query.Account.createOne({
        data: mockAccount,
        query: 'id createdAt updatedAt firstName lastName email salt hash isVerified verificationHash verificationExpiry',
      })) as Account;
    });

    test('it should have an ID', () => {
      expect(account.id).toBeDefined();
      expect(typeof account.id).toEqual('string');
    });

    test('it should have created and updated dates', () => {
      const createdAtDay = new Date(account.createdAt).getDate();
      const createdAtMonth = new Date(account.createdAt).getMonth();
      const createdAtYear = new Date(account.createdAt).getFullYear();

      const expectedDay = new Date().getDate();
      const expectedMonth = new Date().getMonth();
      const expectedYear = new Date().getFullYear();

      expect(createdAtDay).toEqual(expectedDay);
      expect(createdAtMonth).toEqual(expectedMonth);
      expect(createdAtYear).toEqual(expectedYear);

      const updatedAtDay = new Date(account.updatedAt).getDate();
      const updatedAtMonth = new Date(account.updatedAt).getMonth();
      const updatedAtYear = new Date(account.updatedAt).getFullYear();

      expect(updatedAtDay).toEqual(expectedDay);
      expect(updatedAtMonth).toEqual(expectedMonth);
      expect(updatedAtYear).toEqual(expectedYear);
    });

    test('it should call sendEmail.confirmEmailAddress', () => {
      const { email, firstName, verificationHash } = account;

      expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledTimes(1);
      expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledWith(email, firstName, verificationHash);
    });
  });

  describe('update', () => {
    let updatedExporter: Account;

    const accountUpdate = { firstName: 'Updated' };

    beforeAll(async () => {
      account = (await context.query.Account.createOne({
        data: mockAccount,
        query: 'id',
      })) as Account;

      updatedExporter = (await context.query.Account.updateOne({
        where: { id: account.id },
        data: accountUpdate,
        query: 'id createdAt updatedAt firstName lastName email salt hash isVerified verificationHash verificationExpiry',
      })) as Account;
    });

    test('it should update the provided fields', () => {
      expect(updatedExporter.firstName).toEqual(accountUpdate.firstName);
    });

    test('it should update updatedAt', () => {
      expect(updatedExporter.updatedAt).not.toEqual(account.createdAt);
    });
  });
});

describe('Create feedback', () => {
  let feedback: Feedback;

  describe('create', () => {
    beforeAll(async () => {
      feedback = (await context.query.Feedback.createOne({
        data: mockInsuranceFeedback,
        query: 'id service satisfaction improvement otherComments referralUrl product',
      })) as Feedback;
    });

    test('it should have an ID', () => {
      expect(feedback.id).toBeDefined();
      expect(typeof feedback.id).toEqual('string');
    });

    test('it should have the relevant fields', () => {
      expect(feedback.service).toEqual(mockInsuranceFeedback.service);
      expect(feedback.satisfaction).toEqual(mockInsuranceFeedback.satisfaction);
      expect(feedback.improvement).toEqual(mockInsuranceFeedback.improvement);
      expect(feedback.otherComments).toEqual(mockInsuranceFeedback.otherComments);
      expect(feedback.referralUrl).toEqual(mockInsuranceFeedback.referralUrl);
      expect(feedback.product).toEqual(mockInsuranceFeedback.product);
    });
  });
});

describe('Application timestamp updates', () => {
  const updateApplicationTimestampSpy = jest.fn();

  let application: Application;

  beforeAll(async () => {
    application = (await context.query.Application.createOne({
      data: {},
      query:
        'id createdAt updatedAt referenceNumber submissionDeadline submissionType status previousStatus eligibility { id } policyAndExport { id } owner { id } company { id } business { id } broker { id } buyer { id } sectionReview { id } declaration { id }',
    })) as Application;
  });

  beforeEach(() => {
    jest.resetAllMocks();

    jest.mock('./helpers/update-application');

    updateApplication.timestamp = updateApplicationTimestampSpy;
  });

  const assertSpyWasCalled = () => {
    expect(updateApplicationTimestampSpy).toHaveBeenCalledTimes(1);
    expect(updateApplicationTimestampSpy).toHaveBeenCalledWith(context, application.id);
  };

  describe('PolicyAndExport', () => {
    test('it should call updateApplication.timestamp', async () => {
      await context.query.PolicyAndExport.updateOne({
        where: { id: application.policyAndExport.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('Business', () => {
    test('it should call updateApplication.timestamp', async () => {
      await context.query.Business.updateOne({
        where: { id: application.business.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('Broker', () => {
    test('it should call updateApplication.timestamp', async () => {
      await context.query.Broker.updateOne({
        where: { id: application.broker.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('Company', () => {
    test('it should call updateApplication.timestamp', async () => {
      await context.query.Company.updateOne({
        where: { id: application.company.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('Buyer', () => {
    test('it should call updateApplication.timestamp', async () => {
      await context.query.Buyer.updateOne({
        where: { id: application.buyer.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('SectionReview', () => {
    test('it should call updateApplication.timestamp', async () => {
      await context.query.SectionReview.updateOne({
        where: { id: application.sectionReview.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('Declaration', () => {
    test('it should call updateApplication.timestamp', async () => {
      await context.query.Declaration.updateOne({
        where: { id: application.declaration.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });
});
