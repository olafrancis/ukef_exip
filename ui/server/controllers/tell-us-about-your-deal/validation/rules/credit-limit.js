const { FIELD_IDS } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');
const { objectHasProperty } = require('../../../../helpers/object');
const isNumber = require('../../../../helpers/number');

const creditLimitRules = (formBody, errors) => {
  let updatedErrors = errors;

  if (objectHasProperty(formBody, FIELD_IDS.CREDIT_LIMIT) && !isNumber(Number(formBody[FIELD_IDS.CREDIT_LIMIT]))) {
    updatedErrors = generateValidationErrors(
      FIELD_IDS.CREDIT_LIMIT,
      CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.CREDIT_LIMIT].NOT_A_NUMBER,
      errors,
    );
  }

  return updatedErrors;
};

module.exports = creditLimitRules;
