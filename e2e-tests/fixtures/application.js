import {
  FIELD_IDS,
  FIELD_VALUES,
  COVER_PERIOD as COVER_PERIOD_CONSTANTS,
  TOTAL_CONTRACT_VALUE as TOTAL_CONTRACT_VALUE_CONSTANTS,
  WEBSITE_EXAMPLES,
} from '../constants';
import { COMPANIES_HOUSE_NUMBER } from '../constants/examples';
import { GBP_CURRENCY_CODE } from './currencies';
import mockCountries from './countries';
import mockCompanies from './companies';

const {
  INSURANCE: {
    ACCOUNT: {
      FIRST_NAME: ACCOUNT_FIRST_NAME,
      LAST_NAME: ACCOUNT_LAST_NAME,
      EMAIL: ACCOUNT_EMAIL,
    },
    ELIGIBILITY: {
      COVER_PERIOD_ID,
      HAS_COMPANIES_HOUSE_NUMBER,
      HAS_END_BUYER,
      HAS_MINIMUM_UK_GOODS_OR_SERVICES,
      TOTAL_CONTRACT_VALUE_ID,
      VALID_EXPORTER_LOCATION,
    },
    POLICY: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        CREDIT_PERIOD_WITH_BUYER,
        POLICY_CURRENCY_CODE,
        SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
        MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
      },
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
      DIFFERENT_NAME_ON_POLICY: { POSITION: CONTACT_POSITION },
    },
    EXPORTER_BUSINESS: {
      NATURE_OF_YOUR_BUSINESS: {
        GOODS_OR_SERVICES,
        YEARS_EXPORTING,
        EMPLOYEES_UK,
      },
      TURNOVER: {
        ESTIMATED_ANNUAL_TURNOVER,
        PERCENTAGE_TURNOVER,
      },
      CREDIT_CONTROL,
      BROKER: {
        USING_BROKER,
        NAME,
        ADDRESS_LINE_1,
        ADDRESS_LINE_2,
        TOWN,
        COUNTY,
        POSTCODE,
        EMAIL,
      },
      YOUR_COMPANY: {
        DIFFERENT_TRADING_NAME,
      },
    },
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: {
        NAME: COMPANY_OR_ORGANISATION_NAME,
        ADDRESS,
        COUNTRY,
        REGISTRATION_NUMBER,
        WEBSITE,
        FIRST_NAME,
        LAST_NAME,
        POSITION,
        EMAIL: BUYER_EMAIL,
        CAN_CONTACT_BUYER,
      },
      WORKING_WITH_BUYER: {
        CONNECTED_WITH_BUYER,
        TRADED_WITH_BUYER,
      },
    },
  },
} = FIELD_IDS;

/**
 * Application data we use and assert in E2E tests.
 */
const date = new Date();

/**
 * Add months to the above date.
 * If out of bound (< 12), then date will
 * move on the following year.
 * Note: JS months range (0 - 11)
 */
export const startDate = new Date(date.setMonth((date.getMonth() + 3))); // Add 3 months
export const endDate = new Date(date.setMonth((date.getMonth() + 6))); // Add 6 months

const application = {
  ELIGIBILITY: {
    buyerCountryIsoCode: mockCountries[1].isoCode,
    [COVER_PERIOD_ID]: COVER_PERIOD_CONSTANTS.LESS_THAN_2_YEARS.DB_ID,
    [HAS_COMPANIES_HOUSE_NUMBER]: true,
    [HAS_END_BUYER]: true,
    [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: true,
    [TOTAL_CONTRACT_VALUE_ID]: TOTAL_CONTRACT_VALUE_CONSTANTS.LESS_THAN_250K.DB_ID,
    [VALID_EXPORTER_LOCATION]: true,
  },
  COMPANY: mockCompanies[COMPANIES_HOUSE_NUMBER],
  YOUR_COMPANY: {
    [DIFFERENT_TRADING_NAME]: 'test',
  },
  POLICY: {
    [REQUESTED_START_DATE]: {
      day: '1',
      month: (startDate.getMonth() + 1),
      year: startDate.getFullYear(),
    },
    [CONTRACT_COMPLETION_DATE]: {
      day: '1',
      month: (endDate.getMonth() + 1),
      year: endDate.getFullYear(),
    },
    [TOTAL_CONTRACT_VALUE]: '10000',
    [CREDIT_PERIOD_WITH_BUYER]: 'mock free text',
    [POLICY_CURRENCY_CODE]: GBP_CURRENCY_CODE,
    [TOTAL_MONTHS_OF_COVER]: '2',
    [TOTAL_SALES_TO_BUYER]: '1000',
    [MAXIMUM_BUYER_WILL_OWE]: '500',
  },
  EXPORT_CONTRACT: {
    [DESCRIPTION]: 'Mock description',
    [FINAL_DESTINATION]: mockCountries[1].isoCode,
  },
  EXPORTER_BUSINESS: {
    [GOODS_OR_SERVICES]: 'abc',
    [YEARS_EXPORTING]: '0',
    [EMPLOYEES_UK]: '2000',
    [ESTIMATED_ANNUAL_TURNOVER]: '65000',
    [PERCENTAGE_TURNOVER]: '0',
    [CREDIT_CONTROL]: true,
  },
  EXPORTER_BROKER: {
    [USING_BROKER]: FIELD_VALUES.YES,
    [NAME]: 'name',
    [ADDRESS_LINE_1]: 'Address line 1',
    [ADDRESS_LINE_2]: 'Address line 2',
    [TOWN]: 'town',
    [COUNTY]: 'county',
    [POSTCODE]: 'SW1A 2HQ',
    [EMAIL]: Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1'),
  },
  BUYER: {
    [COMPANY_OR_ORGANISATION_NAME]: 'Test name',
    [ADDRESS]: 'Test address',
    [COUNTRY]: mockCountries[1].name,
    [REGISTRATION_NUMBER]: '12345',
    [WEBSITE]: WEBSITE_EXAMPLES.VALID,
    [FIRST_NAME]: 'Bob',
    [LAST_NAME]: 'Smith',
    [POSITION]: 'CEO',
    [BUYER_EMAIL]: Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1'),
    [CAN_CONTACT_BUYER]: FIELD_VALUES.YES,
    [CONNECTED_WITH_BUYER]: FIELD_VALUES.YES,
    [TRADED_WITH_BUYER]: FIELD_VALUES.YES,
  },
  POLICY_CONTACT: {
    [ACCOUNT_FIRST_NAME]: 'Bob',
    [ACCOUNT_LAST_NAME]: 'Smith',
    [ACCOUNT_EMAIL]: Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1'),
    [CONTACT_POSITION]: 'CEO',
  },
};

export const country = {
  ...mockCountries[1],
};

export default application;
