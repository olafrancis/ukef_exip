import { Application, ApplicationFlat } from '../../../types';

/**
 * flattenApplicationData
 * Transform an application into a single level object
 * @param {Object} Application
 * @returns {Object} Application as a single level object
 */
const flattenApplicationData = (application: Application): ApplicationFlat => {
  const { eligibility, policyAndExport, exporterCompany, exporterBroker, exporterBusiness, ...app } = application;

  return {
    ...eligibility,
    buyerCountry: application.eligibility.buyerCountry.isoCode,
    ...policyAndExport,
    ...exporterCompany,
    ...exporterBusiness,
    ...exporterBroker,
    ...app,
  };
};

export default flattenApplicationData;
