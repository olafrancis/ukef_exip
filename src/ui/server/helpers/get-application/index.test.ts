import getApplication from '.';
import api from '../../api';
import { mockApplication } from '../../test-mocks';

describe('helpers/get-application', () => {
  let getApplicationSpy;

  it('should call api.keystone.application.get', async () => {
    getApplicationSpy = jest.fn(() => Promise.resolve());
    api.keystone.application.get = getApplicationSpy;

    await getApplication(mockApplication.referenceNumber);

    expect(getApplicationSpy).toHaveBeenCalledTimes(1);
    expect(getApplicationSpy).toHaveBeenCalledWith(mockApplication.referenceNumber);
  });

  describe('when there is no application', () => {
    it('should return false', async () => {
      getApplicationSpy = jest.fn(() => Promise.resolve());
      api.keystone.application.get = getApplicationSpy;

      const result = await getApplication(mockApplication.referenceNumber);

      expect(result).toEqual(false);
    });
  });

  describe('when there is no application.policyAndExport', () => {
    it('should return false', async () => {
      getApplicationSpy = jest.fn(() => Promise.resolve({}));
      api.keystone.application.get = getApplicationSpy;

      const result = await getApplication(mockApplication.referenceNumber);

      expect(result).toEqual(false);
    });
  });

  describe('when there is no application.policyAndExport.id', () => {
    it('should return false', async () => {
      getApplicationSpy = jest.fn(() => Promise.resolve({ policyAndExport: {} }));
      api.keystone.application.get = getApplicationSpy;

      const result = await getApplication(mockApplication.referenceNumber);

      expect(result).toEqual(false);
    });
  });

  describe('when the api call fails', () => {
    it('should return false', async () => {
      getApplicationSpy = jest.fn(() => Promise.reject(new Error('Mock error')));
      api.keystone.application.get = getApplicationSpy;

      const result = await getApplication(mockApplication.referenceNumber);

      expect(result).toEqual(new Error('Mock error'));
    });
  });

  it('should return the application', async () => {
    getApplicationSpy = jest.fn(() => Promise.resolve(mockApplication));
    api.keystone.application.get = getApplicationSpy;

    const result = await getApplication(mockApplication.referenceNumber);

    expect(result).toEqual(mockApplication);
  });
});