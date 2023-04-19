import { Context, Application as KeystoneApplication } from '.keystone/types'; // eslint-disable-line
import getExporterById from './get-exporter-by-id';
import { Application } from '../types';

export const generateErrorMessage = (section: string, applicationId: number) =>
  `Getting populated application - no ${section} found for application ${applicationId}`;

/**
 * getPopulatedApplication
 * Get data associated with an application
 * @param {Object} KeystoneJS context API
 * @param {Object} Application
 * @returns {Object} Populated application
 */
const getPopulatedApplication = async (context: Context, application: KeystoneApplication): Promise<Application> => {
  console.info('Getting populated application');

  const { eligibilityId, exporterId, policyAndExportId, exporterCompanyId, exporterBusinessId, exporterBrokerId, buyerId, declarationId } = application;

  const eligibility = await context.db.Eligibility.findOne({
    where: { id: eligibilityId },
  });

  if (!eligibility) {
    throw new Error(generateErrorMessage('eligibility', application.id));
  }

  const exporter = await getExporterById(context, exporterId);

  if (!exporter) {
    throw new Error(generateErrorMessage('exporter', application.id));
  }

  const buyerCountry = await context.db.Country.findOne({
    where: { id: eligibility?.buyerCountryId },
  });

  if (!buyerCountry) {
    throw new Error(generateErrorMessage('buyerCountry', application.id));
  }

  const policyAndExport = await context.db.PolicyAndExport.findOne({
    where: { id: policyAndExportId },
  });

  if (!policyAndExport) {
    throw new Error(generateErrorMessage('policyAndExport', application.id));
  }

  const exporterCompany = await context.db.ExporterCompany.findOne({
    where: { id: exporterCompanyId },
  });

  if (!exporterCompany) {
    throw new Error(generateErrorMessage('exporterCompany', application.id));
  }

  const exporterBusiness = await context.db.ExporterBusiness.findOne({
    where: { id: exporterBusinessId },
  });

  if (!exporterBusiness) {
    throw new Error(generateErrorMessage('exporterBusiness', application.id));
  }

  const exporterBroker = await context.db.ExporterBroker.findOne({
    where: { id: exporterBrokerId },
  });

  if (!exporterBroker) {
    throw new Error(generateErrorMessage('exporterBroker', application.id));
  }

  const buyer = await context.db.Buyer.findOne({
    where: { id: buyerId },
  });

  if (!buyer) {
    throw new Error(generateErrorMessage('buyer', application.id));
  }

  const declaration = await context.db.Declaration.findOne({
    where: { id: declarationId },
  });

  if (!declaration) {
    throw new Error(generateErrorMessage('declaration', application.id));
  }

  const populatedApplication = {
    ...application,
    eligibility: {
      ...eligibility,
      buyerCountry,
    },
    policyAndExport,
    exporter,
    exporterCompany,
    exporterBusiness,
    exporterBroker,
    buyer,
    declaration,
  };

  return populatedApplication;
};

export default getPopulatedApplication;
