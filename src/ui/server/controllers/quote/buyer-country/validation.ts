import { FIELD_IDS } from '../../../constants';
import { ERROR_MESSAGES } from '../../../content-strings';
import generateValidationErrors from '../../../helpers/validation';
import { objectHasValues, objectHasProperty } from '../../../helpers/object';
import { RequestBody } from '../../../../types';

const hasErrors = (formBody: RequestBody) => {
  if (!objectHasValues(formBody)) {
    return true;
  }

  if (!objectHasProperty(formBody, FIELD_IDS.BUYER_COUNTRY)) {
    return true;
  }

  return false;
};

const validation = (formBody: RequestBody) => {
  let errors;

  if (hasErrors(formBody)) {
    errors = generateValidationErrors(FIELD_IDS.BUYER_COUNTRY, ERROR_MESSAGES[FIELD_IDS.BUYER_COUNTRY]);

    return errors;
  }

  return null;
};

export { hasErrors, validation };
