import mapApplicationToFormFields from '.';
import { FIELD_IDS } from '../../../constants';
import formatDate from '../../date/format-date';
import getDateFieldsFromTimestamp from '../../date/get-date-fields-from-timestamp';
import { mockApplication } from '../../../test-mocks';
import mapFinancialYearEndDate from '../map-financial-year-end-date';

const {
  SUBMISSION_DEADLINE,
  POLICY_AND_EXPORTS: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE },
    },
  },
  EXPORTER_BUSINESS: {
    TURNOVER: { FINANCIAL_YEAR_END_DATE },
  },
} = FIELD_IDS.INSURANCE;

describe('server/helpers/mappings/map-application-to-form-fields', () => {
  it(`should return the application without mapped ${SUBMISSION_DEADLINE}`, () => {
    const simpleApplication = {
      ...mockApplication,
      [SUBMISSION_DEADLINE]: formatDate(mockApplication[SUBMISSION_DEADLINE]),
      policyAndExport: {
        id: mockApplication.policyAndExport.id,
      },
    };

    const result = mapApplicationToFormFields(simpleApplication);

    expect(result).toEqual(simpleApplication);
  });

  describe(`when an application has policyAndExport${REQUESTED_START_DATE} field`, () => {
    it('should return additional date fields from the timestamp', () => {
      const timestamp = mockApplication.policyAndExport[REQUESTED_START_DATE];

      const result = mapApplicationToFormFields(mockApplication);

      const expected = {
        ...mockApplication,
        [SUBMISSION_DEADLINE]: formatDate(mockApplication[SUBMISSION_DEADLINE]),
        policyAndExport: {
          ...mockApplication.policyAndExport,
          ...getDateFieldsFromTimestamp(timestamp, REQUESTED_START_DATE),
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when an application has policyAndExport${CONTRACT_COMPLETION_DATE} field`, () => {
    it('should return additional date fields from the timestamp', () => {
      const timestamp = mockApplication.policyAndExport[CONTRACT_COMPLETION_DATE];

      const result = mapApplicationToFormFields(mockApplication);

      const expected = {
        ...mockApplication,
        [SUBMISSION_DEADLINE]: formatDate(mockApplication[SUBMISSION_DEADLINE]),
        policyAndExport: {
          ...mockApplication.policyAndExport,
          ...getDateFieldsFromTimestamp(timestamp, CONTRACT_COMPLETION_DATE),
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when an application has exporterCompany.${FINANCIAL_YEAR_END_DATE} field`, () => {
    it('should return mapped date field', () => {
      const result = mapApplicationToFormFields(mockApplication);

      const expected = {
        ...mockApplication,
        exporterCompany: {
          ...mockApplication.exporterCompany,
          [FINANCIAL_YEAR_END_DATE]: mapFinancialYearEndDate(mockApplication.exporterCompany[FINANCIAL_YEAR_END_DATE]),
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when an application is not passed', () => {
    it('should return an empty object', () => {
      // @ts-ignore
      const result = mapApplicationToFormFields();

      expect(result).toEqual({});
    });
  });

  describe('when an empty application is passed', () => {
    it('should return an empty object', () => {
      // @ts-ignore
      const result = mapApplicationToFormFields({});

      expect(result).toEqual({});
    });
  });
});
