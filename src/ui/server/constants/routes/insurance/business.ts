const ROOT = '/your-business';
const COMPANY_DETAILS_ROOT = `${ROOT}/company-details`;
const ALTERNATIVE_TRADING_ADDRESS_ROOT = `${ROOT}/alternative-trading-address`;
const NATURE_OF_BUSINESS_ROOT = `${ROOT}/nature-of-business`;
const TURNOVER_ROOT = `${ROOT}/turnover`;
const BROKER_ROOT = `${ROOT}/broker`;
const CHECK_YOUR_ANSWERS = `${ROOT}/check-your-answers`;

export const EXPORTER_BUSINESS = {
  ROOT,
  COMPANY_DETAILS_ROOT,
  COMPANY_DETAILS: COMPANY_DETAILS_ROOT,
  COMPANY_DETAILS_CHANGE: `${COMPANY_DETAILS_ROOT}/change`,
  COMPANY_DETAILS_CHECK_AND_CHANGE: `${COMPANY_DETAILS_ROOT}/check-and-change`,
  COMPANY_DETAILS_SAVE_AND_BACK: `${COMPANY_DETAILS_ROOT}/save-and-back`,
  ALTERNATIVE_TRADING_ADDRESS_ROOT,
  NATURE_OF_BUSINESS_ROOT,
  NATURE_OF_BUSINESS_CHANGE: `${NATURE_OF_BUSINESS_ROOT}/change`,
  NATURE_OF_BUSINESS_CHECK_AND_CHANGE: `${NATURE_OF_BUSINESS_ROOT}/check-and-change`,
  NATURE_OF_BUSINESS_SAVE_AND_BACK: `${NATURE_OF_BUSINESS_ROOT}/save-and-back`,
  TURNOVER_ROOT,
  TURNOVER_CHANGE: `${TURNOVER_ROOT}/change`,
  TURNOVER_CHECK_AND_CHANGE: `${TURNOVER_ROOT}/check-and-change`,
  TURNOVER_SAVE_AND_BACK: `${TURNOVER_ROOT}/save-and-back`,
  BROKER_ROOT,
  BROKER_SAVE_AND_BACK: `${BROKER_ROOT}/save-and-back`,
  BROKER_CHANGE: `${BROKER_ROOT}/change`,
  BROKER_CHECK_AND_CHANGE: `${BROKER_ROOT}/check-and-change`,
  CHECK_YOUR_ANSWERS,
  CHECK_YOUR_ANSWERS_SAVE_AND_BACK: `${CHECK_YOUR_ANSWERS}/save-and-back`,
};
