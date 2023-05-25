import ExcelJS from 'exceljs';
import mapApplicationToXLSX from './map-application-to-XLSX';
import HEADER_COLUMNS from './header-columns';
import { Application } from '../types';

/**
 * XLSX
 * Generate an XLSX file with exceljs
 * @param {Object} Application
 * @returns {String} File path
 */
const XLSX = (application: Application): Promise<string> => {
  try {
    console.info('Generating XLSX file');

    const { referenceNumber } = application;

    const refNumber = String(referenceNumber);

    return new Promise((resolve) => {
      const filePath = `XLSX/${refNumber}.xlsx`;

      const xlsxData = mapApplicationToXLSX(application);

      /**
       * Create a new workbook
       */
      console.info('Generating XLSX file - creating a new workbook');

      const workbook = new ExcelJS.Workbook();

      /**
       * Add a worksheet to the workbook
       */
      console.info('Generating XLSX file - adding worksheet to workbook');

      const worksheet = workbook.addWorksheet(refNumber);

      /**
       * Add header columns to the worksheet
       */
      worksheet.columns = HEADER_COLUMNS;

      /**
       * Add each row to the worksheet
       */
      console.info('Generating XLSX file - adding rows to worksheet');

      xlsxData.forEach((row) => {
        worksheet.addRow(row);
      });

      /**
       * Write the file and return the file path
       */
      workbook.xlsx.writeFile(filePath).then(() => resolve(filePath));
    });
  } catch (err) {
    console.error(err);

    throw new Error(`Generating XLSX file ${err}`);
  }
};

const generate = {
  XLSX,
};

export default generate;
