import {
  add,
  getMonth,
  getYear,
} from 'date-fns';
import { FIELD_IDS, COMPANIES_HOUSE_NUMBER, WEBSITE_EXAMPLES } from '../../constants';
import { GBP_CURRENCY_CODE } from './currencies';
import mockCountries from './countries';
import { FIELDS_ELIGIBILITY } from '../../content-strings/fields/insurance/eligibility';

const {
  INSURANCE: {
    ELIGIBILITY: {
      WANT_COVER_OVER_MAX_AMOUNT,
      WANT_COVER_OVER_MAX_PERIOD,
      OTHER_PARTIES_INVOLVED,
      LETTER_OF_CREDIT,
      PRE_CREDIT_PERIOD,
      COMPANIES_HOUSE_NUMBER: ELIGIBILITY_COMPANIES_HOUSE_NUMBER,
      BUYER_COUNTRY,
      HAS_MINIMUM_UK_GOODS_OR_SERVICES,
      VALID_EXPORTER_LOCATION,
    },
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
    EXPORTER_BUSINESS: {
      COMPANY_HOUSE: {
        COMPANY_SIC,
        COMPANY_NUMBER,
        COMPANY_NAME,
        COMPANY_ADDRESS,
        COMPANY_INCORPORATED,
      },
      YOUR_COMPANY: {
        TRADING_ADDRESS,
        TRADING_NAME,
      },
      NATURE_OF_YOUR_BUSINESS: {
        GOODS_OR_SERVICES,
        YEARS_EXPORTING,
        EMPLOYEES_UK,
        EMPLOYEES_INTERNATIONAL,
      },
      TURNOVER: {
        FINANCIAL_YEAR_END_DATE,
        ESTIMATED_ANNUAL_TURNOVER,
        PERCENTAGE_TURNOVER,
      },
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
export const startDate = add(date, { months: 3 });
export const endDate = add(startDate, { months: 6 });

const application = {
  ELIGIBILITY: {
    [BUYER_COUNTRY]: mockCountries[1].name,
    [VALID_EXPORTER_LOCATION]: 'Yes',
    [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: FIELDS_ELIGIBILITY[HAS_MINIMUM_UK_GOODS_OR_SERVICES].ANSWER,
    [WANT_COVER_OVER_MAX_AMOUNT]: 'No',
    [WANT_COVER_OVER_MAX_PERIOD]: 'No',
    [OTHER_PARTIES_INVOLVED]: 'No',
    [LETTER_OF_CREDIT]: 'No',
    [PRE_CREDIT_PERIOD]: 'No',
    [ELIGIBILITY_COMPANIES_HOUSE_NUMBER]: 'Yes',
  },
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
  EXPORTER_COMPANY: {
    [COMPANY_NUMBER]: COMPANIES_HOUSE_NUMBER,
    [COMPANY_NAME]: 'DHG PROPERTY FINANCE LIMITED',
    [COMPANY_INCORPORATED]: '10 April 2014',
    [COMPANY_ADDRESS]: {
      addressLine1: 'Unit 3 Lewis Court',
      addressLine2: 'Portmanmoor Road',
      careOf: '',
      locality: 'Cardiff',
      region: 'South Glamorgan',
      postalCode: 'CF24 5HQ',
      country: '',
      premises: '',
    },
    [COMPANY_SIC]: ['64999'],
    [FINANCIAL_YEAR_END_DATE]: '31 July',
    [TRADING_NAME]: 'Yes',
    [TRADING_ADDRESS]: 'Yes',
  },
  EXPORTER_BUSINESS: {
    [GOODS_OR_SERVICES]: 'abc',
    [YEARS_EXPORTING]: '0',
    [EMPLOYEES_INTERNATIONAL]: '2005',
    [EMPLOYEES_UK]: '2000',
    [ESTIMATED_ANNUAL_TURNOVER]: '65000',
    [PERCENTAGE_TURNOVER]: '0',
  },
  EXPORTER_BROKER: {
    [USING_BROKER]: 'Yes',
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
    [COUNTRY]: mockCountries[0].name,
    [REGISTRATION_NUMBER]: '12345',
    [WEBSITE]: WEBSITE_EXAMPLES.VALID,
    [FIRST_NAME]: 'Bob',
    [LAST_NAME]: 'Smith',
    [POSITION]: 'CEO',
    [BUYER_EMAIL]: Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1'),
    [CAN_CONTACT_BUYER]: 'Yes',
    [CONNECTED_WITH_BUYER]: 'Yes',
    [TRADED_WITH_BUYER]: 'Yes',
  },
};

export default application;
