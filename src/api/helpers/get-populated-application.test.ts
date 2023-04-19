import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import { Context, Application as KeystoneApplication } from '.keystone/types'; // eslint-disable-line
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import baseConfig from '../keystone';
import getPopulatedApplication, { generateErrorMessage } from './get-populated-application';
import { Application } from '../types';
import { createFullApplication } from '../test-helpers';

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('api/helpers/get-populated-application', () => {
  let applicationIds: KeystoneApplication;
  let application: Application;

  beforeEach(async () => {
    application = await createFullApplication(context);

    applicationIds = {
      id: application.id,
      eligibilityId: application.eligibility.id,
      policyAndExportId: application.policyAndExport.id,
      exporterId: application.exporter.id,
      exporterCompanyId: application.exporterCompany.id,
      exporterBusinessId: application.exporterBusiness.id,
      exporterBrokerId: application.exporterBroker.id,
      buyerId: application.buyer.id,
      declarationId: application.declaration.id,
    };
  });

  it('should return an application with associated data', async () => {
    const result = await getPopulatedApplication(context, applicationIds);

    expect(result.eligibility.id).toEqual(application.eligibility.id);
    expect(result.policyAndExport.id).toEqual(application.policyAndExport.id);
    expect(result.exporter.id).toEqual(application.exporter.id);
    expect(result.exporterCompany.id).toEqual(application.exporterCompany.id);
    expect(result.exporterBusiness.id).toEqual(application.exporterBusiness.id);
    expect(result.exporterBroker.id).toEqual(application.exporterBroker.id);
    expect(result.buyer.id).toEqual(application.buyer.id);
    expect(result.declaration.id).toEqual(application.declaration.id);
  });

  it('should throw an error when eligibility does not exist', async () => {
    const invalidId = applicationIds.policyAndExportId;

    try {
      await getPopulatedApplication(context, { ...applicationIds, eligibilityId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('eligibility', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when exporter does not exist', async () => {
    const invalidId = applicationIds.policyAndExportId;

    try {
      await getPopulatedApplication(context, { ...applicationIds, exporterId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('exporter', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when buyerCountry does not exist', async () => {
    const invalidId = applicationIds.policyAndExportId;

    try {
      await getPopulatedApplication(context, { ...applicationIds, buyerCountryId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('buyerCountry', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when policyAndExport does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, policyAndExportId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('policyAndExport', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when exporterCompany does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, exporterCompanyId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('exporterCompany', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when exporterBusiness does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, exporterBusinessId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('exporterBusiness', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when exporterBroker does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, exporterBrokerId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('exporterBroker', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when buyer does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, buyerId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('buyer', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when declaration does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, declarationId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('declaration', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });
});
