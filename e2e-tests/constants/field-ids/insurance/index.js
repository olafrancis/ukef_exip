import { SHARED_ELIGIBILITY_FIELD_IDS } from '../shared-eligibility';
import SHARED_FIELD_IDS from './shared';
import { ACCOUNT } from './account';
import { POLICY } from './policy';
import { EXPORTER_BUSINESS } from './business';
import { YOUR_BUYER } from './your-buyer';
import { DECLARATIONS } from './declarations';

export const INSURANCE_FIELD_IDS = {
  ELIGIBILITY: {
    ...SHARED_ELIGIBILITY_FIELD_IDS,
    ...SHARED_FIELD_IDS,
    HAS_COMPANIES_HOUSE_NUMBER: 'hasCompaniesHouseNumber',
    COMPANIES_HOUSE_NUMBER: 'companyNumber',
    TOTAL_CONTRACT_VALUE: 'totalContractValue',
    TOTAL_CONTRACT_VALUE_ID: 'totalContractValueId',
    WANT_COVER_OVER_MAX_PERIOD: 'wantCoverOverMaxPeriod',
    COVER_PERIOD: 'coverPeriod',
    COVER_PERIOD_ID: 'coverPeriodId',
    HAS_END_BUYER: 'hasEndBuyer',
    HAVE_AN_ACCOUNT: 'haveAnAccount',
  },
  ...SHARED_FIELD_IDS,
  SUBMISSION_DEADLINE: 'submissionDeadline',
  ACCOUNT,
  POLICY,
  EXPORTER_BUSINESS,
  YOUR_BUYER,
  DECLARATIONS,
};
