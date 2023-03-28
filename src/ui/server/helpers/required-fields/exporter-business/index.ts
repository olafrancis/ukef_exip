import FIELD_IDS from '../../../constants/field-ids/insurance';

const {
  EXPORTER_BUSINESS: { COMPANY_HOUSE, YOUR_COMPANY, NATURE_OF_YOUR_BUSINESS, TURNOVER, BROKER },
} = FIELD_IDS;

const {
  COMPANY_ADDRESS,
  SEARCH,
  INPUT,
  REGISTED_OFFICE_ADDRESS,
  COMPANY_SIC,
  COMPANY_INCORPORATED,
  FINANCIAL_YEAR_END_DATE: FINANCIAL_YEAR_END_DATE_COMPANY_HOUSE,
  ...COMPANIES_HOUSE_FIELDS
} = COMPANY_HOUSE;

const { PHONE_NUMBER, WEBSITE, YOUR_BUSINESS, ...YOUR_COMPANY_FIELDS } = YOUR_COMPANY;

const { FINANCIAL_YEAR_END_DATE, ...TURNOVER_FIELDS } = TURNOVER;

const { USING_BROKER, NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL } = BROKER;

/**
 * getBrokerTasks
 * returns tasks required for broker section based on isUsingBroker field
 * @param {String} isUsingBroker
 * @returns {Array} Array of tasks
 */
export const getBrokerTasks = (isUsingBroker?: string): Array<string> => {
  if (isUsingBroker && isUsingBroker === 'Yes') {
    return [NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL];
  }

  return [];
};

/**
 * Required fields for the insurance - exporter business section
 * @param {Array} Required field IDs
 */
const requiredFields = (isUsingBroker?: string): Array<string> => {
  let fields = {
    ...YOUR_COMPANY_FIELDS,
    ...COMPANIES_HOUSE_FIELDS,
    ...NATURE_OF_YOUR_BUSINESS,
    ...TURNOVER_FIELDS,
    USING_BROKER,
  };

  if (isUsingBroker) {
    fields = {
      ...fields,
      ...getBrokerTasks(isUsingBroker),
    };
  }

  return Object.values(fields);
};

export default requiredFields;
