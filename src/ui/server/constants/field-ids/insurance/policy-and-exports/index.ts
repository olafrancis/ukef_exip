import SHARED from '../../shared';

const SHARED_CONTRACT_POLICY = {
  REQUESTED_START_DATE: 'requestedStartDate',
  CREDIT_PERIOD_WITH_BUYER: 'creditPeriodWithBuyer',
  POLICY_CURRENCY_CODE: 'policyCurrencyCode',
};

const POLICY_AND_EXPORTS = {
  ...SHARED,
  TYPE_OF_POLICY: {
    POLICY_TYPE: SHARED.POLICY_TYPE,
    CURRENCY_CODE: 'currencyCode',
  },
  CONTRACT_POLICY: {
    ...SHARED_CONTRACT_POLICY,
    SINGLE: {
      CONTRACT_COMPLETION_DATE: 'contractCompletionDate',
      TOTAL_CONTRACT_VALUE: 'totalValueOfContract',
    },
    MULTIPLE: {
      TOTAL_MONTHS_OF_INSURANCE: 'totalMonthsOfInsurance',
      TOTAL_SALES_TO_BUYER: 'totalSalesToBuyer',
      MAXIMUM_BUYER_WILL_OWE: 'maximumBuyerWillOwe',
    },
  },
  ABOUT_GOODS_OR_SERVICES: {
    DESCRIPTION: 'goodsOrServicesDescription',
    FINAL_DESTINATION: 'goodsOrServicesDestinationIsoCode',
  },
};

export default POLICY_AND_EXPORTS;
