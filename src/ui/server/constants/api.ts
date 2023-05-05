// CIS = Country Information System

export const API = {
  CIS: {
    RISK: {
      VERY_HIGH: 'Very High',
      HIGH: 'High',
      STANDARD: 'Standard Risk',
    },
    SHORT_TERM_COVER_AVAILABLE: {
      YES: 'Yes',
      NO: 'No',
      ILC: 'ILC Only',
      CILC: 'CILC Only',
      REFER: 'Refer',
    },
    NBI_ISSUE_AVAILABLE: {
      YES: 'Y',
      NO: 'N',
    },
    INVALID_COUNTRIES: ['EC Market n/k', 'Non EC Market n/k', 'Non UK', 'Third Country'],
  },
  MAPPINGS: {
    RISK: {
      VERY_HIGH: 'Very High',
      HIGH: 'High',
      STANDARD: 'Standard',
    },
  },
};

export const EXTERNAL_API_ENDPOINTS = {
  MULESOFT_MDM_EA: {
    CURRENCY: '/currencies',
    INDUSTRY_SECTORS: '/sector-industries',
    MARKETS: '/markets',
  },
};
