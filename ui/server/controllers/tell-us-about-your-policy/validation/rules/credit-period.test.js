const rule = require('./credit-period');
const { FIELD_IDS, FIELD_VALUES } = require('../../../../constants');
const CONTENT_STRINGS = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');

describe('controllers/tell-us-about-your-policy/validation/rules/credit-period', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe('when policy type is multi', () => {
    describe(`when ${FIELD_IDS.CREDIT_PERIOD} is not provided`, () => {
      it('should return validation error', () => {
        const mockSubmittedData = {
          [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
          [FIELD_IDS.CREDIT_PERIOD]: '',
        };

        const result = rule(mockSubmittedData, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.CREDIT_PERIOD,
          CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].IS_EMPTY,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.CREDIT_PERIOD} has a decimal`, () => {
      it('should return validation error', () => {
        const mockSubmittedData = {
          [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
          [FIELD_IDS.CREDIT_PERIOD]: '1.2',
        };

        const result = rule(mockSubmittedData, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.CREDIT_PERIOD,
          CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].NOT_A_WHOLE_NUMBER,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.CREDIT_PERIOD} is not a number`, () => {
      it('should return validation error', () => {
        const mockSubmittedData = {
          [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
          [FIELD_IDS.CREDIT_PERIOD]: 'invalid',
        };

        const result = rule(mockSubmittedData, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.CREDIT_PERIOD,
          CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].NOT_A_NUMBER,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.CREDIT_PERIOD} is below the minimum`, () => {
      it('should return validation error', () => {
        const mockSubmittedData = {
          [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
          [FIELD_IDS.CREDIT_PERIOD]: '0',
        };

        const result = rule(mockSubmittedData, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.CREDIT_PERIOD,
          CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].BELOW_MINIMUM,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.CREDIT_PERIOD} is below the maximum`, () => {
      it('should return validation error', () => {
        const mockSubmittedData = {
          [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
          [FIELD_IDS.CREDIT_PERIOD]: '3',
        };

        const result = rule(mockSubmittedData, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.CREDIT_PERIOD,
          CONTENT_STRINGS.ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].ABOVE_MAXIMUM,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });

    describe('when there are no validation errors', () => {
      it('should return the already provided errors', () => {
        const mockSubmittedData = {
          [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
          [FIELD_IDS.CREDIT_PERIOD]: '1',
        };

        const result = rule(mockSubmittedData, mockErrors);

        expect(result).toEqual(mockErrors);
      });
    });
  });

  describe('when policy type is single', () => {
    it('should not return any validation errors', () => {
      const mockSubmittedData = {
        [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
      };

      const result = rule(mockSubmittedData, mockErrors);

      const expected = mockErrors;

      expect(result).toEqual(expected);
    });
  });
});
