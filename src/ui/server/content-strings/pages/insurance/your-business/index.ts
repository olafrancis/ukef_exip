import { COMPANY_DETAILS } from './company';

const SHARED = {
  HEADING_CAPTION: 'Your business',
};

const EXPORTER_BUSINESS = {
  ROOT: {
    PAGE_TITLE: 'Tell us about your business',
    INTRO: 'In this section, we want to understand more about your business and the types of products or services you export.',
    LIST: {
      INTRO: "We'll ask you to tell us:",
      ITEMS: [
        'what your estimated annual turnover is for this year',
        'if you have any credit management processes',
        'about any other credit insurance you have in place',
      ],
    },
    OUTRO: 'It should only take a few minutes to complete.',
  },
  COMPANIES_HOUSE_NUMBER: {
    ...SHARED,
    PAGE_TITLE: 'Enter your Companies House registration number (CRN)',
    NO_COMPANIES_HOUSE_NUMBER: 'I do not have a UK Companies House registration number',
  },
  COMPANY_DETAILS: {
    ...SHARED,
    ...COMPANY_DETAILS,
  },
  COMPANIES_HOUSE_UNAVAILABLE: {
    ...SHARED,
    PAGE_TITLE: 'You cannot search for your Companies House registration number right now',
    ERROR_REASON: 'This is due to technical issues with the Companies House search',
    TRY_AGAIN_PREFIX: 'You can',
    TRY_AGAIN: 'try again in a few minutes.',
    CONTINUE_PREFIX: 'Or you can continue filling in',
    CONTINUE_LINK: 'other sections of your application,',
    CONTINUE_SUFFIX: 'until this problem is resolved',
    INFORMATION: '(You may lose any information you entered on the previous page.)',
  },
  ALTERNATIVE_TRADING_ADDRESS: {
    ...SHARED,
    PAGE_TITLE: 'Alternative trading address',
  },
  NATURE_OF_YOUR_BUSINESS: {
    ...SHARED,
    PAGE_TITLE: 'Nature of your business',
  },
  TURNOVER: {
    ...SHARED,
    PAGE_TITLE: 'Turnover',
    PROVIDE_ALTERNATIVE_CURRENCY: 'Provide turnover in an alternative currency',
  },
  TURNOVER_CURRENCY: {
    ...SHARED,
    PAGE_TITLE: 'What currency is your turnover in?',
  },
  CREDIT_CONTROL: {
    ...SHARED,
    PAGE_TITLE: 'Do you have a process for dealing with late payments?',
  },
  BROKER: {
    ...SHARED,
    PAGE_TITLE: 'Are you using a broker to get this insurance?',
    SUMMARY: 'Why appoint a broker?',
    LINE_1: 'A broker can advise you during the application process and lifetime of any UKEF insurance policy.',
    LINE_2: 'You can find your nearest one on',
    LINK_TEXT: "UKEF's list of approved brokers.",
    LINE_3: 'Alternatively, you can use any broker you prefer. They do not have to be approved by UKEF.',
    LINE_4: 'Appointing a broker does not change the cost to you of any UKEF credit insurance policy.',
  },
  CHECK_YOUR_ANSWERS: {
    ...SHARED,
    PAGE_TITLE: 'Check your answers for this section',
  },
};

export default EXPORTER_BUSINESS;
