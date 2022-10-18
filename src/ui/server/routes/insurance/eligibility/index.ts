import express from 'express';
import { ROUTES } from '../../../constants';
import { get as checkIfEligibleGet, post as checkIfEligiblePost } from '../../../controllers/insurance/eligibility/check-if-eligible';
import { get as buyerCountryGet, post as buyerCountryPost } from '../../../controllers/insurance/eligibility/buyer-country';
import cannotApplyGet from '../../../controllers/insurance/eligibility/cannot-apply';
import applyOfflineGet from '../../../controllers/insurance/eligibility/apply-offline';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const insuranceEligibilityRouter = express.Router();
/* eslint-enable @typescript-eslint/ban-ts-comment */

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligibleGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligiblePost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, buyerCountryGet);
insuranceEligibilityRouter.post(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, buyerCountryPost);

insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY, cannotApplyGet);
insuranceEligibilityRouter.get(ROUTES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE, applyOfflineGet);

export default insuranceEligibilityRouter;
