const PRODUCT = require('./product');

const LANDING_PAGE = {
  PAGE_TITLE: PRODUCT.DESCRIPTION,
  HEADING: PRODUCT.DESCRIPTION,
  INTRO_1: 'If you’re an exporter and having problems getting export insurance, you may be able to get cover from UK Export Finance (UKEF).',
  INTRO_2: 'This is sometimes known as credit insurance.',
  INTRO_3: 'You can get cover for up to 2 years (credit terms)',

  COVERS: {
    HEADING: 'What UK export insurance covers',
    INTRO: 'It covers you if:',
    LIST: [
      {
        text: 'your buyer fails to pay you for an export',
      },
      {
        text: 'you lose money when a contract cannot be carried out or is terminated early due to certain events',
      },
    ],
  },
  USE_SERVICE_TO: {
    INTRO: 'Use this service to:',
    LIST: [
      {
        text: 'check if you\'re eligible',
      },
      {
        text: 'get a non-binding quote for single or multiple exports to one buyer',
      },
    ],
  },
  YOU_WILL_NEED: 'You`ll need to get a separate quote for each buyer you want to export to.',
  COMPLETION_TIME: 'It takes around 5 minutes.',
  SUBMIT_BUTTON: 'Start now',
};

const COMPANY_BASED_PAGE = {
  PAGE_TITLE: 'Is your company based inside the UK, Channel Islands and Isle of Man?',
  HEADING: 'Is your company based inside the UK, Channel Islands and Isle of Man?',
};

const BUYER_BASED_PAGE = {
  PAGE_TITLE: 'In which country is your buyer based?',
  HEADING: 'In which country is your buyer based?',
};

const TRIED_TO_OBTAIN_COVER_PAGE = {
  PAGE_TITLE: 'Are you unable to get insurance for this export from companies in the private sector?',
  HEADING: 'Are you unable to get insurance for this export from companies in the private sector?',
};

const UK_CONTENT_PERCENTAGE_PAGE = {
  PAGE_TITLE: 'Is at least 20% of your export made up of UK goods or services?',
  HEADING: 'Is at least 20% of your export made up of UK goods or services?',
  DETAILS: {
    INTRO: 'I\'m not sure',
    ITEMS: [
      [
        {
          text: 'Your export must be made up of at least 20% UK goods or services to be eligible for UKEF export insurance.',
        },
      ],
      [
        {
          text: 'You can get help with this question from one of our',
        },
        {
          text: 'Export Finance Managers',
          href: '#',
        },
        {
          text: 'if you want to work out if you\'re eligible or not.',
        },
      ],
      [
        {
          text: 'We\'ll also calculate this amount exactly with you later if you decide to go ahead and make a full application.',
        },
      ],
    ],
  },
};

const TELL_US_ABOUT_YOUR_DEAL_PAGE = {
  PAGE_TITLE: 'Tell us about your deal',
  HEADING: 'Tell us about your deal',
  DESCRIPTION: 'To give you a quote, we need some more information.',
};

const CHECK_YOUR_ANSWERS_PAGE = {
  PAGE_TITLE: 'Check your answers before you submit',
  HEADING: 'Check your answers before you submit',
  GROUP_HEADING_COMPANY: 'Company details',
  GROUP_HEADING_EXPORT: 'Export details',
  GROUP_HEADING_DEAL: 'Deal details',
};

const CANNOT_OBTAIN_COVER_PAGE = {
  PAGE_TITLE: 'You cannot apply for UKEF export insurance',
  HEADING: 'You cannot apply for UKEF export insurance',
  REASON: {
    INTRO: 'This is because',
    UNSUPPORTED_BUYER_COUNTRY: 'your buyer is based in a country we cannot provide cover for.',
    CAN_GET_PRIVATE_INSURANCE: 'you\'re able to get insurance for this export from companies in the private sector.',
    HAVE_NOT_TRIED_PRIVATE_INSURANCE: 'you\'ve not yet tried to get this from private insurers.',
    NOT_ENOUGH_UK_GOODS_OR_SERVICES: 'your export does not contain enough UK goods or services.',
  },
  ACTIONS: {
    INTRO: 'You can:',
    ELIGIBILITY: {
      TEXT: 'read about',
      LINK: {
        TEXT: 'eligibility',
        HREF: '#',
      },
    },
    CONTACT_APPROVED_BROKER: {
      LINK: {
        TEXT: 'contact an approved broker',
        HREF: '#',
      },
      TEXT: 'who may be able to help you get insurance from the private sector, if you`ve not tried already',
    },
  },
};

const PAGE_NOT_FOUND_PAGE = {
  PAGE_TITLE: 'Page not found',
  HEADING: 'Page not found',
  BODY_1: 'If you typed the web address, check it is correct.',
  BODY_2: 'If you pasted the web address, check you copied the entire address.',
};

const PROBLEM_WITH_SERVICE_PAGE = {
  PAGE_TITLE: 'Problem with the service',
  HEADING: 'Sorry, there is a problem with the service',
};

module.exports = {
  LANDING_PAGE,
  COMPANY_BASED_PAGE,
  BUYER_BASED_PAGE,
  TRIED_TO_OBTAIN_COVER_PAGE,
  UK_CONTENT_PERCENTAGE_PAGE,
  TELL_US_ABOUT_YOUR_DEAL_PAGE,
  CHECK_YOUR_ANSWERS_PAGE,
  CANNOT_OBTAIN_COVER_PAGE,
  PAGE_NOT_FOUND_PAGE,
  PROBLEM_WITH_SERVICE_PAGE,
};
