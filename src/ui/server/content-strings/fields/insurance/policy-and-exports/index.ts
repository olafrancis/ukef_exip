import { APPLICATION, FIELD_IDS, FIELD_VALUES } from '../../../../constants';
import { LINKS } from '../../../links';

const { POLICY_AND_EXPORTS } = FIELD_IDS.INSURANCE;
const { CONTRACT_POLICY, ABOUT_GOODS_OR_SERVICES } = POLICY_AND_EXPORTS;

export const POLICY_AND_EXPORTS_FIELDS = {
  [POLICY_AND_EXPORTS.POLICY_TYPE]: {
    ID: FIELD_IDS.POLICY_TYPE,
    OPTIONS: {
      SINGLE: {
        ID: POLICY_AND_EXPORTS.SINGLE_POLICY_TYPE,
        VALUE: FIELD_VALUES.POLICY_TYPE.SINGLE,
        TEXT: 'Single contract policy',
        HINT_LIST: [
          'Covers a single contract with a buyer, for one or more shipments',
          'Cover for up to 2 years',
          'Best for a one off- project, when you know the exact value of your export contract now',
          'You pay for the insurance before the policy starts',
        ],
      },
      MULTIPLE: {
        ID: POLICY_AND_EXPORTS.MULTIPLE_POLICY_TYPE,
        VALUE: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
        TEXT: 'Multiple contract policy',
        HINT_LIST: [
          'Covers multiple contracts with the same buyer, usually for 12 months',
          "Best if you'll have an ongoing relationship with the buyer but you're not sure yet how many contracts or sales you'll have",
          'You only pay for your insurance each time you declare a new contract or sale - no need to pay before the policy starts',
        ],
      },
    },
    SUMMARY: {
      TITLE: 'Policy type',
    },
  },
  CONTRACT_POLICY: {
    [CONTRACT_POLICY.REQUESTED_START_DATE]: {
      LABEL: 'When do you want your policy to start?',
      HINT: 'For example, 6 11 2023',
      SUMMARY: {
        TITLE: 'Policy start date',
      },
    },
    [CONTRACT_POLICY.CREDIT_PERIOD_WITH_BUYER]: {
      LABEL: 'What credit period do you have with your buyer?',
      HINT: 'For example, 60 days after dispatching goods from your premises or 90 days after invoicing.',
      MAXIMUM: 1000,
      SUMMARY: {
        TITLE: 'Credit period',
      },
    },
    [CONTRACT_POLICY.POLICY_CURRENCY_CODE]: {
      LABEL: 'Select currency you want your policy to be issued in',
      HINT: [
        {
          text: "UKEF usually issues policies in pounds sterling, US dollars or euros. If you need a different currency, you'll need to ",
        },
        {
          text: 'apply using our form.',
          href: LINKS.EXTERNAL.NBI_FORM,
        },
      ],
      SUMMARY: {
        TITLE: 'Policy currency',
      },
    },
    SINGLE: {
      [CONTRACT_POLICY.SINGLE.CONTRACT_COMPLETION_DATE]: {
        LABEL: 'When do you expect to complete the export contract?',
        HINT: 'For example, 6 11 2024',
        SUMMARY: {
          TITLE: 'Date you expect contract to complete',
        },
      },
      [CONTRACT_POLICY.SINGLE.TOTAL_CONTRACT_VALUE]: {
        LABEL: "What's the total value of the contract you want to insure?",
        HINT: 'Enter a whole number - do not enter decimals.',
        SUMMARY: {
          TITLE: 'Contract value',
        },
      },
    },
    MULTIPLE: {
      [CONTRACT_POLICY.MULTIPLE.TOTAL_MONTHS_OF_COVER]: {
        LABEL: 'How many months do you want to be insured for?',
        HINT: `The maximum is ${APPLICATION.POLICY_AND_EXPORT.TOTAL_MONTHS_OF_COVER} months.`,
        OPTIONS: FIELD_VALUES.TOTAL_MONTHS_OF_COVER,
        SUMMARY: {
          TITLE: 'How many months you want to be insured for',
        },
      },
      [CONTRACT_POLICY.MULTIPLE.TOTAL_SALES_TO_BUYER]: {
        LABEL: 'Estimate total sales to your buyer during this time',
        HINT: 'Enter a whole number - do not enter decimals.',
        SUMMARY: {
          TITLE: 'Estimated sales during policy',
        },
      },
      [CONTRACT_POLICY.MULTIPLE.MAXIMUM_BUYER_WILL_OWE]: {
        LABEL: 'Estimate the maximum amount your buyer will owe you at any single point during this time',
        HINT: {
          FOR_EXAMPLE: 'For example, your total sales might be £250,000 but the maximum the buyer will owe you at any single point is £100,000.',
          NEED_MORE_COVER: 'If you need cover for more than £499,999, ',
          FILL_IN_FORM: {
            TEXT: 'fill in this form instead.',
            HREF: LINKS.EXTERNAL.NBI_FORM,
          },
          NO_DECIMALS: 'Enter a whole number - do not enter decimals.',
        },
        SUMMARY: {
          TITLE: 'Maximum owed at any single point during policy',
        },
      },
    },
  },
  ABOUT_GOODS_OR_SERVICES: {
    [ABOUT_GOODS_OR_SERVICES.DESCRIPTION]: {
      LABEL: "Describe the goods or services you want to insure and explain how they'll be used by the buyer",
      HINT: {
        INTRO: 'For example:',
        LIST: ['clothing items for retail sale', 'construction materials to build commercial property', 'educational services such as teacher training'],
      },
      MAXIMUM: 1000,
      SUMMARY: {
        TITLE: "Goods or services you're exporting",
      },
    },
    [ABOUT_GOODS_OR_SERVICES.FINAL_DESTINATION]: {
      LABEL: "What's the final destination of the goods or services?",
      SUMMARY: {
        TITLE: 'Final destination of export',
      },
    },
  },
};
