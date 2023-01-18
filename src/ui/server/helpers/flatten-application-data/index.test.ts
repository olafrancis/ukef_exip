import flattenApplicationData from '.';
import { mockApplication } from '../../test-mocks';

describe('server/helpers/flatten-application-data', () => {
  it('should return an application with a flat structure with no nested objects', () => {
    const result = flattenApplicationData(mockApplication);

    const { eligibility, policyAndExport, exporterCompany, ...application } = mockApplication;

    const expected = {
      ...mockApplication.eligibility,
      buyerCountry: mockApplication.eligibility.buyerCountry.isoCode,
      ...mockApplication.policyAndExport,
      ...exporterCompany,
      ...application,
    };

    expect(result).toEqual(expected);
  });
});
