const LINKS = require('../../../links');
const { PRODUCT } = require('../../../../constants')

const MAX_COVER_AMOUNT = PRODUCT.MAX_COVER_AMOUNT_IN_GBP.toLocaleString('en', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const APPLY_OFFLINE = {
  PAGE_TITLE: 'You need to apply using our form',
  HEADING: 'You need to apply using our form',
  REASON: {
    INTRO: 'This is because',
    WANT_COVER_OVER_MAX_AMOUNT: `you want to be insured for more than ${MAX_COVER_AMOUNT} and we need to make extra checks.`,
    OTHER_PARTIES_INVOLVED: 'there are other parties involved in your exports and we need to make extra checks.',
    WILL_BE_PAID_BY_LETTER_OF_CREDIT: "you'll be paid by a letter of credit.",
    NEED_PRE_CREDIT_PERIOD_COVER: 'you need pre-credit cover.',
    NO_COMPANIES_HOUSE_NUMBER: 'you do not have a UK Companies House registration number',
  },
  ACTIONS: {
    DOWNLOAD_FORM: {
      LINK: {
        TEXT: 'Download this form',
        HREF: LINKS.EXTERNAL.NBI_FORM,
      },
      TEXT: "and email it to UKEF once you've filled it in.",
    },
    CONTACT: {
      TEXT: "If you'd like to discuss your exports or need help applying, you can",
      LINK: {
        TEXT: 'talk to your nearest export finance manager.',
        HREF: LINKS.EXTERNAL.EXPORT_FINANCE_MANAGERS,
      },
    },
  },
};

const SPEAK_TO_UKEF_EFM = {
  PAGE_TITLE: 'You need to speak with a UKEF export finance manager',
  HEADING: 'You need to speak with a UKEF export finance manager',
  REASON: {
    INTRO: 'This is because',
    WANT_COVER_OVER_MAX_PERIOD: `you want to be insured for longer than ${PRODUCT.MAX_COVER_PERIOD_YEARS} years.`,
  },
  ACTIONS: {
    FIND_EFM: [
      [
        {
          text: 'Find ',
        },
        {
          text: 'your nearest export finance manager',
          href: LINKS.EXTERNAL.EXPORT_FINANCE_MANAGERS,
        },
        {
          text: ' to discuss this.',
        },
      ],
    ],
  },
};

const CHECK_IF_ELIGIBLE = {
  PAGE_TITLE: 'Check you can apply for UKEF insurance for your export',
  HEADING: 'Check you can apply for UKEF insurance for your export',
  BODY: 'This will take a couple of minutes. If your export is eligible, you can start the application immediately.',
};

const INSURED_AMOUNT = {
  PAGE_TITLE: `Do you want to be insured for ${MAX_COVER_AMOUNT} or more?`,
  HEADING: `Do you want to be insured for ${MAX_COVER_AMOUNT} or more?`,
};

const INSURED_PERIOD = {
  PAGE_TITLE: `Do you want to be insured for longer than ${PRODUCT.MAX_COVER_PERIOD_YEARS} years?`,
  HEADING: `Do you want to be insured for longer than ${PRODUCT.MAX_COVER_PERIOD_YEARS} years?`,
};

const OTHER_PARTIES_INVOLVED = {
  PAGE_TITLE: 'Are there any other parties involved, apart from you and the buyer?',
  HEADING: 'Are there any other parties involved, apart from you and the buyer?',
  OTHER_PARTIES_DESCRIPTION: {
    INTRO: 'What counts as another party?',
    LIST_INTRO: 'This includes any:',
    LIST: [
      {
        TEXT: 'agents or third parties',
      },
      {
        TEXT: "companies who'll be jointly insured on the policy",
      },
      {
        TEXT: "'loss payees' who'll be paid in the event of a claim",
      },
      {
        TEXT: "other parties in your buyer's supply chain, who your buyer will depend on for payment before they can pay you - for example, an end-buyer",
      },
      {
        TEXT: "consortium or group you're involved in that has a significant role in these exports",
      },
    ]
  },
};

const LETTER_OF_CREDIT = {
  PAGE_TITLE: 'Will you be paid by a letter of credit?',
  HEADING: 'Will you be paid by a letter of credit?',
};

const PRE_CREDIT_PERIOD = {
  PAGE_TITLE: 'Do you need cover for a period before you supply the goods or services to the buyer?',
  HEADING: 'Do you need cover for a period before you supply the goods or services to the buyer?',
  PRE_CREDIT_PERIOD_DESCRIPTION: {
    INTRO: 'What is the pre-credit period?',
    BODY_1: 'This insures you for when you start working on the exports but before you send goods or extend any credit to your buyer.',
    LIST_INTRO: 'For example, you may incur costs when:',
    LIST: [
      {
        TEXT: 'manufacturing goods',
      },
      {
        TEXT: 'preparing services',
      },
    ],
    BODY_2: "But it's too early to invoice the buyer and recover these costs.",
    BODY_3: 'This is considered the pre-credit period.',
  },
};

const COMPANIES_HOUSE_NUMBER = {
  PAGE_TITLE: 'Do you have a UK Companies House registration number?',
  HEADING: 'Do you have a UK Companies House registration number?',
};

const ELIGIBLE_TO_APPLY_ONLINE = {
  PAGE_TITLE: "You're eligible to apply online",
  HEADING: "You're eligible to apply online",
  INSET: 'This does not automatically guarantee cover.',
  BODY: 'You now need to fill in the application so we can assess the risks around your exports and your buyer.',
  SUBMIT_BUTTON: 'Continue to application',
}; 

module.exports = {
  APPLY_OFFLINE,
  SPEAK_TO_UKEF_EFM,
  CHECK_IF_ELIGIBLE,
  INSURED_AMOUNT,
  INSURED_PERIOD,
  OTHER_PARTIES_INVOLVED,
  LETTER_OF_CREDIT,
  PRE_CREDIT_PERIOD,
  COMPANIES_HOUSE_NUMBER,
  ELIGIBLE_TO_APPLY_ONLINE,
};
