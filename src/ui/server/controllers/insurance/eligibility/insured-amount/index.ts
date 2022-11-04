import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import { Request, Response } from '../../../../../types';

const FIELD_ID = FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_OVER_MAX_AMOUNT;

const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT,
};

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT, singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }));

const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body, FIELD_ID, ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].IS_EMPTY);

  if (validationErrors) {
    return res.render(TEMPLATES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT, {
      ...singleInputPageVariables({
        ...PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
      }),
      validationErrors,
    });
  }

  const answer = req.body[FIELD_ID];

  if (answer === 'true') {
    const { INSURANCE } = PAGES;
    const { APPLY_OFFLINE } = INSURANCE.ELIGIBILITY;
    const { REASON } = APPLY_OFFLINE;

    req.flash('exitReason', REASON.WANT_COVER_OVER_MAX_AMOUNT);

    return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE);
  }

  return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD);
};

export { PAGE_VARIABLES, get, post };
