import { RequestBody } from 'express';
import generateValidationErrors from '../../../../../helpers/validation';
import { FIELDS } from '../../../../../content-strings/fields/insurance/your-buyer';
import { objectHasProperty } from '../../../../../helpers/object';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import { FIELD_IDS } from '../../../../../constants';

const { YOUR_BUYER } = FIELDS;

/**
 * countryRules.
 * Check submitted form data for errors with the all mandatory fields
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
export const countryRules = (formBody: RequestBody, errors: object) => {
  const updatedErrors = errors;
  // check if the Country field is empty.
  if (!objectHasProperty(formBody, YOUR_BUYER.BUYER_COUNTRY.ID)) {
    return generateValidationErrors(YOUR_BUYER.BUYER_COUNTRY.ID, ERROR_MESSAGES[FIELD_IDS.COUNTRY].IS_EMPTY, errors);
  }

  return updatedErrors;
};