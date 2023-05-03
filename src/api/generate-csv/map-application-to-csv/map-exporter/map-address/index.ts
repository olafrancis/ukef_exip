import NEW_LINE from '../../helpers/csv-new-line';
import { ApplicationExporterCompanyAddress } from '../../../../types';

/**
 * mapExporterAddress
 * Map an exporter's address
 * @param {Object} Exporter address
 * @returns {String} Exporter address string
 */
const mapExporterAddress = (address: ApplicationExporterCompanyAddress) => {
  let addressString = '';

  Object.keys(address).forEach((field) => {
    if (address[field] && field !== 'id' && field !== '__typename') {
      addressString += `${address[field]}${NEW_LINE}`;
    }
  });

  return addressString;
};

export default mapExporterAddress;