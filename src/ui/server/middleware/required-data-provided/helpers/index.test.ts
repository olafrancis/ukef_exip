import { getRoutesAsArray, routeIsKnown, hasRequiredData } from '.';
import { ROUTES } from '../../../constants';
import { generateRequiredData } from '../insurance/eligibility';
import { mockSession } from '../../../test-mocks';

const { INSURANCE } = ROUTES;

describe('middleware/required-data-provided/helpers', () => {
  const mockRoutes = {
    a: 'A',
    b: 'B',
  };

  describe('getRoutesAsArray', () => {
    it('should return all routes as an array of strings', () => {
      const result = getRoutesAsArray(mockRoutes);

      const expected = Object.values(mockRoutes);

      expect(result).toEqual(expected);
    });
  });

  describe('routeIsKnown', () => {
    describe('when a route is in the list of routes', () => {
      it('should return true', () => {
        const routes = getRoutesAsArray(mockRoutes);
        const route = mockRoutes.b;

        const result = routeIsKnown(routes, route);

        expect(result).toEqual(true);
      });
    });

    describe('when a route is NOT in the list of routes', () => {
      it('should return false', () => {
        const routes = getRoutesAsArray(mockRoutes);
        const route = '/unknown-404-page';

        const result = routeIsKnown(routes, route);

        expect(result).toEqual(false);
      });
    });
  });

  describe('hasRequiredData', () => {
    const mockRequiredDataState = generateRequiredData();

    describe('when total amount of submitted fields matches the total of required fields', () => {
      it('should return true', () => {
        const result = hasRequiredData(INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, mockRequiredDataState, mockSession.submittedData.insuranceEligibility);

        expect(result).toEqual(true);
      });
    });

    describe('when total amount of submitted fields does NOT match the total of required fields', () => {
      it('should return false', () => {
        const result = hasRequiredData(INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, mockRequiredDataState, {});

        expect(result).toEqual(false);
      });
    });
  });
});
