import accounts from './accounts';
import coverPeriodTestHelper from './cover-period';
import totalContractValueTestHelper from './total-contract-value';
import createAnEligibility from '../helpers/create-an-eligibility';
import createABuyer from '../helpers/create-a-buyer';
import createAPolicy from '../helpers/create-a-policy';
import createACompany from '../helpers/create-a-company';
import { FIELD_VALUES } from '../constants';
import {
  mockApplicationEligibility,
  mockSinglePolicy,
  mockMultiplePolicy,
  mockExportContract,
  mockBusiness,
  mockPolicyContact,
} from '../test-mocks/mock-application';
import { mockApplicationDeclaration } from '../test-mocks';
import mockCompany from '../test-mocks/mock-company';
import mockCountries from '../test-mocks/mock-countries';
import {
  Application,
  ApplicationBusiness,
  ApplicationDeclaration,
  ApplicationExportContract,
  ApplicationPolicy,
  ApplicationPolicyContact,
  Context,
} from '../types';

const { POLICY_TYPE } = FIELD_VALUES;

/**
 * createFullApplication
 * Create a full application for unit testing
 * @param {Object} KeystoneJS context API
 * @param {String} Policy type flag - different data is created if multiple is passed. Defaults to single.
 * @returns {Object} Application
 */
export const createFullApplication = async (context: Context, policyType?: string) => {
  const { buyerCountry, totalContractValue, totalContractValueId, coverPeriod, coverPeriodId, ...otherEligibilityAnswers } = mockApplicationEligibility;

  const countries = await context.query.Country.createMany({
    data: mockCountries,
    query: 'id isoCode name',
  });

  const country = countries.find((c) => c.isoCode === buyerCountry.isoCode);

  if (!country) {
    throw new Error('No country found from mock country ISO code');
  }

  const account = await accounts.create({ context });

  // create a new application
  const application = (await context.query.Application.createOne({
    query:
      'id referenceNumber submissionCount policyContact { id } exportContract { id } owner { id } company { id } business { id } broker { id } declaration { id }',
    data: {
      owner: {
        connect: {
          id: account.id,
        },
      },
    },
  })) as Application;

  // create a coverPeriod DB entry.
  const createdCoverPeriod = await coverPeriodTestHelper.create({ context });

  // create a totalContractValue DB entry.
  const createdTotalContractValue = await totalContractValueTestHelper.create({ context });

  // create eligibility and associate with the application.
  const eligibility = await createAnEligibility(
    context,
    country.id,
    application.id,
    createdCoverPeriod.id,
    createdTotalContractValue.id,
    otherEligibilityAnswers,
  );

  // create buyer and associate with the application.
  const buyer = await createABuyer(context, country.id, application.id);

  // create policy and associate with the application.
  const policy = await createAPolicy(context, application.id);

  // create company and associate with the application.
  const company = await createACompany(context, application.id, mockCompany);

  /**
   * update the application with:
   * 1) Eligibility relationship ID
   * 2) Buyer relationship ID
   * 3) Policy relationship ID
   */
  await context.db.Application.updateOne({
    where: { id: application.id },
    data: {
      eligibility: {
        connect: { id: eligibility.id },
      },
      buyer: {
        connect: { id: buyer.id },
      },
      policy: {
        connect: { id: policy.id },
      },
      company: {
        connect: { id: company.id },
      },
    },
  });

  /**
   * Update the policy so we have a full data set.
   * If a multiple policy type is passed, use mock multiple policy data.
   * Otherwise, use mock single policy data.
   */
  let policyData = {};

  if (policyType === POLICY_TYPE.MULTIPLE) {
    policyData = mockMultiplePolicy;
  } else {
    policyData = mockSinglePolicy;
  }

  (await context.query.Policy.updateOne({
    where: {
      id: policy.id,
    },
    data: policyData,
    query: 'id',
  })) as ApplicationPolicy;

  // update the export contract so we have a full data set.
  (await context.query.ExportContract.updateOne({
    where: {
      id: application.exportContract.id,
    },
    data: mockExportContract,
    query: 'id',
  })) as ApplicationExportContract;

  const policyContact = (await context.query.PolicyContact.updateOne({
    where: {
      id: application.policyContact.id,
    },
    data: mockPolicyContact,
    query: 'id firstName lastName email isSameAsOwner',
  })) as ApplicationPolicyContact;

  const business = (await context.query.Business.updateOne({
    where: {
      id: application.business.id,
    },
    data: mockBusiness,
    query: 'id',
  })) as ApplicationBusiness;

  // update the declaration so we have a full data set.
  const declaration = (await context.query.Declaration.updateOne({
    where: {
      id: application.declaration.id,
    },
    data: mockApplicationDeclaration,
    query: 'id hasAntiBriberyCodeOfConduct',
  })) as ApplicationDeclaration;

  return {
    ...application,
    owner: account,
    business,
    policy,
    policyContact,
    buyer,
    company,
    declaration,
    eligibility,
  };
};

export default createFullApplication;
