import save from '.';
import api from '../../../../api';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import getDataToSave from '../../../../helpers/get-data-to-save';
import stripEmptyFormFields from '../../../../helpers/strip-empty-form-fields';
import { FIELD_IDS } from '../../../../constants';
import { mockApplication, mockBuyer } from '../../../../test-mocks';
import generateValidationErrors from '../../../../helpers/validation';

const {
  COMPANY_OR_ORGANISATION: { ADDRESS },
} = FIELD_IDS.INSURANCE.YOUR_BUYER;

describe('controllers/insurance/your-buyer/save-data', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  describe('exporterBroker', () => {
    const mockFormBody = mockBuyer;

    beforeEach(() => {
      api.keystone.application.update.buyer = updateApplicationSpy;
    });

    describe('when errorList is provided', () => {
      const mockValidationErrors = generateValidationErrors(ADDRESS, 'error', {});

      it(`should call api.keystone.application.update.buyer with all fields but not ${ADDRESS}`, async () => {
        await save.buyer(mockApplication, mockFormBody, mockValidationErrors.errorList);

        expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

        const dataToSave = stripEmptyFormFields(getDataToSave(mockFormBody, mockValidationErrors.errorList));
        const expectedSanitisedData = sanitiseData(dataToSave);
        expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.buyer.id, expectedSanitisedData);
      });

      it('should return the API response', async () => {
        const result = await save.buyer(mockApplication, mockFormBody);

        expect(result).toEqual(mockUpdateApplicationResponse);
      });
    });

    describe('when errorList is NOT provided', () => {
      it('should call api.keystone.application.update.buyer with all fields', async () => {
        await save.buyer(mockApplication, mockFormBody);

        expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

        const dataToSave = getDataToSave(mockFormBody);
        const expectedSanitisedData = sanitiseData(dataToSave);
        expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.buyer.id, expectedSanitisedData);
      });

      it('should return the API response', async () => {
        const result = await save.buyer(mockApplication, mockFormBody);

        expect(result).toEqual(mockUpdateApplicationResponse);
      });
    });
  });

  describe('api error handling', () => {
    describe('update buyer call', () => {
      const mockFormBody = mockBuyer;

      describe('when there is an error', () => {
        beforeEach(() => {
          updateApplicationSpy = jest.fn(() => Promise.reject());
          api.keystone.application.update.buyer = updateApplicationSpy;
        });

        it('should throw an error', async () => {
          try {
            await save.buyer(mockApplication, mockFormBody);
          } catch (err) {
            const expected = new Error("Updating application's buyer");
            expect(err).toEqual(expected);
          }
        });
      });
    });
  });
});
