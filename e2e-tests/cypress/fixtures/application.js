import {
  add,
  getMonth,
  getYear,
} from 'date-fns';
import { FIELD_IDS } from '../../constants';
import { GBP_CURRENCY_CODE } from './currencies';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        CREDIT_PERIOD_WITH_BUYER,
        POLICY_CURRENCY_CODE,
        SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
        MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
      },
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
    },
  },
} = FIELD_IDS;

/**
 * Application data we use and assert in E2E tests.
 */
const date = new Date();
export const startDate = add(date, { months: 3 });
export const endDate = add(startDate, { months: 6 });

const application = {
  POLICY_AND_EXPORTS: {
    [REQUESTED_START_DATE]: {
      day: '1',
      month: getMonth(startDate),
      year: getYear(startDate),
    },
    [CONTRACT_COMPLETION_DATE]: {
      day: '1',
      month: getMonth(endDate),
      year: getYear(endDate),
    },
    [TOTAL_CONTRACT_VALUE]: '10000',
    [CREDIT_PERIOD_WITH_BUYER]: 'mock free text',
    [POLICY_CURRENCY_CODE]: GBP_CURRENCY_CODE,
    [TOTAL_MONTHS_OF_COVER]: '2',
    [TOTAL_SALES_TO_BUYER]: '1000',
    [MAXIMUM_BUYER_WILL_OWE]: '500',
    [DESCRIPTION]: 'Mock description',
    [FINAL_DESTINATION]: 'DZA',
  },
};

export default application;
