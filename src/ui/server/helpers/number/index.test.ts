import { isNumber, numberHasDecimal, getPercentageOfNumber, isNumberBelowMinimum, isNumberAboveMaximum } from '.';

describe('server/helpers/number', () => {
  describe('isNumber', () => {
    describe('when a string is provided', () => {
      it('should return false', () => {
        const result = isNumber('test');

        expect(result).toEqual(false);
      });
    });

    describe('when a number is provided', () => {
      it('should return true', () => {
        const result = isNumber(1);

        expect(result).toEqual(true);
      });
    });
  });

  describe('numberHasDecimal', () => {
    describe('when number has a decimal', () => {
      it('should return true', () => {
        const result = numberHasDecimal(1.234);

        expect(result).toEqual(true);
      });
    });

    describe('when a number is does NOT have a decimal', () => {
      it('should return false', () => {
        const result = numberHasDecimal(1);

        expect(result).toEqual(false);
      });
    });
  });

  describe('getPercentageOfNumber', () => {
    it('should return percentage value of a number', () => {
      const mockPercent = 20;
      const mockTotal = 1000;

      const result = getPercentageOfNumber(mockPercent, mockTotal);

      const expected = '200.00';

      expect(result).toEqual(expected);
    });
  });

  describe('isNumberBelowMinimum', () => {
    it('should return false if value is above minimum', () => {
      const mockValue = 10;
      const mockMinimum = 0;

      const result = isNumberBelowMinimum(mockValue, mockMinimum);

      expect(result).toEqual(false);
    });

    it('should return false if value is the same as minimum', () => {
      const mockValue = 0;
      const mockMinimum = 0;

      const result = isNumberBelowMinimum(mockValue, mockMinimum);

      expect(result).toEqual(false);
    });

    it('should return false if value is the below minimum', () => {
      const mockValue = -1;
      const mockMinimum = 0;

      const result = isNumberBelowMinimum(mockValue, mockMinimum);

      expect(result).toEqual(true);
    });
  });

  describe('isNumberAboveMaximum', () => {
    it('should return true if value is above maximum', () => {
      const mockValue = 101;
      const mockMaximum = 100;

      const result = isNumberAboveMaximum(mockValue, mockMaximum);

      expect(result).toEqual(true);
    });

    it('should return false if value is the same as maximum', () => {
      const mockValue = 100;
      const mockMaximum = 100;

      const result = isNumberAboveMaximum(mockValue, mockMaximum);

      expect(result).toEqual(false);
    });

    it('should return false if value is the below maximum', () => {
      const mockValue = 50;
      const mockMaximum = 100;

      const result = isNumberAboveMaximum(mockValue, mockMaximum);

      expect(result).toEqual(false);
    });
  });
});
