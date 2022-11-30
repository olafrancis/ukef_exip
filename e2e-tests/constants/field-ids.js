// TODO: add QUOTE.ELIGIBILITY structure.

const SHARED = {
  POLICY_TYPE: 'policyType',
  SINGLE_POLICY_TYPE: 'singlePolicyType',
  MULTI_POLICY_TYPE: 'multiPolicyType',
};

const SHARED_ELIGIBILITY = {
  BUYER_COUNTRY: 'buyerCountry',
  HAS_MINIMUM_UK_GOODS_OR_SERVICES: 'hasMinimumUkGoodsOrServices',
  VALID_EXPORTER_LOCATION: 'validExporterLocation',
};

export const FIELD_IDS = {
  ...SHARED_ELIGIBILITY,
  OPTIONAL_COOKIES: 'optionalCookies',
  VALID_BUYER_BODY: 'validBuyerBody',
  AMOUNT_CURRENCY: 'amountAndCurrency',
  CURRENCY: 'currency',
  CONTRACT_VALUE: 'contractValue',
  MAX_AMOUNT_OWED: 'maximumContractAmountOwed',
  CREDIT_PERIOD: 'creditPeriodInMonths',
  // POLICY_TYPE: 'policyType',
  // SINGLE_POLICY_TYPE: 'singlePolicyType',
  // MULTI_POLICY_TYPE: 'multiPolicyType',
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
      WANT_COVER_OVER_MAX_AMOUNT: 'wantCoverOverMaxAmount',
      WANT_COVER_OVER_MAX_PERIOD: 'wantCoverOverMaxPeriod',
      OTHER_PARTIES_INVOLVED: 'otherPartiesInvolved',
      LETTER_OF_CREDIT: 'paidByLetterOfCredit',
      PRE_CREDIT_PERIOD: 'needPreCreditPeriodCover',
      COMPANIES_HOUSE_NUMBER: 'hasCompaniesHouseNumber',
    },
    POLICY_AND_EXPORTS: {
      ...SHARED,
      TYPE_OF_POLICY: {
        POLICY_TYPE: SHARED.POLICY_TYPE,
      },
    },
  },
};
