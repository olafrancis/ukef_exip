import { ROUTES, CONTACT_DETAILS } from '../constants';

export const FOOTER = {
  HEADING: 'Contact us',
  EMAIL: {
    HEADING: 'Email',
    VALUE: CONTACT_DETAILS.EMAIL.CUSTOMER_SERVICE,
  },
  PHONE: {
    HEADING: 'Phone',
    VALUE: CONTACT_DETAILS.TELEPHONE,
  },
  OPENING_TIMES: {
    HEADING: 'Opening times',
    VALUE: 'Monday to Friday, 9am to 5pm (excluding public holidays)',
  },
  SUPPORT_LINKS_HEADING: 'Support Links',
  PRIVACY: {
    TEXT: 'Privacy',
    HREF: 'https://www.gov.uk/government/publications/ukef-privacy-notice',
  },
  COOKIES: {
    TEXT: 'Cookies',
    HREF: ROUTES.COOKIES,
  },
  REPORT_VULNERABILITY: {
    TEXT: 'Report a vulnerability',
    HREF: 'https://www.gov.uk/guidance/report-a-vulnerability-on-a-ukef-system',
  },
  OGL_LICENCE: {
    INTRO: 'All content is available under the',
    LICENCE: 'Open Government Licence v3.0',
    DISCLAIMER: 'except where otherwise stated',
    HREF: 'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3',
  },
  CROWN_COPYRIGHT: {
    TEXT: 'Crown copyright',
    HREF: 'https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/',
  },
};
