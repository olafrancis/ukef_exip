import { PAGES, UK_GOODS_AND_SERVICES_CALCULATE_DESCRIPTION, UK_GOODS_AND_SERVICES_DESCRIPTION, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Request, Response } from '../../../../../types';

export const FIELD_ID = FIELD_IDS.ELIGIBILITY.HAS_MINIMUM_UK_GOODS_OR_SERVICES;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: {
    ...PAGES.UK_GOODS_OR_SERVICES,
    UK_GOODS_AND_SERVICES_CALCULATE_DESCRIPTION,
    UK_GOODS_AND_SERVICES_DESCRIPTION,
  },
};

export const TEMPLATE = TEMPLATES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES;

export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
    userName: getUserNameFromSession(req.session.user),
    submittedValues: req.session.submittedData.insuranceEligibility,
  });

export const post = (req: Request, res: Response) => {
  const payload = constructPayload(req.body, [FIELD_ID]);

  const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGES.ELIGIBILITY[FIELD_ID].IS_EMPTY);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...singleInputPageVariables({
        ...PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      validationErrors,
    });
  }

  const answer = req.body[FIELD_ID];

  if (answer === 'false') {
    const { CANNOT_APPLY } = PAGES;
    const { REASON } = CANNOT_APPLY;

    req.flash('exitReason', REASON.NOT_ENOUGH_UK_GOODS_OR_SERVICES);

    return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY);
  }

  req.session.submittedData = {
    ...req.session.submittedData,
    insuranceEligibility: updateSubmittedData({ [FIELD_ID]: answer }, req.session.submittedData.insuranceEligibility),
  };

  return res.redirect(ROUTES.INSURANCE.ELIGIBILITY.END_BUYER);
};
