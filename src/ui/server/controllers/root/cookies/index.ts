import { ERROR_MESSAGES, FIELDS, PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';
import singleInputPageVariables from '../../../helpers/single-input-page-variables';
import generateValidationErrors from '../../../shared-validation/yes-no-radios-form';

const FIELD_ID = FIELD_IDS.OPTIONAL_COOKIES;

const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.COOKIES_PAGE,
};

const get = (req: Request, res: Response) => {
  // store the previous URL so that we can use this in the POST res.render.

  req.flash('previousUrl', req.headers.referer);

  return res.render(TEMPLATES.COOKIES, {
    ...singleInputPageVariables(PAGE_VARIABLES),
    FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
    BACK_LINK: req.headers.referer,
    submittedValue: req.cookies.optionalCookies,
  });
};

const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body, FIELD_ID, ERROR_MESSAGES[FIELD_ID]);

  if (validationErrors) {
    return res.render(TEMPLATES.COOKIES, {
      ...singleInputPageVariables(PAGE_VARIABLES),
      FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
      BACK_LINK: req.headers.referer,
      validationErrors,
    });
  }

  const previousUrl = req.flash('previousUrl');

  const showSuccessMessageGoBackLink = previousUrl && previousUrl.length && !previousUrl.includes(ROUTES.COOKIES);

  let backLink = req.headers.referer;

  if (previousUrl) {
    backLink = previousUrl[previousUrl.length - 1];
  }

  return res.render(TEMPLATES.COOKIES, {
    ...singleInputPageVariables(PAGE_VARIABLES),
    FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
    BACK_LINK: backLink,
    submittedValue: req.cookies.optionalCookies,
    showSuccessMessage: true,
    showSuccessMessageGoBackLink,
  });
};

export { PAGE_VARIABLES, get, post };
