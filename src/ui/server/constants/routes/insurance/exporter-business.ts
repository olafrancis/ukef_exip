const ROOT = '/your-business';
const COMPANY_DETAILS_ROOT = `${ROOT}/company-details`;
const NATURE_OF_BUSINESS_ROOT = `${ROOT}/nature-of-business`;
const TURNOVER_ROOT = `${ROOT}/turnover`;
const BROKER_ROOT = `${ROOT}/broker`;
const CHECK_YOUR_ANSWERS = `${ROOT}/check-your-answers`;

export const EXPORTER_BUSINESS = {
  ROOT,
  COMPANY_DETAILS_ROOT,
  COMPANY_DETAILS: COMPANY_DETAILS_ROOT,
  COMPANY_DETAILS_SAVE_AND_BACK: `${COMPANY_DETAILS_ROOT}/save-and-back`,
  COMPANY_HOUSE_SEARCH: `${COMPANY_DETAILS_ROOT}/companies-house-search`,
  NO_COMPANIES_HOUSE_NUMBER: `${COMPANY_DETAILS_ROOT}/no-companies-house-number`,
  NATURE_OF_BUSINESS_ROOT,
  NATURE_OF_BUSINESS_SAVE_AND_BACK: `${NATURE_OF_BUSINESS_ROOT}/save-and-back`,
  TURNOVER_ROOT,
  TURNOVER_SAVE_AND_BACK: `${TURNOVER_ROOT}/save-and-back`,
  BROKER_ROOT,
  BROKER_SAVE_AND_BACK: `${BROKER_ROOT}/save-and-back`,
  CHECK_YOUR_ANSWERS,
};
