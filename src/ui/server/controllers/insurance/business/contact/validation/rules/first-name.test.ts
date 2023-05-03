import firstName from './first-name';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/account';
import { RequestBody } from '../../../../../../../types';
import nameValidation from '../../../../../../shared-validation/name';

const { FIRST_NAME: FIELD_ID } = FIELD_IDS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;
const ERROR_MESSAGE = EXPORTER_BUSINESS[FIELD_ID];

describe('controllers/insurance/business/contact/validation/rules/first-name', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  it('should return the result of nameValidation', () => {
    const response = firstName(mockBody, mockErrors);

    const expected = nameValidation(mockBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(response).toEqual(expected);
  });
});