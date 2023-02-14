import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/exporter-business';
import { RequestBody } from '../../../../../../../types';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';

const {
  BROKER: { TOWN: FIELD_ID, USING_BROKER },
} = FIELD_IDS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validates broker town field
 * checks if response has been provided
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const brokerTown = (responseBody: RequestBody, errors: object) => {
  // if USING_BROKER radio is yes then check validation
  if (responseBody[USING_BROKER] === 'Yes') {
    return emptyFieldValidation(responseBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
  }

  return errors;
};

export default brokerTown;