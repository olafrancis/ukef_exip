import controller from '.';
import { BUTTONS, COOKIES_CONSENT, FOOTER, LINKS, PAGES, PRODUCT } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { generateQuote } from '../../../generate-quote';
import mapQuoteToContent from '../../../helpers/data-content-mappings/map-quote-to-content';
import { quoteSummaryList } from '../../../helpers/summary-lists/quote-summary-list';
import { mockReq, mockRes, mockSession } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/quote/your-quote', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.session.submittedData = mockSession.submittedData;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render template', () => {
    controller(req, res);

    const expectedQuote = generateQuote(req.session.submittedData);

    const quoteContent = mapQuoteToContent(expectedQuote);
    const expectedSummaryList = quoteSummaryList(quoteContent);

    const expectedVariables = {
      CONTENT_STRINGS: {
        BUTTONS,
        COOKIES_CONSENT,
        FOOTER,
        LINKS,
        PRODUCT,
        ...PAGES.YOUR_QUOTE_PAGE,
      },
      SUMMARY_LIST: expectedSummaryList,
    };

    expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.YOUR_QUOTE, expectedVariables);
  });

  it('should add a quote to the session with amountInGbp', () => {
    controller(req, res);
    const { submittedData } = req.session;

    const expected = generateQuote(submittedData);

    expect(req.session.quote).toEqual(expected);
  });
});
