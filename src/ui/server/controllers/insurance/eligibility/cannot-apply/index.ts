import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { Request, Response } from '../../../../../types';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';

const get = (req: Request, res: Response) => {
  const EXIT_REASON = req.flash('exitReason');

  return res.render(TEMPLATES.CANNOT_APPLY, {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.CANNOT_APPLY,
      BACK_LINK: req.headers.referer,
    }),
    EXIT_REASON,
  });
};

export default get;
