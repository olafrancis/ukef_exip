import { COOKIES_CONSENT, FOOTER, LINKS, PAGES, PRODUCT } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';

const get = (req: Request, res: Response) =>
  res.render(TEMPLATES.PROBLEM_WITH_SERVICE, {
    CONTENT_STRINGS: {
      COOKIES_CONSENT,
      FOOTER,
      LINKS,
      PRODUCT,
      ...PAGES.PROBLEM_WITH_SERVICE_PAGE,
    },
  });

export default get;
