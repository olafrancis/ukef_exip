const LINKS = require('../links');

const BUYER_BODY = {
  PAGE_TITLE: 'Is your buyer a government or public sector body?',
  HEADING: 'Is your buyer a government or public sector body?',
  DETAILS: {
    INTRO: 'What counts as a government or public sector body?',
    BODY_1: 'This means a formally established organisation that is, at least in part, publicly funded to deliver a public or government service.',
    BODY_2: 'For example, a central government department, a local authority or a public utlity company.',
  },
};

const UK_GOODS_OR_SERVICES = {
  WILL_CALCULATE_THOROUGHLY: "We'll also calculate this thoroughly if you go on to make a full application.",
};

const POLICY_TYPE = {
  PAGE_TITLE: 'What kind of policy do you need?',
  HEADING: 'What kind of policy do you need?',
};

const TELL_US_ABOUT_YOUR_POLICY = {
  SINGLE_POLICY_PAGE_TITLE: 'Tell us about the single contract policy you need',
  SINGLE_POLICY_HEADING: 'Tell us about the single contract policy you need',
  MULTI_POLICY_PAGE_TITLE: 'Tell us about the multiple contract policy you need',
  MULTI_POLICY_HEADING: 'Tell us about the multiple contract policy you need',
};

const CHECK_YOUR_ANSWERS = {
  PAGE_TITLE: 'Check your answers',
  HEADING: 'Check your answers',
  GROUP_HEADING_EXPORT: 'Export details',
  GROUP_HEADING_POLICY: 'Policy details',
  SUBMIT_BUTTON: 'Get your quote',
};

const CANNOT_APPLY = {
  PAGE_TITLE: 'You cannot apply for UKEF export insurance',
  HEADING: 'You cannot apply for UKEF export insurance',
  REASON: {
    INTRO: 'This is because',
    UNSUPPORTED_COMPANY_COUNTRY: 'your company is not based in the UK, Channel Islands or Isle of Man.',
    UNSUPPORTED_BUYER_COUNTRY_1: 'your buyer is based in',
    UNSUPPORTED_BUYER_COUNTRY_2: 'which we cannot provide cover for.',
    NOT_ENOUGH_UK_GOODS_OR_SERVICES: 'your export contract value is not made up from at least 20% UK goods or services.',
  },
  ACTIONS: {
    INTRO: 'You can:',
    ELIGIBILITY: {
      TEXT: 'read about',
      LINK: {
        TEXT: 'eligibility',
        HREF: LINKS.EXTERNAL.GUIDANCE,
      },
    },
    CONTACT_APPROVED_BROKER: {
      LINK: {
        TEXT: 'contact an approved broker',
        HREF: LINKS.EXTERNAL.APPROVED_BROKER_LIST,
      },
      TEXT: 'who may be able to help you get insurance from the private sector, if you`ve not tried already',
    },
  },
};

const GET_A_QUOTE_BY_EMAIL = {
  PAGE_TITLE: 'You need to get a quote by email',
  HEADING: 'You need to get a quote by email',
  REASON: {
    BUYER_BODY: 'We cannot give you a quote online because your buyer is a government or public sector body.',
    BUYER_BODY_DESCRIPTION: 'We can still give you a quote but may need extra information from you to assess the risks around your buyer first.',
    BUYER_COUNTRY: 'We cannot give you a quote online because of the country where your buyer is based.',
    BUYER_COUNTRY_DESCRIPTION: "We can still give you a quote but may need extra information from you to assess the risks around your buyer's country first.",
  },
  ACTION: [
    [
      {
        text: 'Download this form',
        href: LINKS.EXTERNAL.NBI_FORM,
      },
      {
        text: ' and fill it in. ',
      },
      {
        text: 'Email it to',
      },
      {
        text: 'exipunderwriting@ukexportfinance.gov.uk',
        href: 'mailto:exipunderwriting@ukexportfinance.gov.uk',
      },
    ],
  ],
};

const YOUR_QUOTE = {
  PAGE_TITLE: 'You can apply for UKEF export insurance',
  QUOTE: {
    HEADING: 'You can apply for UKEF export insurance',
    SUB_HEADING: 'Your quote',
  },
  NOTICE_1: 'This quote is not binding and does not commit UKEF to providing cover.',
  NOTICE_2: 'You need to make a full application to UKEF to confirm your eligibility and price.',
  NOTICE_3: 'Your price may be higher if our underwriters find additional risks with your export or buyer.',
  WHAT_HAPPENS_NEXT: {
    HEADING: 'What happens next?',
    INTRO: [
      [
        {
          text: 'You can now submit a',
        },
        {
          text: 'full application',
          href: LINKS.EXTERNAL.FULL_APPLICATION,
        },
        {
          text: '. ',
        },
        {
          text: 'It takes about 2 weeks to get a decision from UKEF.',
        },
      ],
      [
        {
          text: 'You can get help with the application process from export finance managers or brokers.',
        },
      ],
    ],
    EXPORT_FINANCE_MANAGERS: {
      HEADING: 'Export finance managers',
      ITEMS: [
        [
          {
            text: 'They work for UKEF and are available in every region. They can give you free guidance when making a full application. Find your',
          },
          {
            text: 'nearest export finance manager',
            href: LINKS.EXTERNAL.EXPORT_FINANCE_MANAGERS,
          },
          {
            text: '.',
          },
        ],
      ],
    },
    BROKERS: {
      HEADING: 'Brokers',
      ITEMS: [
        [
          {
            text: 'They act as an agent between you and UKEF. They can also help you with the application process.',
          },
        ],
        [
          {
            text: 'They receive a 15% fee for providing any successful policies at no extra cost to you. UKEF will pay their fee out of the policy premium you pay.',
          },
          {
            text: 'Use our approved broker list',
            href: LINKS.EXTERNAL.APPROVED_BROKER_LIST,
          },
          {
            text: ' to find a broker to help you.',
          },
        ],
      ],
    },
  },
};

const NEED_TO_START_AGAIN = {
  PAGE_TITLE: 'You need to start again',
  HEADING: 'You need to start again',
  REASON: 'This is because you have not yet answered all the eligibility questions.',
};

module.exports = {
  BUYER_BODY,
  UK_GOODS_OR_SERVICES,
  POLICY_TYPE,
  TELL_US_ABOUT_YOUR_POLICY,
  CHECK_YOUR_ANSWERS,
  CANNOT_APPLY,
  GET_A_QUOTE_BY_EMAIL,
  YOUR_QUOTE,
  NEED_TO_START_AGAIN,
};