const FIELD_IDS = require('../constants/field-ids');
const FIELD_VALUES = require('../constants/field-values');
const LINKS = require('./links');

const FIELDS = {
  [FIELD_IDS.COUNTRY]: {
    HINT: 'Cover is based on the country your buyer is located in, not the destination of your goods or services.',
  },
  [FIELD_IDS.VALID_COMPANY_BASE]: {
    SUMMARY: {
      TITLE: 'Your company',
    },
  },
  [FIELD_IDS.BUYER_COUNTRY]: {
    SUMMARY: {
      TITLE: 'Buyer is based in',
    },
  },
  [FIELD_IDS.CAN_GET_PRIVATE_INSURANCE]: {
    OPTIONS: {
      YES: {
        ID: FIELD_IDS.CAN_GET_PRIVATE_INSURANCE_YES,
        VALUE: FIELD_VALUES.CAN_GET_PRIVATE_INSURANCE.YES,
        TEXT: 'Yes',
      },
      NO: {
        ID: FIELD_IDS.CAN_GET_PRIVATE_INSURANCE_NO,
        VALUE: FIELD_VALUES.CAN_GET_PRIVATE_INSURANCE.NO,
        TEXT: 'No',
      },
    },
  },
  [FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES]: {
    LABEL: 'Percentage of your export that is UK content',
    HINT: 'Enter the UK content of your export as a percentage.',
    SUMMARY: {
      TITLE: 'UK goods or services',
    },
  },
  [FIELD_IDS.AMOUNT_CURRENCY]: {
    SINGLE_POLICY: {
      LEGEND: 'What\'s the total value of the contract you want to insure?',
    },
    MULTI_POLICY: {
      LEGEND: 'What\'s the maximum amount your buyer will owe you at any single point during the policy?',
    },
  },
  [FIELD_IDS.CURRENCY]: {
    LABEL: 'Select a currency (pounds sterling, euros or US dollars). You can send out your invoices in most currencies but UKEF only issues policies in these 3 currencies.',
  },
  [FIELD_IDS.CONTRACT_VALUE]: {
    LABEL: 'Contract value',
    HINT: 'Enter a whole number - do not enter decimals.',
    SUMMARY: {
      TITLE: 'Total value of contract',
    },
  },
  [FIELD_IDS.MAX_AMOUNT_OWED]: {
    LABEL: 'Maximum amount owed at any single point',
    HINT: 'Enter a whole number - do not enter decimals.',
    SUMMARY: {
      TITLE: 'Maximum buyer will owe at any single point',
    },
  },
  [FIELD_IDS.CREDIT_PERIOD]: {
    LABEL: 'What credit period do you have with your buyer?',
    HINT: 'To get a quote, you need to enter a credit period of 1 or 2 months, whichever is closest to your current credit period length.',
    SUMMARY: {
      TITLE: 'Credit period',
    },
  },
  [FIELD_IDS.PERCENTAGE_OF_COVER]: {
    SINGLE_POLICY: {
      LABEL: 'What percentage of your export contract value do you want to cover?',
    },
    MULTI_POLICY: {
      LABEL: 'What percentage of cover do you need?',
      HINT: 'Select a percentage of the maximum your buyer will owe at any single point.',
    },
    SUMMARY: {
      TITLE: 'Percentage of cover',
    },
  },
  [FIELD_IDS.POLICY_TYPE]: {
    OPTIONS: {
      SINGLE: {
        ID: FIELD_IDS.SINGLE_POLICY_TYPE,
        VALUE: FIELD_VALUES.POLICY_TYPE.SINGLE,
        TEXT: 'Single contract policy',
        HINT: 'This covers a single export contract with a single buyer for one or more shipments. You need to pay before the policy starts.',
      },
      MULTI: {
        ID: FIELD_IDS.MULTI_POLICY_TYPE,
        VALUE: FIELD_VALUES.POLICY_TYPE.MULTI,
        TEXT: 'Multiple contract policy (also known as a revolving policy)',
        HINT: 'This covers multiple export contracts with the same buyer. You do not need to pay before the policy starts. You\'ll pay each time you declare a new export sale.',
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
    HINT: [
      [
        {
          text: 'You can get an online quote for up to 22 months. For over 22 months',
        },
        {
          text: 'fill in this form',
          href: LINKS.EXTERNAL.NBI_FORM,
        },
        {
          text: ' and email it to UKEF.',
        },
      ],
    ],
    SUMMARY: {
      TITLE: 'Policy length',
    },
  },
  [FIELD_IDS.MULTI_POLICY_LENGTH]: {
    LABEL: 'How long do you need the policy for?',
    HINT: [
      [
        {
          text: 'You can get an online quote for up to 12 months. For over 12 months',
        },
        {
          text: 'fill in this form',
          href: LINKS.EXTERNAL.NBI_FORM,
        },
        {
          text: ' and email it to UKEF.',
        },
      ],
    ],
    SUMMARY: {
      TITLE: 'Policy length',
    },
  },
};

module.exports = FIELDS;
