import { FIELD_ID, pageVariables, get, post, TEMPLATE } from '.';
import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { CHECK_YOUR_ANSWERS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/check-your-answers';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { yourBusinessSummaryList } from '../../../../helpers/summary-lists/your-business';
import requiredFields from '../../../../helpers/required-fields/business';
import sectionStatus from '../../../../helpers/section-status';
import constructPayload from '../../../../helpers/construct-payload';
import save from '../save-data';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const CHECK_YOUR_ANSWERS_TEMPLATE = TEMPLATES.INSURANCE.CHECK_YOUR_ANSWERS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    CHECK_YOUR_ANSWERS: { YOUR_BUYER, YOUR_BUSINESS_SAVE_AND_BACK },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

describe('controllers/insurance/check-your-answers/your-business', () => {
  jest.mock('../save-data');

  let mockSaveSectionReview = jest.fn(() => Promise.resolve({}));

  save.sectionReview = mockSaveSectionReview;

  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
    req.params.referenceNumber = String(mockApplication.referenceNumber);
  });

  describe('FIELD_ID', () => {
    it('should have the correct FIELD_ID', () => {
      const expected = FIELD_IDS.CHECK_YOUR_ANSWERS.EXPORTER_BUSINESS;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(mockApplication.referenceNumber);

      const expected = {
        FIELD: {
          ID: FIELD_ID,
          ...FIELDS[FIELD_ID],
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${YOUR_BUSINESS_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(CHECK_YOUR_ANSWERS_TEMPLATE);
    });
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);
      const checkAndChange = true;
      const summaryList = yourBusinessSummaryList(
        mockApplication.company,
        mockApplication.business,
        mockApplication.broker,
        mockApplication.referenceNumber,
        checkAndChange,
      );

      const exporterFields = requiredFields(mockApplication.broker.isUsingBroker);

      const status = sectionStatus(exporterFields, mockApplication);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUSINESS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        status,
        SUMMARY_LIST: summaryList,
        ...pageVariables(mockApplication.referenceNumber),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = mockRes().locals;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    const mockBody = {
      [FIELD_ID]: 'true',
    };

    beforeEach(() => {
      req.body = mockBody;
    });

    it('should call save.sectionReview with application and data from constructPayload function', async () => {
      await post(req, res);

      const payload = constructPayload(req.body, [FIELD_ID]);

      expect(save.sectionReview).toHaveBeenCalledTimes(1);
      expect(save.sectionReview).toHaveBeenCalledWith(mockApplication, payload);
    });

    it(`should redirect to ${YOUR_BUYER}`, async () => {
      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${YOUR_BUYER}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = mockRes().locals;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('api error handling', () => {
      describe('when the save data API call does not return anything', () => {
        beforeEach(() => {
          mockSaveSectionReview = jest.fn(() => Promise.resolve(false));
          save.sectionReview = mockSaveSectionReview;

          req.body = mockBody;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the save data API call fails', () => {
        beforeEach(() => {
          mockSaveSectionReview = jest.fn(() => Promise.reject());
          save.sectionReview = mockSaveSectionReview;

          req.body = mockBody;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
