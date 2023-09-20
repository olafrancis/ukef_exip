import mapAndSave from '.';
import save from '../save-data';
import { mockApplication } from '../../../../test-mocks';

describe('controllers/insurance/policy-and-export/map-and-save - api errors', () => {
  jest.mock('../save-data');

  const mockFormBody = {
    _csrf: '1234',
    mock: true,
  };

  describe('when save application policy call does not return anything', () => {
    beforeEach(() => {
      save.policy = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.policy(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application policy call fails', () => {
    beforeEach(() => {
      save.policy = jest.fn(() => Promise.reject(new Error('Mock error')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.policy(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
