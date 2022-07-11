const FIELD_IDS = require('../constants/field-ids');
const FIELD_VALUES = require('../constants/field-values');

const FIELDS = {
  [FIELD_IDS.COUNTRY]: {
    HINT: 'Some countries are not covered by UK Export Finance. If your chosen destination is not in the list, then we cannot provide cover for it.',
    SUMMARY: {
      TITLE: 'Your company',
    },
  },
  [FIELD_IDS.VALID_COMPANY_BASE]: {
    SUMMARY: {
      TITLE: 'Your company',
    },
  },
  [FIELD_IDS.BUYER_COUNTRY]: {
    SUMMARY: {
      TITLE: 'Buyer is based',
    },
  },
  [FIELD_IDS.TRIED_PRIVATE_COVER]: {
    OPTIONS: {
      YES: {
        ID: FIELD_IDS.TRIED_PRIVATE_COVER_YES,
        VALUE: FIELD_VALUES.TRIED_PRIVATE_COVER.YES,
        TEXT: 'Yes',
      },
      NO: {
        ID: FIELD_IDS.TRIED_PRIVATE_COVER_NO,
        VALUE: FIELD_VALUES.TRIED_PRIVATE_COVER.NO,
        TEXT: 'No',
      },
    },
    SUMMARY: {
      TITLE: 'Able to get private insurance?',
    },
  },
  [FIELD_IDS.TRIED_PRIVATE_COVER_YES]: {
    SUMMARY: {
      TITLE: 'Able to get private insurance?',
    },
  },
  [FIELD_IDS.TRIED_PRIVATE_COVER_NO]: {
    SUMMARY: {
      TITLE: 'Able to get private insurance?',
    },
  },
  [FIELD_IDS.UK_GOODS_OR_SERVICES]: {
    LABEL: 'Percentage of your export that is UK content',
    HINT: 'Enter the UK content of your export as a percentage.',
    SUMMARY: {
      TITLE: 'Value of UK goods or services',
    },
  },
  [FIELD_IDS.AMOUNT_CURRENCY]: {
    LEGEND: 'How much do you want to be insured for?',
  },
  [FIELD_IDS.CURRENCY]: {
    LABEL: 'Select currency (Pounds sterling, Euro or US dollars)',
  },
  [FIELD_IDS.AMOUNT]: {
    LABEL: 'Amount',
    SUMMARY: {
      TITLE: 'Amount insured for',
    },
  },
  [FIELD_IDS.CREDIT_PERIOD]: {
    LABEL: 'What credit period do you have with your buyer?',
    HINT: 'This starts from when you dispatch the goods to when you’re paid. For example, your buyer may have 30, 60 or 90 days to pay you.',
    SUMMARY: {
      TITLE: 'Credit period',
    },
  },
  [FIELD_IDS.POLICY_TYPE]: {
    LEGEND: 'What kind of policy do you need?',
    OPTIONS: {
      SINGLE: {
        ID: FIELD_IDS.SINGLE_POLICY_TYPE,
        VALUE: FIELD_VALUES.POLICY_TYPE.SINGLE,
        TEXT: 'Single contract policy',
        HINT: 'This covers a single export contract with a specific buyer with one or more shipments.',
      },
      MULTI: {
        ID: FIELD_IDS.MULTI_POLICY_TYPE,
        VALUE: FIELD_VALUES.POLICY_TYPE.MULTI,
        TEXT: 'Multiple contract policy (also known as a revolving policy)',
        HINT: 'This covers multiple export contracts or orders with the same buyer. You\'ll need to be able to estimate the total value of the exports during the policy.',
      },
    },
    SUMMARY: {
      TITLE: 'Policy type',
    },
  },
  [FIELD_IDS.SINGLE_POLICY_TYPE]: {
    SUMMARY: {
      TITLE: 'Policy type',
    },
  },
  [FIELD_IDS.MULTI_POLICY_TYPE]: {
    SUMMARY: {
      TITLE: 'Policy type',
    },
  },
  [FIELD_IDS.SINGLE_POLICY_LENGTH]: {
    LABEL: 'How long do you need the policy for?',
    HINT: 'Calculate this from the date you start working on the contract until you receive final payment. The maximum is 9 months.',
    SUMMARY: {
      TITLE: 'Policy length',
    },
  },
  [FIELD_IDS.MULTI_POLICY_LENGTH]: {
    LABEL: 'How long do you need the policy for?',
    HINT: 'Calculate this from the date you start working on the contract until you receive final payment. The maximum is 9 months.',
    SUMMARY: {
      TITLE: 'Policy length',
    },
  },
};

module.exports = FIELDS;
