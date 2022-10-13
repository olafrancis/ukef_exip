import { BUTTONS, COOKIES_CONSENT, FIELDS, FOOTER, LINKS, PAGES, PRODUCT } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import generateValidationErrors from './validation';
import { isSinglePolicyType } from '../../../helpers/policy-type';
import { updateSubmittedData } from '../../../helpers/update-submitted-data';
import { Request, Response } from '../../../../types';

const { MULTI_POLICY_TYPE, POLICY_LENGTH, POLICY_TYPE, SINGLE_POLICY_LENGTH, SINGLE_POLICY_TYPE } = FIELD_IDS;

const PAGE_VARIABLES = {
  CONTENT_STRINGS: {
    BUTTONS,
    COOKIES_CONSENT,
    LINKS,
    FOOTER,
    PRODUCT,
    ...PAGES.QUOTE.POLICY_TYPE,
  },
  FIELDS: {
    MULTI_POLICY_TYPE: {
      ID: MULTI_POLICY_TYPE,
      ...FIELDS[POLICY_TYPE],
    },
    POLICY_LENGTH: {
      ID: POLICY_LENGTH,
      ...FIELDS[POLICY_LENGTH],
    },
    POLICY_TYPE: {
      ID: POLICY_TYPE,
      ...FIELDS[POLICY_TYPE],
    },
    SINGLE_POLICY_TYPE: {
      ID: SINGLE_POLICY_TYPE,
      ...FIELDS[POLICY_TYPE],
    },
    SINGLE_POLICY_LENGTH: {
      ID: SINGLE_POLICY_LENGTH,
      ...FIELDS[SINGLE_POLICY_LENGTH],
    },
  },
};

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.QUOTE.POLICY_TYPE, {
    ...PAGE_VARIABLES,
    BACK_LINK: req.headers.referer,
    submittedValues: req.session.submittedData,
  });

const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATES.QUOTE.POLICY_TYPE, {
      ...PAGE_VARIABLES,
      BACK_LINK: req.headers.referer,
      validationErrors,
      submittedValues: req.body,
    });
  }

  let populatedData = req.body;

  if (isSinglePolicyType(req.body[POLICY_TYPE])) {
    populatedData = {
      [POLICY_TYPE]: req.body[POLICY_TYPE],
      [POLICY_LENGTH]: req.body[SINGLE_POLICY_LENGTH],
    };
  }

  req.session.submittedData = updateSubmittedData(populatedData, req.session.submittedData);

  return res.redirect(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
};

export { PAGE_VARIABLES, get, post };
