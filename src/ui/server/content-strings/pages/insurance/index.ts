import { GBP_CURRENCY_CODE, PRODUCT } from '../../../constants';
import { LINKS } from '../../links';
import ELIGIBILITY from './eligibility';
import ACCOUNT from './account';
import POLICY_AND_EXPORTS from './policy-and-exports';
import EXPORTER_BUSINESS from './your-business';
import YOUR_BUYER from './your-buyer';
import DECLARATIONS from './declarations';
import CHECK_YOUR_ANSWERS from './check-your-answers';
import formatCurrency from '../../../helpers/format-currency';

const MAX_COVER_AMOUNT = formatCurrency(PRODUCT.MAX_COVER_AMOUNT_IN_GBP, GBP_CURRENCY_CODE, 0);

const DASHBOARD = {
  PAGE_TITLE: 'Dashboard',
};

const ALL_SECTIONS = {
  PAGE_TITLE: 'Apply for UKEF export insurance',
  DEADLINE_TO_SUBMIT: 'Deadline to submit',
  REFERENCE_NUMBER: 'Your reference',
};

const APPLY_OFFLINE = {
  PAGE_TITLE: 'You need to apply using our form',
  REASON: {
    INTRO: 'This is because',
    WANT_COVER_OVER_MAX_AMOUNT: `you want to be insured for more than ${MAX_COVER_AMOUNT} and we need to make extra checks.`,
    OTHER_PARTIES_INVOLVED: 'there are other parties involved in your exports and we need to make extra checks.',
    WILL_BE_PAID_BY_LETTER_OF_CREDIT: "you'll be paid by a letter of credit.",
    NEED_PRE_CREDIT_PERIOD_COVER: 'you need pre-credit cover and we need to make extra checks.',
    NO_COMPANIES_HOUSE_NUMBER: 'you do not have a UK Companies House registration number so we need to make extra checks.',
  },
  ACTIONS: {
    DOWNLOAD_FORM: {
      LINK: {
        TEXT: 'Download this form',
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

const START = {
  PAGE_TITLE: 'Apply for UKEF export insurance',
  INTRO: 'Use this service to make a full application for export insurance from UK Export Finance (UKEF).',
  LIST: {
    INTRO: "You'll need your:",
    ITEMS: [
      'company details and finances',
      "buyer's details",
      "trading history with the buyer, if you've worked together before",
      'code of conduct, if you have one',
    ],
  },
  BODY_1: "Depending on your export contract, you may also need your buyer's annual report and accounts.",
  BODY_2: 'You do not need to complete all answers in one session.',
  BODY_3: "You'll usually get a decision back from UKEF within 2 weeks. This is because underwriters need to carry out checks on risks around the buyer.",
  BODY_4: 'If you need it more urgently, you can tell us before you submit your application.',
};

const NO_ACCESS_TO_APPLICATION_PAGE = {
  PAGE_TITLE: "You don't have access to this application",
  CHECK_URL: "Please check the URL you've entered.",
};

export default {
  START,
  ACCOUNT,
  DASHBOARD,
  ALL_SECTIONS,
  APPLY_OFFLINE,
  EXPORTER_BUSINESS,
  ELIGIBILITY,
  POLICY_AND_EXPORTS,
  SPEAK_TO_UKEF_EFM,
  YOUR_BUYER,
  NO_ACCESS_TO_APPLICATION_PAGE,
  DECLARATIONS,
  CHECK_YOUR_ANSWERS,
};
