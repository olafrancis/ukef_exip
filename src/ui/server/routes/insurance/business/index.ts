import express from 'express';
import { ROUTES } from '../../../constants';

import {
  get as getCompanyDetails,
  postCompaniesHouseSearch,
  redirectToExitPage,
  post as postCompanyDetails,
} from '../../../controllers/insurance/business/company-details';

import { post as postCompanyDetailsSaveAndBack } from '../../../controllers/insurance/business/company-details/save-and-back';

import { get as getNatureOfBusiness, post as postNatureOfBusiness } from '../../../controllers/insurance/business/nature-of-business';
import { post as postNatureOfBusinessSaveAndBack } from '../../../controllers/insurance/business/nature-of-business/save-and-back';

import { get as getTurnover, post as postTurnover } from '../../../controllers/insurance/business/turnover';
import { post as postTurnoverSaveAndBack } from '../../../controllers/insurance/business/turnover/save-and-back';

import { get as getBroker, post as postBroker } from '../../../controllers/insurance/business/broker';
import { post as postBrokerSaveAndBack } from '../../../controllers/insurance/business/broker/save-and-back';

import { get as getCheckYourAnswers } from '../../../controllers/insurance/business/check-your-answers';

// @ts-ignore
const insuranceBusinessRouter = express.Router();

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`, getCompanyDetails);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NO_COMPANIES_HOUSE_NUMBER}`, redirectToExitPage.noCompaniesHouseNumber);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH}`, postCompaniesHouseSearch);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_SAVE_AND_BACK}`, postCompanyDetailsSaveAndBack);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`, postCompanyDetails);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHANGE}`, getCompanyDetails);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS_CHANGE}`, postCompanyDetails);

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_ROOT}`, getNatureOfBusiness);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_SAVE_AND_BACK}`, postNatureOfBusinessSaveAndBack);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_ROOT}`, postNatureOfBusiness);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_CHANGE}`, getNatureOfBusiness);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS_CHANGE}`, postNatureOfBusiness);

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ROOT}`, getTurnover);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ROOT}`, postTurnover);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_SAVE_AND_BACK}`, postTurnoverSaveAndBack);
insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CHANGE}`, getTurnover);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CHANGE}`, postTurnover);

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.BROKER_ROOT}`, getBroker);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.BROKER_ROOT}`, postBroker);
insuranceBusinessRouter.post(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.BROKER_SAVE_AND_BACK}`, postBrokerSaveAndBack);

insuranceBusinessRouter.get(`/:referenceNumber${ROUTES.INSURANCE.EXPORTER_BUSINESS.CHECK_YOUR_ANSWERS}`, getCheckYourAnswers);

export default insuranceBusinessRouter;
