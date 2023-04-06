import { PAGES } from '../../../../content-strings';
import { TEMPLATES, ROUTES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { yourBuyerSummaryList } from '../../../../helpers/summary-lists/your-buyer';
import { Request, Response } from '../../../../../types';

const { CHECK_YOUR_ANSWERS } = PAGES.INSURANCE.YOUR_BUYER;
const { CHECK_YOUR_ANSWERS: CHECK_YOUR_ANSWERS_TEMPLATE } = TEMPLATES.INSURANCE.YOUR_BUYER;

export const TEMPLATE = CHECK_YOUR_ANSWERS_TEMPLATE;

const { INSURANCE_ROOT, ALL_SECTIONS, YOUR_BUYER: YOUR_BUYER_ROUTES } = ROUTES.INSURANCE;

const { CHECK_YOUR_ANSWERS_SAVE_AND_BACK } = YOUR_BUYER_ROUTES;

/**
 * gets the template for check your answers page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders check your answers page with previously submitted details
 */
const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;
    const { referenceNumber } = req.params;
    const refNumber = Number(referenceNumber);

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const summaryList = yourBuyerSummaryList(application.buyer, refNumber);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: CHECK_YOUR_ANSWERS,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS_SAVE_AND_BACK}`,
      SUMMARY_LIST: summaryList,
    });
  } catch (err) {
    console.error('Error getting check your answers', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow
 */
const post = (req: Request, res: Response) => {
  const { referenceNumber } = req.params;

  return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
};

export { get, post };
