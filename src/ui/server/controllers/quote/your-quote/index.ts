import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/page-variables/core/quote';
import { generateQuote } from '../../../generate-quote';
import { quoteSummaryList } from '../../../helpers/summary-lists/quote-summary-list';
import mapQuoteToContent from '../../../helpers/data-content-mappings/map-quote-to-content';
import { Request, Response } from '../../../../types';

export const TEMPLATE = TEMPLATES.QUOTE.YOUR_QUOTE;

export const get = (req: Request, res: Response) => {
  const { submittedData } = req.session;

  const quote = generateQuote(submittedData);

  req.session.quote = quote;

  const quoteContent = mapQuoteToContent(quote);

  return res.render(TEMPLATE, {
    ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.YOUR_QUOTE, BACK_LINK: req.headers.referer }),
    SUMMARY_LIST: quoteSummaryList(quoteContent),
  });
};
