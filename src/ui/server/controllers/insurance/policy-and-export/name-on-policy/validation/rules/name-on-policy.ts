import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../types';

const {
  POLICY_AND_EXPORTS: {
    NAME_ON_POLICY: { NAME: FIELD_ID },
  },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      NAME_ON_POLICY: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

/**
 * nameOnPolicyRule
 * Returns the result of emptyFieldValidation
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const nameOnPolicyRule = (formBody: RequestBody, errors: object) => emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);

export default nameOnPolicyRule;
