import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';
import { objectHasProperty } from '../../../../../../helpers/object';
import generateValidationErrors from '../../../../../../helpers/validation';
import { FIELDS } from '../../../../../../content-strings/fields/insurance/your-business';

const { NATURE_OF_YOUR_BUSINESS: NATURE_OF_YOUR_BUSINESS_FIELDS } = FIELDS;

const {
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

/**
 * validates goods or services input
 * errors if empty or more than 1000 characters
 * @param {RequestBody} responseBody
 * @param {object} errors
 * @returns {object} errors
 */
const goodsOrServices = (responseBody: RequestBody, errors: object) => {
  // if body is empty
  if (!objectHasProperty(responseBody, GOODS_OR_SERVICES)) {
    const errorMessage = EXPORTER_BUSINESS[GOODS_OR_SERVICES].IS_EMPTY;

    return generateValidationErrors(GOODS_OR_SERVICES, errorMessage, errors);
  }

  if (responseBody[GOODS_OR_SERVICES].length > NATURE_OF_YOUR_BUSINESS_FIELDS[GOODS_OR_SERVICES].MAXIMUM) {
    // check if the field is above the maximum
    const errorMessage = EXPORTER_BUSINESS[GOODS_OR_SERVICES].ABOVE_MAXIMUM;

    return generateValidationErrors(GOODS_OR_SERVICES, errorMessage, errors);
  }

  return errors;
};

export default goodsOrServices;
