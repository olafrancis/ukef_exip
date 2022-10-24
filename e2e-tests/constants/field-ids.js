const FIELD_IDS = {
  OPTIONAL_COOKIES: 'optionalCookies',
  VALID_BUYER_BODY: 'validBuyerBody',
  VALID_EXPORTER_LOCATION: 'validExporterLocation',
  BUYER_COUNTRY: 'buyerCountry',
  COUNTRY: 'country',
  HAS_MINIMUM_UK_GOODS_OR_SERVICES: 'hasMinimumUkGoodsOrServices',
  AMOUNT_CURRENCY: 'amountAndCurrency',
  CURRENCY: 'currency',
  CONTRACT_VALUE: 'contractValue',
  MAX_AMOUNT_OWED: 'maximumContractAmountOwed',
  CREDIT_PERIOD: 'creditPeriodInMonths',
  POLICY_TYPE: 'policyType',
  SINGLE_POLICY_TYPE: 'singlePolicyType',
  MULTI_POLICY_TYPE: 'multiPolicyType',
  POLICY_LENGTH: 'policyLength',
  SINGLE_POLICY_LENGTH: 'singlePolicyLengthMonths',
  MULTI_POLICY_LENGTH: 'multiPolicyLengthMonths',
  PERCENTAGE_OF_COVER: 'percentageOfCover',
  QUOTE: {
    INSURED_FOR: 'insuredFor',
    PREMIUM_RATE_PERCENTAGE: 'premiumRatePercentage',
    ESTIMATED_COST: 'estimatedCost',
    BUYER_LOCATION: 'buyerCountry',
  },
  INSURANCE: {
    ELIGIBILITY: {
      WANT_COVER_FOR_MORE_THAN_MAX_PERIOD: 'wantCoverForMoreThanMaxPeriod',
    },
  },
};

module.exports = FIELD_IDS;
