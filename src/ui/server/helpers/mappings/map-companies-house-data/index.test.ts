import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import mapCompaniesHouseData from '.';
import mockBody from './mocks';
import { RequestBody } from '../../../../types';

const {
  COMPANIES_HOUSE: {
    COMPANY_ADDRESS,
    COMPANY_NUMBER,
    COMPANY_INCORPORATED,
    REGISTED_OFFICE_ADDRESS: { ADDRESS_LINE_1, ADDRESS_LINE_2, CARE_OF, LOCALITY, REGION, POSTAL_CODE, COUNTRY, PREMISES },
  },
} = INSURANCE_FIELD_IDS;

describe('helpers/mappings/map-companies-house-data', () => {
  describe(`when ${COMPANY_NUMBER} success fields are provided`, () => {
    it(`should return the formBody without ${COMPANY_NUMBER} success,and __typename fields and change null fields in address to empty strings`, () => {
      const response = mapCompaniesHouseData(mockBody);

      const expected = {
        companyName: mockBody.companyName,
        companyNumber: mockBody.companyNumber.toString(),
        dateOfCreation: new Date(mockBody[COMPANY_INCORPORATED]).toISOString(),
        [COMPANY_ADDRESS]: {
          [CARE_OF]: '',
          [PREMISES]: '',
          [ADDRESS_LINE_1]: mockBody.registeredOfficeAddress[ADDRESS_LINE_1],
          [ADDRESS_LINE_2]: '',
          [LOCALITY]: mockBody.registeredOfficeAddress[LOCALITY],
          [REGION]: mockBody.registeredOfficeAddress[REGION],
          [POSTAL_CODE]: mockBody.registeredOfficeAddress[POSTAL_CODE],
          [COUNTRY]: '',
        },
        sicCodes: mockBody.sicCodes,
        industrySectorNames: mockBody.industrySectorNames,
      };

      expect(response).toEqual(expected);
    });
  });

  describe(`when ${COMPANY_NUMBER} is NOT provided`, () => {
    const mockBodyWithoutFields = {} as RequestBody;

    beforeEach(() => {
      delete mockBodyWithoutFields[COMPANY_NUMBER];
      delete mockBodyWithoutFields.registeredOfficeAddress;
      delete mockBodyWithoutFields.dateOfCreation;
      delete mockBodyWithoutFields.companyNumber;
      delete mockBodyWithoutFields.sicCodes;
      delete mockBodyWithoutFields.industrySectorNames;
    });

    it(`should return the formBody without ${COMPANY_NUMBER} and an empty address object`, () => {
      const response = mapCompaniesHouseData(mockBodyWithoutFields);

      const { _csrf, ...expectedBody } = mockBodyWithoutFields;
      expectedBody[COMPANY_ADDRESS] = {};

      expect(response).toEqual(expectedBody);
    });
  });
});
