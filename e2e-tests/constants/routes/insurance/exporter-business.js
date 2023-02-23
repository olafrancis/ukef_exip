const EXPORTER_BUSINESS_ROOT = '/your-business';
const COMPANY_DETAILS_ROOT = 'company-details';
const NATURE_OF_BUSINESS = 'nature-of-business';
const TURNOVER = 'turnover';
const BROKER = 'broker';
const CHECK_YOUR_ANSWERS = 'check-your-answers';

export const EXPORTER_BUSINESS = {
  ROOT: EXPORTER_BUSINESS_ROOT,
  COMPANY_DETAILS: `${EXPORTER_BUSINESS_ROOT}/${COMPANY_DETAILS_ROOT}`,
  COMPANY_DETAILS_CHANGE: `${EXPORTER_BUSINESS_ROOT}/${COMPANY_DETAILS_ROOT}/change`,
  COMPANY_HOUSE_SEARCH: `${EXPORTER_BUSINESS_ROOT}/${COMPANY_DETAILS_ROOT}/companies-house-search`,
  NO_COMPANIES_HOUSE_NUMBER: `${EXPORTER_BUSINESS_ROOT}/${COMPANY_DETAILS_ROOT}/no-companies-house-number`,
  NATURE_OF_BUSINESS: `${EXPORTER_BUSINESS_ROOT}/${NATURE_OF_BUSINESS}`,
  TURNOVER: `${EXPORTER_BUSINESS_ROOT}/${TURNOVER}`,
  BROKER: `${EXPORTER_BUSINESS_ROOT}/${BROKER}`,
  CHECK_YOUR_ANSWERS: `${EXPORTER_BUSINESS_ROOT}/${CHECK_YOUR_ANSWERS}`,
};
