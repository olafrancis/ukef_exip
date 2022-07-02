const FIELD_IDS = require('./field-ids');
const ROUTES = require('./routes');
const { FIELDS } = require('../content-strings');

const {
  VALID_COMPANY_BASE,
  BUYER_COUNTRY,
  AMOUNT,
} = FIELD_IDS;

const FIELD_GROUPS = {
  EXPORT_DETAILS: [
    {
      ID: BUYER_COUNTRY,
      ...FIELDS[BUYER_COUNTRY],
      CHANGE_ROUTE: ROUTES.BUYER_BASED_CHANGE,
    },
    {
      ID: VALID_COMPANY_BASE,
      ...FIELDS[VALID_COMPANY_BASE],
      CHANGE_ROUTE: ROUTES.COMPANY_BASED_CHANGE,
    },
  ],
  DEAL_DETAILS: [
    {
      ID: AMOUNT,
      ...FIELDS[AMOUNT],
      CHANGE_ROUTE: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
    },
  ],
};

module.exports = FIELD_GROUPS;
