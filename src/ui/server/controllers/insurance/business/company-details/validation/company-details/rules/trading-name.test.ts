import tradingName from './trading-name';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../../constants';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../../types';

const {
  YOUR_COMPANY: { TRADING_NAME: FIELD_ID },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

const ERROR_MESSAGE = EXPORTER_BUSINESS[FIELD_ID];

describe('controllers/insurance/business/company-details/validation/company-details/rules/tradingName', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  it('should return the result of emptyFieldValidation', () => {
    const result = tradingName(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(result).toEqual(expected);
  });
});
