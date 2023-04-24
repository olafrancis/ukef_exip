import mapExporter, { mapExporterBroker } from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance/exporter-business';
import { CSV } from '../../../content-strings';
import { FIELDS } from '../../../content-strings/fields/insurance/your-business';
import { ANSWERS, GBP_CURRENCY_CODE } from '../../../constants';
import csvRow from '../helpers/csv-row';
import mapExporterAddress from './map-address';
import formatDate from '../helpers/format-date';
import formatCurrency from '../helpers/format-currency';
import NEW_LINE from '../helpers/csv-new-line';
import { mockApplication } from '../../../test-mocks';

const CONTENT_STRINGS = {
  ...FIELDS.COMPANY_DETAILS,
  ...FIELDS.NATURE_OF_YOUR_BUSINESS,
  ...FIELDS.TURNOVER,
  ...FIELDS.BROKER,
};

const {
  COMPANY_HOUSE: { COMPANY_NUMBER, COMPANY_NAME, COMPANY_ADDRESS, COMPANY_INCORPORATED, COMPANY_SIC, FINANCIAL_YEAR_END_DATE },
  YOUR_COMPANY: { TRADING_NAME, TRADING_ADDRESS, WEBSITE, PHONE_NUMBER },
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK, EMPLOYEES_INTERNATIONAL },
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
  BROKER: { USING_BROKER, NAME: BROKER_NAME, ADDRESS_LINE_1, TOWN, COUNTY, POSTCODE, EMAIL },
} = FIELD_IDS;

describe('api/generate-csv/map-application-to-csv/map-exporter', () => {
  describe('mapExporterBroker', () => {
    describe(`when ${USING_BROKER} is ${ANSWERS.YES}`, () => {
      it('should return an array of mapped exporter fields', () => {
        const result = mapExporterBroker(mockApplication);

        const { exporterBroker } = mockApplication;

        const expected = [
          csvRow(CSV.FIELDS[USING_BROKER], exporterBroker[USING_BROKER]),
          csvRow(CSV.FIELDS[BROKER_NAME], exporterBroker[BROKER_NAME]),
          csvRow(
            CSV.FIELDS[ADDRESS_LINE_1],
            `${exporterBroker[ADDRESS_LINE_1]} ${NEW_LINE} ${exporterBroker[TOWN]} ${NEW_LINE} ${exporterBroker[COUNTY]} ${NEW_LINE} ${exporterBroker[POSTCODE]}`,
          ),
          csvRow(CSV.FIELDS[EMAIL], exporterBroker[EMAIL]),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${USING_BROKER} is ${ANSWERS.NO}`, () => {
      it('should return an array of mapped exporter fields', () => {
        const mockApplicationNoBroker = {
          ...mockApplication,
          exporterBroker: {
            ...mockApplication.exporterBroker,
            [USING_BROKER]: ANSWERS.NO,
          },
        };

        const result = mapExporterBroker(mockApplicationNoBroker);

        const { exporterBroker } = mockApplicationNoBroker;

        const expected = [csvRow(CSV.FIELDS[USING_BROKER], exporterBroker[USING_BROKER])];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('mapExporter', () => {
    it('should return an array of mapped exporter fields', () => {
      const result = mapExporter(mockApplication);

      const { exporterCompany, exporterBusiness } = mockApplication;

      const expected = [
        csvRow(CSV.SECTION_TITLES.EXPORTER_BUSINESS, ''),

        // exporter company fields
        csvRow(CONTENT_STRINGS[COMPANY_NUMBER].SUMMARY?.TITLE, exporterCompany[COMPANY_NUMBER]),
        csvRow(CSV.FIELDS[COMPANY_NAME], exporterCompany[COMPANY_NAME]),
        csvRow(CONTENT_STRINGS[COMPANY_INCORPORATED].SUMMARY?.TITLE, formatDate(exporterCompany[COMPANY_INCORPORATED], 'dd-MMM-yy')),

        csvRow(CSV.FIELDS[COMPANY_ADDRESS], mapExporterAddress(exporterCompany[COMPANY_ADDRESS])),

        csvRow(CONTENT_STRINGS[TRADING_NAME].SUMMARY?.TITLE, exporterCompany[TRADING_NAME]),
        csvRow(CONTENT_STRINGS[TRADING_ADDRESS].SUMMARY?.TITLE, exporterCompany[TRADING_ADDRESS]),

        csvRow(CSV.FIELDS[COMPANY_SIC], exporterCompany[COMPANY_SIC]),
        csvRow(CONTENT_STRINGS[FINANCIAL_YEAR_END_DATE].SUMMARY?.TITLE, formatDate(exporterCompany[FINANCIAL_YEAR_END_DATE], 'd MMMM')),
        csvRow(CSV.FIELDS[WEBSITE], exporterCompany[WEBSITE]),
        csvRow(CSV.FIELDS[PHONE_NUMBER], exporterCompany[PHONE_NUMBER]),

        // exporter business fields
        csvRow(CSV.FIELDS[GOODS_OR_SERVICES], exporterBusiness[GOODS_OR_SERVICES]),
        csvRow(CSV.FIELDS[YEARS_EXPORTING], exporterBusiness[YEARS_EXPORTING]),
        csvRow(CSV.FIELDS[EMPLOYEES_UK], exporterBusiness[EMPLOYEES_UK]),
        csvRow(CSV.FIELDS[EMPLOYEES_INTERNATIONAL], exporterBusiness[EMPLOYEES_INTERNATIONAL]),
        csvRow(CSV.FIELDS[ESTIMATED_ANNUAL_TURNOVER], formatCurrency(exporterBusiness[ESTIMATED_ANNUAL_TURNOVER], GBP_CURRENCY_CODE)),
        csvRow(CONTENT_STRINGS[PERCENTAGE_TURNOVER].SUMMARY?.TITLE, `${exporterBusiness[PERCENTAGE_TURNOVER]}%`),

        // exporter broker fields
        ...mapExporterBroker(mockApplication),
      ];

      expect(result).toEqual(expected);
    });
  });
});
