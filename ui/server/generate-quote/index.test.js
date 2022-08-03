const {
  getContractCost,
  getTotalMonths,
  calculateCost,
  generateQuote,
} = require('.');
const {
  FIELD_IDS,
  FIELD_VALUES,
} = require('../constants');
const { getPremiumRate } = require('./get-premium-rate');
const { getPercentageOfNumber } = require('../helpers/number');
const { mockSession } = require('../test-mocks');

const {
  BUYER_COUNTRY,
  CONTRACT_VALUE,
  CREDIT_PERIOD,
  CURRENCY,
  MAX_AMOUNT_OWED,
  PERCENTAGE_OF_COVER,
  POLICY_TYPE,
  POLICY_LENGTH,
  QUOTE,
} = FIELD_IDS;

describe('server/generate-quote/index', () => {
  describe('getContractCost', () => {
    describe('when policy type is single', () => {
      it(`should return ${CONTRACT_VALUE} from submitted data`, () => {
        const mockSubmittedData = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
          [CONTRACT_VALUE]: 1234,
        };

        const result = getContractCost(mockSubmittedData);
        const expected = mockSubmittedData[CONTRACT_VALUE];

        expect(result).toEqual(expected);
      });
    });

    describe('when policy type is multi', () => {
      it(`should return ${MAX_AMOUNT_OWED} from submitted data`, () => {
        const mockSubmittedData = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
          [MAX_AMOUNT_OWED]: 1234,
        };

        const result = getContractCost(mockSubmittedData);
        const expected = mockSubmittedData[MAX_AMOUNT_OWED];

        expect(result).toEqual(expected);
      });
    });

    it('should return 0', () => {
      const result = getContractCost({});

      expect(result).toEqual(0);
    });
  });

  describe('getTotalMonths', () => {
    describe('when policy type is single', () => {
      it('should return the total of policy length + business buffer months', () => {
        const mockPolicyType = FIELD_VALUES.POLICY_TYPE.SINGLE;
        const mockPolicyLength = 5;

        const result = getTotalMonths(
          mockPolicyType,
          mockPolicyLength,
        );

        const expected = (mockPolicyLength + 1);

        expect(result).toEqual(expected);
      });
    });

    describe('when policy type is multi', () => {
      it('should return the total of credit period + policy length + business buffer months', () => {
        const mockPolicyType = FIELD_VALUES.POLICY_TYPE.MULTI;
        const mockPolicyLength = 6;
        const mockCreditPeriod = 2;

        const result = getTotalMonths(
          mockPolicyType,
          mockPolicyLength,
          mockCreditPeriod,
        );

        const expected = (mockPolicyLength + mockCreditPeriod + 1);

        expect(result).toEqual(expected);
      });
    });

    describe('when policy type is not single or multi (invalid)', () => {
      it('should return 0', () => {
        const mockPolicyType = 'incorrect';
        const mockPolicyLength = 1;
        const mockCreditPeriod = 2;

        const result = getTotalMonths(
          mockPolicyType,
          mockPolicyLength,
          mockCreditPeriod,
        );

        expect(result).toEqual(0);
      });
    });
  });

  describe('calculateCost', () => {
    it('should return a percentage of a number', () => {
      const mockPremiumRate = 2.3;
      const mockAmount = 1000;

      const result = calculateCost(mockPremiumRate, mockAmount);

      const expected = Number(getPercentageOfNumber(mockPremiumRate, mockAmount));

      expect(result).toEqual(expected);
    });
  });

  describe('generateQuote', () => {
    it('should return a quote', () => {
      const mockSubmittedData = mockSession.submittedData;

      const result = generateQuote(mockSubmittedData);

      const mockPercentageOfCover = 90;

      const expectedTotalMonths = getTotalMonths(
        mockSubmittedData[POLICY_TYPE],
        mockSubmittedData[POLICY_LENGTH],
        mockSubmittedData[CREDIT_PERIOD],
      );

      const expectedPremiumRate = getPremiumRate(
        mockSubmittedData[POLICY_TYPE],
        mockSubmittedData[BUYER_COUNTRY].riskCategory,
        expectedTotalMonths,
        mockPercentageOfCover,
      );

      const expected = {
        [QUOTE.INSURED_FOR]: getContractCost(mockSubmittedData),
        [QUOTE.BUYER_LOCATION]: mockSubmittedData[BUYER_COUNTRY],
        [CURRENCY]: mockSubmittedData[CURRENCY],
        [CREDIT_PERIOD]: mockSubmittedData[CREDIT_PERIOD],
        [PERCENTAGE_OF_COVER]: mockSubmittedData[PERCENTAGE_OF_COVER],
        [POLICY_TYPE]: mockSubmittedData[POLICY_TYPE],
        [POLICY_LENGTH]: mockSubmittedData[POLICY_LENGTH],
      };

      expected[QUOTE.PREMIUM_RATE_PERCENTAGE] = expectedPremiumRate;
      expected[QUOTE.ESTIMATED_COST] = calculateCost(expectedPremiumRate, expected[QUOTE.INSURED_FOR]);

      expect(result).toEqual(expected);
    });
  });
});
