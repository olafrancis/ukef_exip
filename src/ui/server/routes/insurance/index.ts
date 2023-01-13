import express from 'express';
import { INSURANCE_ROUTES, INSURANCE_ROOT } from '../../constants/routes/insurance';
import { get as startGet, post as startPost } from '../../controllers/insurance/start';
import { get as applyOfflineGet } from '../../controllers/insurance/apply-offline';
import { get as speakToUkefEfmGet } from '../../controllers/insurance/speak-to-ukef-efm';
import { get as allSectionsGet } from '../../controllers/insurance/all-sections';
import { get as typeOfPolicyGet, post as typeOfPolicyPost } from '../../controllers/insurance/policy-and-export/type-of-policy';
import { post as typeOfPolicySaveAndBackPost } from '../../controllers/insurance/policy-and-export/type-of-policy/save-and-back';
import { get as singleContractPolicyGet, post as singleContractPolicyPost } from '../../controllers/insurance/policy-and-export/single-contract-policy';
import { post as singleContractPolicySaveAndBackPost } from '../../controllers/insurance/policy-and-export/single-contract-policy/save-and-back';
import { get as multipleContractPolicyGet, post as multipleContractPolicyPost } from '../../controllers/insurance/policy-and-export/multiple-contract-policy';
import { post as multipleContractPolicySaveAndBackPost } from '../../controllers/insurance/policy-and-export/multiple-contract-policy/save-and-back';
import { get as aboutGoodsOrServicesGet, post as aboutGoodsOrServicesPost } from '../../controllers/insurance/policy-and-export/about-goods-or-services';
import { post as aboutGoodsOrServicesSaveAndBackPost } from '../../controllers/insurance/policy-and-export/about-goods-or-services/save-and-back';
import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../controllers/insurance/policy-and-export/check-your-answers';
import { post as checkYourAnswersSaveAndBackPost } from '../../controllers/insurance/policy-and-export/check-your-answers/save-and-back';
import { get as pageNotFoundGet } from '../../controllers/insurance/page-not-found';
import insuranceEligibilityRoutes from './eligibility';
import insuranceBusinessRouter from './business';
import yourBuyerRouter from './your-buyer';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const insuranceRouter = express.Router();
/* eslint-enable @typescript-eslint/ban-ts-comment */

insuranceRouter.get(INSURANCE_ROUTES.START, startGet);
insuranceRouter.post(INSURANCE_ROUTES.START, startPost);

insuranceRouter.get(INSURANCE_ROUTES.APPLY_OFFLINE, applyOfflineGet);
insuranceRouter.get(INSURANCE_ROUTES.SPEAK_TO_UKEF_EFM, speakToUkefEfmGet);

insuranceRouter.get(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.ALL_SECTIONS}`, allSectionsGet);

insuranceRouter.get(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.ALL_SECTIONS}`, allSectionsGet);

insuranceRouter.get(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, typeOfPolicyGet);
insuranceRouter.post(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, typeOfPolicyPost);
insuranceRouter.post(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.TYPE_OF_POLICY_SAVE_AND_BACK}`, typeOfPolicySaveAndBackPost);

insuranceRouter.get(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`, singleContractPolicyGet);
insuranceRouter.post(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`, singleContractPolicyPost);
insuranceRouter.post(
  `${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY_SAVE_AND_BACK}`,
  singleContractPolicySaveAndBackPost,
);

insuranceRouter.get(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`, multipleContractPolicyGet);
insuranceRouter.post(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`, multipleContractPolicyPost);
insuranceRouter.post(
  `${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK}`,
  multipleContractPolicySaveAndBackPost,
);

insuranceRouter.get(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`, aboutGoodsOrServicesGet);
insuranceRouter.post(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`, aboutGoodsOrServicesPost);
insuranceRouter.post(
  `${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK}`,
  aboutGoodsOrServicesSaveAndBackPost,
);

insuranceRouter.get(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS}`, checkYourAnswersGet);
insuranceRouter.post(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS}`, checkYourAnswersPost);

insuranceRouter.post(
  `${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS_SAVE_AND_BACK}`,
  checkYourAnswersSaveAndBackPost,
);

insuranceRouter.get(INSURANCE_ROUTES.PAGE_NOT_FOUND, pageNotFoundGet);

insuranceRouter.use('/', insuranceEligibilityRoutes);
insuranceRouter.use(`${INSURANCE_ROOT}`, insuranceBusinessRouter);
insuranceRouter.use(`${INSURANCE_ROOT}/:referenceNumber`, yourBuyerRouter);

export default insuranceRouter;
